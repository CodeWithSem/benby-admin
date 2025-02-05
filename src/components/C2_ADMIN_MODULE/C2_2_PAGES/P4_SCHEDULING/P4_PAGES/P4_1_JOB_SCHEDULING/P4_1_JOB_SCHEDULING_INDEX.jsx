import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { db } from "../../../../../../assets/scripts/firebase";
import { ref, set, get, onValue, update } from "firebase/database";
import { FaAnglesRight, FaChevronDown, FaCheck } from "react-icons/fa6";
import { MdOutlineAccessTime } from "react-icons/md";
import {
  format_raw_date,
  format_date,
  get_unix_timestamp,
} from "../../../../../../assets/scripts/functions/format_function";

const P4_1_JOB_SCHEDULING_INDEX = ({ set_page_display }) => {
  const current_data = new Date();
  const [start_job, set_start_job] = useState(false);
  const [job_status, set_job_status] = useState(0);

  const get_yesterday = () => {
    const yesterday = new Date(current_data);
    yesterday.setDate(current_data.getDate() - 1);

    return format_raw_date(yesterday, "/");
  };

  // + START AND END TIME
  const [schedule_start_time, set_schedule_start_time] = useState(0);
  const [schedule_end_time, set_schedule_end_time] = useState(0);
  const get_schedule_time = () => {
    const data_ref_start_time = ref(db, `/DB1_BENBY_MERCH_APP/TBL_SCHEDULE`);

    onValue(
      data_ref_start_time,
      (snapshot) => {
        const time_data = snapshot.val();
        set_schedule_start_time(time_data.a1_START_TIME);
        set_schedule_end_time(time_data.a2_END_TIME);
      },
      (error) => {
        console.error("Error checking data:", error);
      }
    );
  };

  useEffect(() => {
    get_schedule_time();
  }, []);

  const handle_start_time = async (value) => {
    try {
      await update(ref(db, `/DB1_BENBY_MERCH_APP/TBL_SCHEDULE`), {
        a1_START_TIME: parseInt(value),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handle_end_time = async (value) => {
    try {
      await update(ref(db, `/DB1_BENBY_MERCH_APP/TBL_SCHEDULE`), {
        a2_END_TIME: parseInt(value),
      });
    } catch (error) {
      console.log(error);
    }
  };

  // - START AND END TIME

  // + TIME VALIDATION
  const [process_start, set_process_start] = useState(true);
  const [progress, set_progress] = useState(0); // 0 = Not Done || 1 = Processing || 2 = Done
  const [is_valid, set_is_valid] = useState(false);
  const [start_time, setstart_time] = useState(0);
  const [end_time, setend_time] = useState(0);

  const [osa_POST_DATA, set_osa_POST_DATA] = useState([]);
  const [md_history_POST_DATA, set_md_history_POST_DATA] = useState([]);

  // Function to validate time range
  const validate_time_range = (start_time, end_time) => {
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const start = parseInt(start_time, 10);
    const end = parseInt(end_time, 10);
    if (currentHours > end || (currentHours === end && currentMinutes > 0)) {
      set_is_valid(false);
      set_progress(0);
      console.log("N/A");
    } else if (currentHours < start) {
      // Current time is out of range
      console.log("Current time is out of range");
      set_is_valid(false);
      set_progress(0);
    } else {
      // Current time is in range
      console.log("Current time is in range");
      set_is_valid(true);
      get_schedule_date();
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!process_start) {
        validate_time_range(schedule_start_time, schedule_end_time);
      }
    }, 1800000);
    return () => clearInterval(intervalId);
  }, [schedule_start_time, schedule_end_time, process_start]);

  const start_post_process = () => {
    set_start_job(true);
    set_process_start(false);
    validate_time_range(schedule_start_time, schedule_end_time);
  };

  const cancel_post_process = () => {
    set_process_start(true);
    set_start_job(false);
    cancel_post_api_osa();
    set_page_display("");
  };
  // - TIME VALIDATION

  // + GET SCHEDULE DATE
  const get_schedule_date = async () => {
    const date_update = new Date();
    try {
      const response = await get(
        ref(db, `/DB1_BENBY_MERCH_APP/TBL_SCHEDULE/b1_UPDATE_DATE`)
      );
      const data = response.val();
      if (data === format_raw_date(date_update, "/")) {
        // Job is done
        console.log("JOB DONE!");
        set_progress(2);
        set_process_start(false);
      } else {
        // Job is processing
        console.log("JOB PROCESSING!");
        set_progress(1);
        set_process_start(true);
        fetch_data_osa(); // this is the 1ST JOB
      }
    } catch (error) {
      console.log(error);
    }
  };
  // - GET SCHEDULE DATE

  // + JOB PROCESS ===============================================================================================
  // + GET OSA
  const [osa_list, set_osa_list] = useState([]);
  const [osa_length, set_osa_length] = useState(0);
  const [osa_pushed_length, set_osa_pushed_length] = useState(0);

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
      const response = await get(
        ref(db, `/DB1_BENBY_MERCH_APP/TBL_OSA_1/DATA`)
      );
      const data = response.val();
      if (data) {
        Object.keys(data).forEach((parentPath) => {
          const childPaths = data[parentPath];
          if (childPaths) {
            Object.keys(childPaths).forEach((childPath) => {
              const osa_data = childPaths[childPath];
              if (osa_data) {
                Object.keys(osa_data).forEach((data) => {
                  const info = osa_data[data];
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
            item.a5_Dateupdated === get_yesterday()
        ).length
      );
      const osa_POST_DATA = products.filter(
        (item) =>
          item.a5_Dateupdated &&
          item.a6_UpdatedBy &&
          item.a5_Dateupdated === get_yesterday()
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
        md_list.filter((item) => item.b1_datetoday === get_yesterday()).length
      );
      const md_history_POST_DATA = md_list.filter(
        (item) => item.b1_datetoday === get_yesterday()
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
        (item) => item.a2_Dateupdated === get_yesterday()
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
                DateUpdated:
                  item.a5_Dateupdated.toString() || format_date(date_now, "/"),
                UpdatedBy: item.a6_UpdatedBy.toString() || "NULL",
                PCS: item.a7_Pcs.toString() || "",
                CS: item.a8_Cases.toString() || "",
                InnerBox: item.a9_InnerBox.toString() || "",
                Remarks: item.b2_Remarks.toString() || "",
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
      set_job_status(3);
      update_schedule_date(osa_total_length, md_total_length, ep_total_length);
    }
  };
  // - API POST EP HISTORY

  const cancel_post_api_osa = () => {
    if (abort_controller) {
      abort_controller.abort();
      set_abort_controller(null); // Reset the controller after aborting
    }
  };

  // + UPDATE SCHEDULE DATE
  const update_schedule_date = async (
    osa_total_length,
    md_total_length,
    ep_total_length
  ) => {
    const date_update = new Date();
    try {
      await update(ref(db, `/DB1_BENBY_MERCH_APP/TBL_SCHEDULE`), {
        b1_UPDATE_DATE: format_raw_date(date_update, "/"),
      });
    } catch (error) {
      console.log(error);
    } finally {
      set_process_start(false);
      set_progress(2);
      setTimeout(
        () =>
          create_job_log(osa_total_length, md_total_length, ep_total_length),
        500
      );
    }
  };
  // - UPDATE SCHEDULE DATE
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
          b1_CATEGORY: "JOB SCHEDULE",
          c1_DATE: get_yesterday(),
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
          <div>Job Scheduling</div>
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
                <div style={{ width: "50%" }}>Start Time</div>
                <div style={{ width: "50%" }}>End Time </div>
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
                <div style={{ width: "50%", height: "100%" }}>
                  <div className="select-general">
                    <select
                      className="w-100 h-100"
                      style={{ fontSize: "1.6vh", padding: "0 1vh" }}
                      value={schedule_start_time}
                      onChange={(e) => handle_start_time(e.target.value)}
                      aria-label="Start time select"
                    >
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={i}>
                          {i % 12 === 0 ? 12 : i % 12} {i < 12 ? "AM" : "PM"}
                        </option>
                      ))}
                    </select>
                    <div
                      className="h-100 content-center"
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        width: "4vh",
                        pointerEvents: "none",
                      }}
                    >
                      <FaChevronDown style={{ fontSize: "1.2vh" }} />
                    </div>
                  </div>
                </div>
                <div style={{ width: "50%", height: "100%" }}>
                  <div className="select-general">
                    <select
                      className="w-100 h-100"
                      style={{ fontSize: "1.6vh", padding: "0 1vh" }}
                      value={schedule_end_time}
                      onChange={(e) => handle_end_time(e.target.value)}
                      aria-label="End time select"
                    >
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={i}>
                          {i % 12 === 0 ? 12 : i % 12} {i < 12 ? "AM" : "PM"}
                        </option>
                      ))}
                    </select>
                    <div
                      className="h-100 content-center"
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        width: "4vh",
                        pointerEvents: "none",
                      }}
                    >
                      <FaChevronDown style={{ fontSize: "1.2vh" }} />
                    </div>
                  </div>
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
                  onClick={start_post_process}
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

export default P4_1_JOB_SCHEDULING_INDEX;
