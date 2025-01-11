import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { db } from "../../../../../../assets/scripts/firebase";
import { ref, get, set } from "firebase/database";
import { FaAnglesRight, FaChevronDown, FaCheck } from "react-icons/fa6";
import { MdOutlineAccessTime } from "react-icons/md";
import {
  format_raw_date,
  format_date,
  get_unix_timestamp,
} from "../../../../../../assets/scripts/functions/format_function";

const P4_2_MANUAL_TRANSFER_INDEX = ({ set_page_display }) => {
  const [selected_date, set_selected_date] = useState("");
  const [start_job, set_start_job] = useState(false);
  const [job_status, set_job_status] = useState(0);

  // + GET OSA
  const [osa_list, set_osa_list] = useState([]);
  const [osa_length, set_osa_length] = useState(0);
  const [osa_pushed_length, set_osa_pushed_length] = useState(0);

  const proceed_manual_job = () => {
    if (selected_date !== "") {
      fetch_data_osa();
    }
  };

  const fetch_data_osa = async () => {
    set_start_job(true);
    set_job_status(0);
    set_osa_length(0);
    set_osa_pushed_length(0);
    set_md_history_length(0);
    set_md_history_pushed_length(0);
    let products = [];
    console.log("fetching OSA");
    try {
      // set_is_loading(true);
      const response = await get(ref(db, `/DB1_BENBY_MERCH_APP/TBL_OSA/DATA`));
      const data = response.val();
      if (data) {
        Object.keys(data).forEach((parentPath) => {
          const childPaths = data[parentPath];
          if (childPaths) {
            Object.keys(childPaths).forEach((childPath) => {
              const info = childPaths[childPath];
              if (info) {
                if (!info.a5_Dateupdated || !info.a6_UpdatedBy) {
                  return;
                }
                const product = {
                  a0_ID: `${parentPath}_${childPath}`,
                  a1_Matcode: info.a1_Matcode,
                  a2_Storecode: info.a2_Storecode,
                  a3_ActionID: info.a3_ActionID,
                  a4_SubActionID: info.a4_SubActionID,
                  a5_Dateupdated: info.a5_Dateupdated,
                  a6_UpdatedBy: info.a6_UpdatedBy,
                  a7_Pcs: info.a7_Pcs,
                  a8_Cases: info.a8_Cases,
                  a9_InnerBox: info.a9_InnerBox,
                  b1_ExpiryDate: info.b1_ExpiryDate,
                  b2_Remarks: info.b2_Remarks,
                  b3_ExpiryDates: info.b3_ExpiryDates,
                };
                products.push(product);
              }
            });
          }
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      set_osa_length(
        products.filter(
          (item) =>
            item.a5_Dateupdated &&
            item.a6_UpdatedBy &&
            item.a5_Dateupdated === selected_date
        ).length
      );
      const osa_POST_DATA = products.filter(
        (item) =>
          item.a5_Dateupdated &&
          item.a6_UpdatedBy &&
          item.a5_Dateupdated === selected_date
      );
      fetch_data_md_history(osa_POST_DATA);
    }
  };
  // - GET OSA
  // + GET MD HISTORY
  const [md_history_list, set_md_history_list] = useState([]);
  const [md_history_length, set_md_history_length] = useState(0);
  const [md_history_pushed_length, set_md_history_pushed_length] = useState(0);

  const fetch_data_md_history = async (osa_POST_DATA) => {
    let md_list = [];
    try {
      const response = await get(
        ref(db, `/DB1_BENBY_MERCH_APP/TBL_MD_HISTORY/DATA`)
      );
      const data = response.val();

      if (data) {
        Object.keys(data).forEach((parentPath) => {
          const childPaths = data[parentPath];
          if (childPaths) {
            Object.keys(childPaths).forEach((childPath) => {
              const info = childPaths[childPath];
              if (info) {
                const md = {
                  a0_ID: `${parentPath}_${childPath}`,
                  a1_tdsID: info.tdsID,
                  a2_timeIn: info.timeIn,
                  a3_timeOut: info.timeOut,
                  a4_diserName: info.diserName,
                  a5_remarks1: info.remarks1,
                  a6_remarks2: info.remarks2,
                  a7_remarks3: info.remarks3,
                  a8_benbyId: info.benbyId,
                  a9_diserID: info.diserID,
                  b1_datetoday: info.datetoday,
                };
                md_list.push(md);
              }
            });
          }
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      set_md_history_length(
        md_list.filter((item) => item.b1_datetoday === selected_date).length
      );
      const md_history_POST_DATA = md_list.filter(
        (item) => item.b1_datetoday === selected_date
      );

      fetch_data_ep_history(osa_POST_DATA, md_history_POST_DATA);
    }
  };
  // - GET MD HISTORY
  // + GET EP HISTORY
  const [ep_history_list, set_ep_history_list] = useState([]);
  const [ep_history_length, set_ep_history_length] = useState(0);
  const [ep_history_pushed_length, set_ep_history_pushed_length] = useState(0);

  const fetch_data_ep_history = async (osa_POST_DATA, md_history_POST_DATA) => {
    try {
      const response = await get(
        ref(db, `DB1_BENBY_MERCH_APP/TBL_EP_HISTORY/DATA`)
      );
      let data = response.val();
      const data_array_ep_history = Object.values(data);

      const ep_history_POST_DATA = data_array_ep_history.filter(
        (item) => item.a2_Dateupdated === selected_date
      );
      set_ep_history_length(ep_history_POST_DATA.length);

      const controller = new AbortController();
      set_abort_controller(controller);
      post_api_osa(
        osa_POST_DATA,
        md_history_POST_DATA,
        ep_history_POST_DATA,
        controller
      );
    } catch (error) {
      console.log(error);
    }
  };
  // - GET EP HISTORY
  const [abort_controller, set_abort_controller] = useState(null);
  // + API POST OSA HISTORY
  const batch_size = 100;
  const delay = 500;
  const post_api_osa = async (
    osa_POST_DATA,
    md_history_POST_DATA,
    ep_history_POST_DATA,
    abort_controller
  ) => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const date_now = new Date();
    let osa_total_length = 0;

    try {
      for (let i = 0; i < osa_POST_DATA.length; i += batch_size) {
        const batch = osa_POST_DATA.slice(i, i + batch_size);
        const promises = batch.map(async (item) => {
          if (!item.a5_Dateupdated || !item.a6_UpdatedBy) {
            return;
          }

          try {
            const response = await axios.post(
              `https://benbyextportal.com/insert/api/PostOSA`,
              {
                MCLRowID: item.a1_Matcode.toString() || "",
                Storecode: item.a2_Storecode || "",
                ActionID: item.a3_ActionID.toString() || "",
                SubActionID: item.a4_SubActionID.toString() || "",
                DateUpdated: item.a5_Dateupdated || format_date(date_now, "/"),
                UpdatedBy: item.a6_UpdatedBy.toString() || "NULL",
                PCS: item.a7_Pcs.toString(),
                CS: item.a8_Cases.toString(),
                InnerBox: item.a9_InnerBox.toString(),
                Remarks: item.b2_Remarks.toString(),
              },
              { signal: abort_controller.signal }
            );

            if (response.status === 200) {
              set_osa_list((prevList) => [
                ...prevList,
                {
                  a1_Matcode: item.a1_Matcode,
                  a5_Dateupdated: item.a5_Dateupdated,
                  a6_UpdatedBy: item.a6_UpdatedBy,
                },
              ]);
              set_osa_pushed_length((prevLength) => prevLength + 1);
              osa_total_length++;
            }
          } catch (error) {
            if (axios.isCancel(error)) {
              console.log("Request canceled", error.message);
            } else {
              console.log(`Error with item: Matcode: ${item.a1_Matcode}`);
            }
          }
        });

        await Promise.all(promises);
        await sleep(delay);
      }
    } catch (error) {
      console.error("Error processing data:", error);
    } finally {
      const controller = new AbortController();
      set_abort_controller(controller);
      set_job_status(1);
      post_api_md_history(
        md_history_POST_DATA,
        ep_history_POST_DATA,
        osa_total_length,
        controller
      );
    }
  };
  // - API POST OSA HISTORY
  // + API POST MD HISTORY
  const post_api_md_history = async (
    md_history_POST_DATA,
    ep_history_POST_DATA,
    osa_total_length,
    abort_controller
  ) => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const date_now = new Date();
    let md_total_length = 0;
    try {
      for (let i = 0; i < md_history_POST_DATA.length; i += batch_size) {
        const batch = md_history_POST_DATA.slice(i, i + batch_size);
        const promises = batch.map(async (item) => {
          try {
            const response = await axios.post(
              `https://benbyextportal.com/insert/api/PostMerchDeployMentUpdate`,
              {
                TDSID: item.a1_tdsID,
                TimeIn: item.a2_timeIn,
                TimeOut: item.a3_timeOut,
                DiserID: item.a9_diserID,
                DiserName: item.a4_diserName,
                Remarks1: item.a5_remarks1,
                Remarks2: item.a6_remarks2,
                Remarks3: item.a7_remarks3,
                BenbyId: item.a8_benbyId,
                DateToday: format_raw_date(item.b1_datetoday, "/"),
              },
              { signal: abort_controller.signal }
            );

            if (response.status === 200) {
              set_md_history_list((prevList) => [
                ...prevList,
                {
                  tdsID: item.a1_tdsID,
                  datetoday: format_raw_date(item.b1_datetoday, "/"),
                },
              ]);
              set_md_history_pushed_length((prevLength) => prevLength + 1);
              md_total_length++;
            }
          } catch (error) {
            if (axios.isCancel(error)) {
              console.log("Request canceled", error.message);
            } else {
              console.log(`Error with item: TDS CODE: ${item.tdsID}`);
            }
          }
        });
        await Promise.all(promises);
        console.log(`MD History batch: ${Math.floor(i / batch_size) + 1}`);
        await sleep(delay);
      }
    } catch (error) {
      console.error("Error processing MD History:", error);
    } finally {
      const controller = new AbortController();
      set_abort_controller(controller);
      set_job_status(2);
      post_api_ep_history(
        ep_history_POST_DATA,
        osa_total_length,
        md_total_length,
        controller
      );
    }
  };
  // - API POST MD HISTORY
  // + API POST EP HISTORY
  const post_api_ep_history = async (
    ep_history_POST_DATA,
    osa_total_length,
    md_total_length,
    abort_controller
  ) => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    let ep_total_length = 0;
    try {
      for (let i = 0; i < ep_history_POST_DATA.length; i += batch_size) {
        const batch = ep_history_POST_DATA.slice(i, i + batch_size);
        const promises = batch.map(async (item) => {
          if (!item.a2_Dateupdated || !item.a3_TDSCode) {
            return;
          }
          try {
            const response = await axios.post(
              `https://benbyextportal.com/insert/api/PostEPHistory`,
              {
                EPID: item.a1_ID,
                Dateupdated: item.a2_Dateupdated,
                TDSCode: item.a3_TDSCode,
                Time: item.a4_Time,
                Implemented: item.a5_Implemented,
                CorrectLocation: item.a6_CorrectLocation,
                CorrectPlanogram: item.a7_CorrectPlanogram,
                WithPicture: item.a8_WithPicture,
                ImplementedRemarks: item.b1_ImplementedRemarks,
                CorrectLocationRemarks: item.b2_CorrectLocationRemarks,
                CorrectPlanogramRemarks: item.b3_CorrectPlanogramRemarks,
              },
              { signal: abort_controller.signal }
            );

            if (response.status === 200) {
              set_ep_history_list((prevList) => [
                ...prevList,
                {
                  a1_ID: item.a1_ID,
                  a2_Dateupdated: format_raw_date(item.a2_Dateupdated, "/"),
                },
              ]);
              set_ep_history_pushed_length((prevLength) => prevLength + 1);
              ep_total_length++;
            }
          } catch (error) {
            if (axios.isCancel(error)) {
              console.log("Request canceled", error.message);
            } else {
              console.log(`Error with item: TDS CODE: ${item.a3_TDSCode}`);
            }
          }
        });
        await Promise.all(promises);
        console.log(`EP History batch: ${Math.floor(i / batch_size) + 1}`);
        await sleep(delay);
      }
    } catch (error) {
      console.error("Error processing MD History:", error);
    } finally {
      set_start_job(false);
      set_job_status(3);
      setTimeout(
        () =>
          create_job_log(osa_total_length, md_total_length, ep_total_length),
        500
      );
    }
  };
  // - API POST EP HISTORY

  const cancel_post_process = () => {
    set_page_display("");
  };

  // + CREATE JOB LOG
  const create_job_log = async (
    osa_total_length,
    md_total_length,
    ep_total_length
  ) => {
    const date_now = new Date();
    try {
      await set(
        ref(
          db,
          `/DB1_BENBY_MERCH_APP/TBL_JOB_LOG/${get_unix_timestamp(date_now)}`
        ),
        {
          a1_ID: get_unix_timestamp(date_now),
          b1_CATEGORY: "MANUAL TRANSFER",
          c1_DATE: selected_date,
          d1_OSA_HISTORY: osa_total_length,
          d2_MD_HISTORY: md_total_length,
          d3_EP_HISTORY: ep_total_length,
          e1_STATUS: "COMPLETE",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  // - CREATE JOB LOG
  // - JOB PROCESS ===============================================================================================

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="admin-page-container">
        {/* + PAGE LABEL */}
        <div className="admin-page-label">
          <div
            onClick={() => set_page_display("")}
            style={{ cursor: "pointer" }}
            className="label-1"
          >
            Scheduling
          </div>
          <div className="content-center" style={{ width: "4vh" }}>
            <FaAnglesRight style={{ fontSize: "1.2vh" }} />
          </div>
          <div>Manual Transfer</div>
          <div
            className="h-100 content-center"
            style={{ position: "absolute", right: "0", gap: "1vh" }}
          >
            <button
              className="h-100 btn-general btn-gray btn-sm"
              style={{ padding: "0 2vh" }}
              onClick={() => set_page_display("")}
            >
              Go Back
            </button>
          </div>
        </div>
        {/* - PAGE LABEL */}
        {/* + PAGE CONTENT */}
        <div className="w-100" style={{ height: "50vh" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "2vh",
            }}
          >
            {/* + JOB SCHEDULE */}
            <div className="admin-sched-card">
              <div
                className="content-center"
                style={{
                  position: "absolute",
                  top: "1vh",
                  left: "1vh",
                  height: "4vh",
                  gap: "1vh",
                }}
              >
                <div
                  style={{
                    height: "4vh",
                    width: "4vh",
                    background: "var(--primary-color)",
                    borderRadius: "0.4vh",
                  }}
                  className="content-center"
                >
                  <MdOutlineAccessTime
                    style={{ fontSize: "2vh", color: "#FFF" }}
                  />
                </div>
                <div
                  style={{ fontSize: "1.6vh", color: "var(--primary-color)" }}
                >
                  Job Schedule
                </div>
              </div>
              <div
                className="w-100 content-center"
                style={{
                  height: "3vh",
                  marginTop: "7vh",
                  gap: "1vh",
                  padding: "0 2vh",
                  fontSize: "1.4vh",
                }}
              >
                <div style={{ width: "100%" }}>Start Time</div>
              </div>
              <div
                className="w-100 content-center"
                style={{
                  height: "4vh",
                  gap: "1vh",
                  padding: "0 2vh",
                  fontSize: "1.4vh",
                }}
              >
                <div style={{ width: "100%", height: "100%" }}>
                  <input
                    className="w-100 h-100"
                    style={{
                      padding: "0 1vh",
                      fontSize: "1.6vh",
                      border: "0.1vh solid var(--border-color-light)",
                      borderRadius: "0.4vh",
                      letterSpacing: "0.1vh",
                      color: "var(--text-color)",
                    }}
                    type="date"
                    onChange={(e) => {
                      const date_value = e.target.value;
                      const date_object = new Date(date_value);
                      set_selected_date(format_date(date_object, "/"));
                    }}
                  />
                </div>
              </div>
              <div
                className="w-100 content-center"
                style={{
                  flexDirection: "column",
                  height: "15vh",
                  padding: "0 2vh",
                  fontSize: "1.4vh",
                  marginTop: "2vh",
                }}
              >
                <div
                  className="w-100 h-100 content-left"
                  style={{ gap: "1vh" }}
                >
                  <div
                    className="content-center"
                    style={{
                      height: "3vh",
                      width: "3vh",
                      border: "0.1vh solid var(--border-color-light)",
                      borderRadius: "0.4vh",
                    }}
                  >
                    {job_status !== 0 ? (
                      <FaCheck
                        style={{
                          fontSize: "1.6vh",
                          color: "var(--primary-color)",
                        }}
                      />
                    ) : null}
                  </div>
                  <div>OSA</div>
                </div>
                <div
                  className="w-100 h-100 content-left"
                  style={{ gap: "1vh" }}
                >
                  <div
                    className="content-center"
                    style={{
                      height: "3vh",
                      width: "3vh",
                      border: "0.1vh solid var(--border-color-light)",
                      borderRadius: "0.4vh",
                    }}
                  >
                    {job_status === 2 || job_status === 3 ? (
                      <FaCheck
                        style={{
                          fontSize: "1.6vh",
                          color: "var(--primary-color)",
                        }}
                      />
                    ) : null}
                  </div>
                  <div>Merch Deployment</div>
                </div>
                <div
                  className="w-100 h-100 content-left"
                  style={{ gap: "1vh" }}
                >
                  <div
                    className="content-center"
                    style={{
                      height: "3vh",
                      width: "3vh",
                      border: "0.1vh solid var(--border-color-light)",
                      borderRadius: "0.4vh",
                    }}
                  >
                    {job_status === 3 ? (
                      <FaCheck
                        style={{
                          fontSize: "1.6vh",
                          color: "var(--primary-color)",
                        }}
                      />
                    ) : null}
                  </div>
                  <div>Execution Planner</div>
                </div>
              </div>
              <div
                className="w-100 content-center"
                style={{
                  height: "7vh",
                  padding: "0 2vh",
                  fontSize: "1.4vh",
                  marginTop: "2vh",
                  gap: "1vh",
                }}
              >
                <button
                  className="btn-general btn-sm btn-green h-100 w-100 content-center"
                  style={{ fontSize: "1.8vh", letterSpacing: "0.2vh" }}
                  onClick={proceed_manual_job}
                  disabled={start_job ? true : false}
                >
                  {start_job ? (
                    <Oval
                      visible={true}
                      height="3.7vh"
                      width="3.7vh"
                      strokeWidth={10}
                      color="#fff"
                      secondaryColor="var(--border-light-color)"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    "START"
                  )}
                </button>
                <button
                  className="btn-general btn-sm btn-red h-100 w-100"
                  style={{ fontSize: "1.8vh", letterSpacing: "0.2vh" }}
                  onClick={cancel_post_process}
                  disabled={!start_job ? true : false}
                >
                  CANCEL
                </button>
              </div>
            </div>
            {/* - JOB SCHEDULE */}
            {/* + OSA HISTORY */}
            <div className="admin-sched-card">
              <div
                className="content-center"
                style={{
                  position: "absolute",
                  top: "1vh",
                  left: "1vh",
                  height: "4vh",
                  gap: "1vh",
                }}
              >
                <div
                  style={{
                    height: "4vh",
                    width: "4vh",
                    background: "var(--primary-color)",
                    borderRadius: "0.4vh",
                  }}
                  className="content-center"
                >
                  <MdOutlineAccessTime
                    style={{ fontSize: "2vh", color: "#FFF" }}
                  />
                </div>
                <div
                  style={{ fontSize: "1.6vh", color: "var(--primary-color)" }}
                >
                  OSA History
                </div>
              </div>
              <div
                className="w-100 content-left"
                style={{
                  height: "3vh",
                  padding: "0 2vh",
                  fontSize: "1.4vh",
                  marginTop: "7vh",
                }}
              >
                Data : {osa_pushed_length}
              </div>
              <div
                className="w-100 content-center"
                style={{
                  height: "32vh",
                  padding: "0.5vh 2vh 2vh 2vh",
                }}
              >
                <div
                  className="h-100 w-100"
                  style={{
                    overflowY: "scroll",
                    padding: "0 1vh",
                    border: "0.1vh solid var(--border-color-light)",
                  }}
                >
                  {/* <div
                    className="content-left"
                    style={{ gap: "1vh", fontSize: "1.4vh" }}
                  >
                    <div style={{ width: "10vh" }}>130005</div>
                    <div style={{ width: "14vh" }}>01/09/2025</div>
                    <div style={{ width: "10vh" }}>TDS-001</div>
                  </div> */}
                  {osa_list.slice(-50).map((data) => {
                    return (
                      <div
                        className="content-left"
                        style={{ gap: "1vh", fontSize: "1.4vh" }}
                      >
                        <div style={{ width: "10vh" }}> {data.a1_Matcode}</div>
                        <div style={{ width: "14vh" }}>
                          {data.a5_Dateupdated}
                        </div>
                        <div style={{ width: "10vh" }}>{data.a6_UpdatedBy}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* - OSA HISTORY */}
            {/* + MD HISTORY */}
            <div className="admin-sched-card">
              <div
                className="content-center"
                style={{
                  position: "absolute",
                  top: "1vh",
                  left: "1vh",
                  height: "4vh",
                  gap: "1vh",
                }}
              >
                <div
                  style={{
                    height: "4vh",
                    width: "4vh",
                    background: "var(--primary-color)",
                    borderRadius: "0.4vh",
                  }}
                  className="content-center"
                >
                  <MdOutlineAccessTime
                    style={{ fontSize: "2vh", color: "#FFF" }}
                  />
                </div>
                <div
                  style={{ fontSize: "1.6vh", color: "var(--primary-color)" }}
                >
                  MD History
                </div>
              </div>
              <div
                className="w-100 content-left"
                style={{
                  height: "3vh",
                  padding: "0 2vh",
                  fontSize: "1.4vh",
                  marginTop: "7vh",
                }}
              >
                Data : {md_history_pushed_length}
              </div>
              <div
                className="w-100 content-center"
                style={{
                  height: "32vh",
                  padding: "0.5vh 2vh 2vh 2vh",
                }}
              >
                <div
                  className="h-100 w-100"
                  style={{
                    overflowY: "scroll",
                    padding: "0 1vh",
                    border: "0.1vh solid var(--border-color-light)",
                  }}
                >
                  {/* <div
                    className="content-left"
                    style={{ gap: "1vh", fontSize: "1.4vh" }}
                  >
                    <div style={{ width: "10vh" }}>TDS-001</div>
                    <div style={{ width: "24vh" }}>01/09/2025</div>
                  </div> */}
                  {md_history_list.slice(-50).map((data) => {
                    return (
                      <div
                        className="content-left"
                        style={{ gap: "1vh", fontSize: "1.4vh" }}
                      >
                        <div style={{ width: "10vh" }}>{data.tdsID}</div>
                        <div style={{ width: "24vh" }}>
                          {format_raw_date(data.datetoday, "/")}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* - MD HISTORY */}
            {/* + EP HISTORY */}
            <div className="admin-sched-card">
              <div
                className="content-center"
                style={{
                  position: "absolute",
                  top: "1vh",
                  left: "1vh",
                  height: "4vh",
                  gap: "1vh",
                }}
              >
                <div
                  style={{
                    height: "4vh",
                    width: "4vh",
                    background: "var(--primary-color)",
                    borderRadius: "0.4vh",
                  }}
                  className="content-center"
                >
                  <MdOutlineAccessTime
                    style={{ fontSize: "2vh", color: "#FFF" }}
                  />
                </div>
                <div
                  style={{ fontSize: "1.6vh", color: "var(--primary-color)" }}
                >
                  EP History
                </div>
              </div>
              <div
                className="w-100 content-left"
                style={{
                  height: "3vh",
                  padding: "0 2vh",
                  fontSize: "1.4vh",
                  marginTop: "7vh",
                }}
              >
                Data : {ep_history_pushed_length}
              </div>
              <div
                className="w-100 content-center"
                style={{
                  height: "32vh",
                  padding: "0.5vh 2vh 2vh 2vh",
                }}
              >
                <div
                  className="h-100 w-100"
                  style={{
                    overflowY: "scroll",
                    padding: "0 1vh",
                    border: "0.1vh solid var(--border-color-light)",
                  }}
                >
                  {/* <div
                    className="content-left"
                    style={{ gap: "1vh", fontSize: "1.4vh" }}
                  >
                    <div style={{ width: "10vh" }}>245</div>
                    <div style={{ width: "24vh" }}>01/09/2025</div>
                  </div> */}
                  {md_history_list.slice(-50).map((data) => {
                    return (
                      <div
                        className="content-left"
                        style={{ gap: "1vh", fontSize: "1.4vh" }}
                      >
                        <div style={{ width: "10vh" }}>{data.tdsID}</div>
                        <div style={{ width: "24vh" }}>
                          {format_raw_date(data.datetoday, "/")}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* - EP HISTORY */}
          </div>
        </div>
        {/* - PAGE CONTENT */}
      </div>
    </React.Fragment>
  );
};

export default P4_2_MANUAL_TRANSFER_INDEX;
