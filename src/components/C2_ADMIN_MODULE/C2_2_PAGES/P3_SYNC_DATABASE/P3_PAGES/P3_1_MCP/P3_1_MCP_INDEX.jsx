import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { db } from "../../../../../../assets/scripts/firebase";
import { set, ref } from "firebase/database";
import { FaAnglesRight, FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { MdSearch } from "react-icons/md";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { format_raw_date } from "../../../../../../assets/scripts/functions/format_function";

const P3_1_MCP_INDEX = ({ set_page_display }) => {
  const cont_1_ref = useRef(null);
  const cont_2_ref = useRef(null);

  const handle_scroll = (source, target) => {
    target.scrollLeft = source.scrollLeft;
  };

  const handle_scroll_1 = () => {
    if (cont_2_ref.current) {
      handle_scroll(cont_1_ref.current, cont_2_ref.current);
    }
  };

  const handle_scroll_2 = () => {
    if (cont_1_ref.current) {
      handle_scroll(cont_2_ref.current, cont_1_ref.current);
    }
  };

  // + GET METHOD MCP
  // + GET METHOD MCP
  const [abort_controller_get_MCP, set_abort_controller_get_MCP] =
    useState(null);

  const [db_mcp_list, set_db_mcp_list] = useState([]);
  const [is_get_MCP_loading, set_is_get_MCP_loading] = useState(false);
  const [show_get_MCP_alert, set_show_get_MCP_alert] = useState(false);
  const [show_push_MCP_alert, set_show_push_MCP_alert] = useState(false);
  const [data_exist, set_data_exist] = useState(false);

  const get_MCP = async () => {
    set_db_mcp_list([]);
    const controller = new AbortController();
    set_abort_controller_get_MCP(controller); // Store the controller for later use

    set_is_get_MCP_loading(true);
    set_show_get_MCP_alert(true);

    try {
      const response = await axios.get(
        "https://benbyextportal.com/home/api/get/GetMCP?Storecode=0&TDScode=0",
        {
          signal: controller.signal, // Pass the signal to Axios
        }
      );
      set_db_mcp_list(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.warn("Request canceled", error.message);
      } else {
        console.error("Error fetching data:", error); // Handle other errors
      }
    } finally {
      set_is_get_MCP_loading(false);
      set_show_get_MCP_alert(false);
    }
  };

  // Cancel function
  const cancel_get_MCP = () => {
    if (abort_controller_get_MCP) {
      abort_controller_get_MCP.abort(); // Cancel the request
      set_abort_controller_get_MCP(null); // Reset the controller after aborting
    }
  };
  // - GET METHOD MCP
  // - GET METHOD MCP

  // + PAGINATION PROCESS ========================================
  const [mcp_list, set_mcp_list] = useState([]);
  const [selected_list_id, set_selected_list_id] = useState("");
  const [refresh_mcp_list, set_refresh_mcp_list] = useState(false);
  const [total_count, set_total_count] = useState(0);
  const [is_loading, set_is_loading] = useState(false);
  const [search_query, set_search_query] = useState("");
  const [current_page, set_current_page] = useState(1);
  const [sort_config, set_sort_config] = useState({
    key: null,
    direction: "asc",
  });
  const data_per_page = 50;
  const max_visible_page = 5;

  useEffect(() => {
    filter_data(db_mcp_list);
  }, [db_mcp_list, current_page, search_query, refresh_mcp_list, sort_config]);

  const filter_data = (mcp_data) => {
    const filtered_data = apply_search_filter(mcp_data, search_query);
    const filtered_total_count = filtered_data.length;
    set_total_count(filtered_total_count);
    if (sort_config.key) {
      filtered_data.sort((a, b) => {
        if (a[sort_config.key] < b[sort_config.key]) {
          return sort_config.direction === "asc" ? -1 : 1;
        }
        if (a[sort_config.key] > b[sort_config.key]) {
          return sort_config.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    const start_index = (current_page - 1) * data_per_page;
    const end_index = start_index + data_per_page;
    const limited_data = filtered_data.slice(start_index, end_index);
    const indexed_data = limited_data.map((item, index) => ({
      ...item,
      index: start_index + index + 1,
    }));
    set_mcp_list(indexed_data);
  };

  const apply_search_filter = (data, query) => {
    const fields_to_search = [
      "id",
      "tDSName",
      "soldCode",
      "soldName",
      "chain",
      "tDSCategory",
      "supervisor",
      "week",
      "dateuploaded",
      "tDSCode",
      "rangeFrom",
      "rangeTo",
      "soldToStreet",
      "city",
      "area",
      "region",
      "channel",
    ];
    return data.filter((item) => {
      const search_by_text = fields_to_search.some((field) => {
        const value = item[field];
        if (value == null) return false;
        return value.toString().toLowerCase().includes(query.toLowerCase());
      });

      return search_by_text;
    });
  };

  const total_pages = Math.ceil(total_count / data_per_page);

  const get_page_numbers = () => {
    const page_numbers = [];

    if (total_pages <= max_visible_page) {
      for (let i = 1; i <= total_pages; i++) {
        page_numbers.push(i);
      }
    } else {
      let start_page = Math.max(
        current_page - Math.floor(max_visible_page / 2),
        1
      );
      const end_page = Math.min(start_page + max_visible_page - 1, total_pages);

      if (end_page - start_page < max_visible_page - 1) {
        const diff = max_visible_page - (end_page - start_page + 1);
        start_page = Math.max(start_page - diff, 1);
      }

      for (let i = start_page; i <= end_page; i++) {
        page_numbers.push(i);
      }
    }

    return page_numbers;
  };

  const handle_page_change = (pageNumber) => {
    set_current_page(pageNumber);
  };

  const handle_search_change = (event) => {
    set_search_query(event.target.value);
    set_current_page(1);
  };

  const handle_sort = (key) => {
    let direction = "asc";
    if (sort_config.key === key && sort_config.direction === "asc") {
      direction = "desc";
    }
    set_sort_config({ key, direction });
    set_refresh_mcp_list((prev) => !prev);
  };
  // - PAGINATION PROCESS ========================================
  // + PUSH TO CLOUD METHOD MCP
  const [batch_process, set_batch_process] = useState("");
  const push_to_cloud_mcp = async (
    data,
    batch_size = 1000,
    delay = 500,
    abort_controller
  ) => {
    set_is_get_MCP_loading(true);
    set_show_push_MCP_alert(true);
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    try {
      const process_batch = async (batch) => {
        const promises = batch.map(async (item) => {
          // Check if the operation is cancelled
          if (abort_controller.signal.aborted) {
            throw new Error("Operation cancelled");
          }

          const data_ref = ref(
            db,
            `/DB1_BENBY_MERCH_APP/TBL_MCP_1/DATA/${item.tDSCode}/${item.id}`
          );

          // Set the data (you may need to adapt this to support cancellation)
          await set(data_ref, {
            a1_ID: parseInt(item.id),
            a2_TDSName: item.tDSName || "",
            a3_SoldCode: item.soldCode || "",
            a4_SoldName: item.soldName || "",
            a5_Chain: item.chain || "",
            a6_TDSCategory: item.tDSCategory || "",
            a7_Supervisor: item.supervisor || "",
            a8_Week: item.week || "",
            a9_PlanVisit: format_raw_date(item.planVisit, "/") || "",
            b1_Dateuploaded: format_raw_date(item.dateuploaded, "/") || "",
            b2_UploadedBy: item.uploadedBy || "",
            b3_ActualDateVisited: item.actualDateVisited || "",
            b4_TDSCode: item.tDSCode || "",
            b5_Frequency: item.frequency || "",
            b6_Period: item.period || "",
            b7_Manager: item.manager || "",
            b8_login: item.login || "",
            b9_RangeFrom: format_raw_date(item.rangeFrom, "/") || "",
            c1_RangeTo: format_raw_date(item.rangeTo, "/") || "",
            c2_SoldToStreet: item.soldToStreet || "",
            c3_City: item.city || "",
            c4_Area: item.area || "",
            c5_Region: item.region || "",
            c6_StoreClass: item.storeClass || "",
            c7_Channel: item.channel || "",
            z1_md_status: 0,
            z2_osa_status: 0,
            z3_ep_status: 0,
          });
        });

        // Wait for all promises to resolve
        await Promise.all(promises);
      };

      for (let i = 0; i < data.length; i += batch_size) {
        const batch = data.slice(i, i + batch_size);

        // Check cancellation before processing the batch
        if (abort_controller.signal.aborted) {
          console.log("Operation cancelled before processing batch.");
          set_show_push_MCP_alert(false);
          break; // Exit the loop if cancelled
        }

        await process_batch(batch); // Process the current batch

        set_batch_process(
          `Processed Batch : ${Math.floor(i / batch_size) + 1}`
        );
        console.log(`Processed batch ${Math.floor(i / batch_size) + 1}`);

        // Sleep for the specified delay
        await sleep(delay);
      }
    } catch (error) {
      if (error.message === "Operation cancelled") {
        console.log("Push operation was cancelled.");
      } else {
        console.error("Error storing data:", error);
      }
    } finally {
      set_is_get_MCP_loading(false);
      set_show_push_MCP_alert(false);
    }
  };

  // Example usage in your component
  const [abort_controller, set_abort_controller] = useState(null);

  const handle_push_to_cloud_mcp = (mcp_data) => {
    const controller = new AbortController();
    set_abort_controller(controller);

    push_to_cloud_mcp(mcp_data, 1000, 500, controller);
  };

  const cancel_push_to_cloud_mcp = () => {
    if (abort_controller) {
      abort_controller.abort();
      set_abort_controller(null); // Reset the controller after aborting
    }
  };

  // - PUSH TO CLOUD METHOD MCP

  const render_thead = (label, column, width) => {
    return (
      <td
        className="h-100"
        style={{
          position: "relative",
          cursor: "pointer",
          minWidth: `${width}vh`,
        }}
        onClick={() => {
          if (column) {
            handle_sort(column);
          }
        }}
      >
        {label}
        <div
          className="h-100 content-center"
          style={{
            position: "absolute",
            right: "1vh",
            top: "0",
            fontSize: "1.6vh",
          }}
        >
          {sort_config.key === column &&
            (sort_config.direction === "asc" ? <FaCaretUp /> : <FaCaretDown />)}
        </div>
      </td>
    );
  };

  const render_row = (data, width) => {
    return (
      <td
        className="h-100"
        style={{
          minWidth: `${width}vh`,
          maxWidth: `${width}vh`,
          padding: "1vh 2vh",
        }}
      >
        {data}
      </td>
    );
  };

  const RENDER_LOADING_MODAL = () => {
    return (
      <React.Fragment>
        <div class={`modal-overlay`}></div>
        <div
          class={`modal`}
          style={{
            width: "50vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "10vh",
            }}
            className="content-center"
          >
            <Oval
              visible={true}
              height="4vh"
              width="4vh"
              strokeWidth={10}
              color="var(--primary-color)"
              secondaryColor="var(--primary-color-light)"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
          <div style={{ color: "var(--text-color)", fontSize: "1.8vh" }}>
            Fetching MCP Data from database...
          </div>
          <div
            style={{
              width: "100%",
              height: "9vh",
              padding: "2vh",
            }}
          >
            <button
              className="btn-general btn-red w-100 h-100"
              style={{
                borderRadius: "0.4vh",
                fontSize: "1.6vh",
                letterSpacing: "0.1vh",
              }}
              onClick={cancel_get_MCP}
            >
              CANCEL
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const RENDER_PUSH_MODAL = () => {
    return (
      <React.Fragment>
        <div class={`modal-overlay`}></div>
        <div
          class={`modal`}
          style={{
            width: "50vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "10vh",
            }}
            className="content-center"
          >
            <Oval
              visible={true}
              height="4vh"
              width="4vh"
              strokeWidth={10}
              color="var(--primary-color)"
              secondaryColor="var(--primary-color-light)"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
          <div style={{ color: "var(--text-color)", fontSize: "1.8vh" }}>
            Transfering MCP Data to cloud...
          </div>
          <div
            className="content-center"
            style={{
              color: "var(--text-color)",
              fontSize: "1.8vh",
              height: "7vh",
            }}
          >
            {batch_process}
          </div>
          <div
            style={{
              width: "100%",
              height: "9vh",
              padding: "2vh",
            }}
          >
            <button
              className="btn-general btn-red w-100 h-100"
              style={{
                borderRadius: "0.4vh",
                fontSize: "1.6vh",
                letterSpacing: "0.1vh",
              }}
              onClick={cancel_push_to_cloud_mcp}
            >
              CANCEL
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  };

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
            Sync Database
          </div>
          <div className="content-center" style={{ width: "4vh" }}>
            <FaAnglesRight style={{ fontSize: "1.2vh" }} />
          </div>
          <div>MCP</div>
          <div
            className="h-100 content-center"
            style={{ position: "absolute", right: "0", gap: "1vh" }}
          >
            <button
              className="h-100 btn-general btn-green btn-sm"
              style={{ padding: "0 2vh" }}
              onClick={() => get_MCP()}
            >
              GET from Database
            </button>
            <button
              className="h-100 btn-general btn-green btn-sm"
              style={{ padding: "0 2vh" }}
              onClick={() => {
                handle_push_to_cloud_mcp(db_mcp_list);
              }}
              disabled={
                is_get_MCP_loading || db_mcp_list.length === 0 ? true : false
              }
            >
              PUSH to Cloud
            </button>
            <button
              className="h-100 btn-general btn-gray btn-sm"
              style={{ padding: "0 2vh" }}
              onClick={() => set_page_display("")}
            >
              Go Back
            </button>
          </div>
        </div>
        {/* + PAGE LABEL */}
        {/* + SEARCH BAR */}
        <div
          style={{
            position: "relative",
            height: "5vh",
            marginBottom: "1vh",
          }}
          className="w-100 content-center"
        >
          <div className="search-input-container">
            <div className="h-100 content-center" style={{ width: "5vh" }}>
              <MdSearch style={{ fontSize: "2.4vh" }} />
            </div>
            <div className="h-100" style={{ flex: "1" }}>
              <input
                type="text"
                placeholder="Search..."
                value={search_query}
                onChange={(e) => {
                  handle_search_change(e);
                }}
              />
            </div>
          </div>
        </div>
        {/* - SEARCH BAR */}
        {/* + TABLE SECTION */}
        <div className="w-100" style={{ height: "77vh" }}>
          <div
            ref={cont_1_ref}
            className="admin-table-header border-light"
            style={{
              height: "5vh",
              overflow: "scroll",
              whiteSpace: "nowrap",
              background: "var(--primary-color)",
              borderBottom: "0",
            }}
            onScroll={handle_scroll_1}
          >
            <table
              className="h-100 text-center"
              style={{
                fontSize: "1.4vh",
                letterSpacing: "0.1vh",
                color: "#FFF",
                borderCollapse: "collapse",
              }}
            >
              <tr
                style={{
                  textAlign: "center",
                  fontSize: "1.2vh",
                  userSelect: "none",
                }}
              >
                {render_thead("#", "", "10")}
                {render_thead("ID", "id", "15")}
                {render_thead("TDS NAME", "tDSName", "40")}
                {render_thead("SOLD CODE", "soldCode", "20")}
                {render_thead("SOLD NAME", "soldName", "50")}
                {render_thead("CHAIN", "chain", "30")}
                {render_thead("TDS CATEGORY", "tDSCategory", "20")}
                {render_thead("SUPERVISOR", "supervisor", "40")}
                {render_thead("WEEK", "week", "20")}
                {render_thead("PLAN VISIT", "planVisit", "20")}
                {render_thead("DATE UPLOADED", "dateuploaded", "20")}
                {render_thead("UPLOADED BY", "uploadedBy", "20")}
                {render_thead("TDS CODE", "tDSCode", "20")}
                {render_thead("FREQUENCY", "frequency", "20")}
                {render_thead("PERIOD", "period", "20")}
                {render_thead("MANAGER", "manager", "40")}
                {render_thead("RANGE FROM", "rangeFrom", "20")}
                {render_thead("RANGE TO", "rangeTo", "20")}
                {render_thead("SOLD TO STREET", "soldToStreet", "50")}
                {render_thead("CITY", "city", "30")}
                {render_thead("AREA", "area", "30")}
                {render_thead("REGION", "region", "30")}
                {render_thead("STORE CLASS", "storeClass", "20")}
                {render_thead("CHANNEL", "channel", "20")}
              </tr>
            </table>
          </div>
          <div
            ref={cont_2_ref}
            className="admin-table-content border-light"
            style={{
              height: "72vh",
              overflow: "scroll",
              background: "#FFF",
              borderTop: "0",
            }}
            onScroll={handle_scroll_2}
          >
            <table
              style={{
                fontSize: "1.4vh",
                letterSpacing: "0.1vh",
                color: "var(--text-color)",
                borderCollapse: "collapse",
              }}
            >
              <tbody>
                {is_loading ? (
                  <React.Fragment>
                    <tr style={{ height: "70vh" }}>
                      <td style={{ width: "100vw" }}>
                        <div className="h-100 w-100 content-center">
                          <Oval
                            visible={true}
                            height="3.2vh"
                            width="3.2vh"
                            strokeWidth={10}
                            color="var(--primary-color)"
                            secondaryColor="var(--primary-color-light)"
                            ariaLabel="oval-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                          />
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ) : null}
                {!is_loading ? (
                  <React.Fragment>
                    {mcp_list.length !== 0 ? (
                      <React.Fragment>
                        {mcp_list.map((data) => {
                          return (
                            <tr
                              style={{
                                textAlign: "center",
                                fontSize: "1.2vh",
                                height: "4vh",
                              }}
                              className={`${
                                selected_list_id === data.id ? "selected" : ""
                              }`}
                              onClick={() => set_selected_list_id(data.id)}
                            >
                              {render_row(data.index, 10)}
                              {render_row(data.id, 15)}
                              {render_row(data.tDSName, 40)}
                              {render_row(data.soldCode, 20)}
                              {render_row(data.soldName, 50)}
                              {render_row(data.chain, 30)}
                              {render_row(data.tDSCategory, 20)}
                              {render_row(data.supervisor, 40)}
                              {render_row(data.week, 20)}
                              {render_row(data.planVisit, 20)}
                              {render_row(data.dateuploaded, 20)}
                              {render_row(data.uploadedBy, 20)}
                              {render_row(data.tDSCode, 20)}
                              {render_row(data.frequency, 20)}
                              {render_row(data.period, 20)}
                              {render_row(data.manager, 40)}
                              {render_row(data.rangeFrom, 20)}
                              {render_row(data.rangeTo, 20)}
                              {render_row(data.soldToStreet, 50)}
                              {render_row(data.city, 30)}
                              {render_row(data.area, 30)}
                              {render_row(data.region, 30)}
                              {render_row(data.storeClass, 20)}
                              {render_row(data.channel, 20)}
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    ) : null}
                    {mcp_list.length === 0 ? (
                      <React.Fragment>
                        <tr style={{ height: "70vh" }}>
                          <td style={{ width: "100vw" }}>
                            <div className="h-100 w-100 content-center">
                              No Record Found
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    ) : null}
                  </React.Fragment>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
        {/* - TABLE SECTION */}
        {/* + PAGINATION */}
        <div className="w-100" style={{ height: "7vh" }}>
          {mcp_list.length !== 0 ? (
            <React.Fragment>
              <div
                className="pg-container-fix"
                style={{ position: "absolute", right: "2vh", bottom: "2vh" }}
              >
                <button
                  className="pg-button-fix"
                  style={{ padding: "0 1vh" }}
                  id="startBtn"
                  disabled={current_page === 1}
                  onClick={() => handle_page_change(1)}
                >
                  <MdKeyboardDoubleArrowLeft style={{ fontSize: "2.4vh" }} />
                </button>
                <button
                  className="pg-button-fix prevNext"
                  style={{ padding: "0 1vh" }}
                  id="prev"
                  disabled={current_page === 1}
                  onClick={() => handle_page_change(current_page - 1)}
                >
                  <MdKeyboardArrowLeft style={{ fontSize: "2.4vh" }} />
                </button>

                <div className="pg-links-fix">
                  {get_page_numbers().map((number) => (
                    <a
                      key={number}
                      href="#"
                      className={`pg-link-fix ${
                        number === current_page ? "active" : ""
                      }`}
                      onClick={() => handle_page_change(number)}
                    >
                      {number}
                    </a>
                  ))}
                </div>

                <button
                  className="pg-button-fix prevNext"
                  style={{ padding: "0 1vh" }}
                  id="next"
                  disabled={current_page === total_pages}
                  onClick={() => handle_page_change(current_page + 1)}
                >
                  <MdKeyboardArrowRight style={{ fontSize: "2.4vh" }} />
                </button>
                <button
                  className="pg-button-fix"
                  style={{ padding: "0 1vh" }}
                  id="endBtn"
                  disabled={current_page === total_pages}
                  onClick={() => handle_page_change(total_pages)}
                >
                  <MdKeyboardDoubleArrowRight style={{ fontSize: "2.4vh" }} />
                </button>
              </div>
            </React.Fragment>
          ) : null}
        </div>
        {/* - PAGINATION */}
      </div>
      {is_get_MCP_loading ? RENDER_LOADING_MODAL() : null}
      {show_push_MCP_alert ? RENDER_PUSH_MODAL() : null}
    </React.Fragment>
  );
};

export default P3_1_MCP_INDEX;
