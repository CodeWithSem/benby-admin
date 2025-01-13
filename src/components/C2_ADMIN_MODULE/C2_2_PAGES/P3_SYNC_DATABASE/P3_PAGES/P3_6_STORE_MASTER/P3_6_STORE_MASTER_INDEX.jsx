import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { db } from "../../../../../../assets/scripts/firebase";
import { ref, set, get, remove } from "firebase/database";
import { FaAnglesRight, FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { MdSearch } from "react-icons/md";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowRight,
} from "react-icons/md";

const P3_6_STORE_MASTER_INDEX = ({ set_page_display }) => {
  // + TABLE SCROLL
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
  // - TABLE SCROLL
  // + GET METHOD MERCH DEPLOYMENT
  const [abort_controller_get_MCP, set_abort_controller_get_MCP] =
    useState(null);

  const [db_store_list, set_db_store_list] = useState([]);
  const [is_get_store_loading, set_is_get_store_loading] = useState(false);
  const [show_get_store_alert, set_show_get_store_alert] = useState(false);
  const [show_push_store_alert, set_show_push_store_alert] = useState(false);
  const [data_exist, set_data_exist] = useState(false);

  const get_MCP = async () => {
    set_db_store_list([]);
    const controller = new AbortController();
    set_abort_controller_get_MCP(controller); // Store the controller for later use

    set_is_get_store_loading(true);
    set_show_get_store_alert(true);

    try {
      const response = await axios.get(
        "https://benbyextportal.com/home/api/get/GetStoreMaster?Storecode=0",
        {
          signal: controller.signal,
        }
      );
      const data_with_ids = response.data.map((item) => ({
        ...item,
        a0_ID: uuidv4(),
      }));
      console.log(data_with_ids);
      set_db_store_list(data_with_ids);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.warn("Request canceled", error.message);
      } else {
        console.error("Error fetching data:", error);
      }
    } finally {
      set_is_get_store_loading(false);
      set_show_get_store_alert(false);
    }
  };

  // Cancel function
  const cancel_get_MCP = () => {
    if (abort_controller_get_MCP) {
      abort_controller_get_MCP.abort(); // Cancel the request
      set_abort_controller_get_MCP(null); // Reset the controller after aborting
    }
  };
  // - GET METHOD MERCH DEPLOYMENT

  // + PAGINATION PROCESS ========================================
  const [store_list, set_store_list] = useState([]);
  const [selected_list_id, set_selected_list_id] = useState("");
  const [refresh_store_list, set_refresh_store_list] = useState(false);
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
    filter_data(db_store_list);
  }, [
    db_store_list,
    current_page,
    search_query,
    refresh_store_list,
    sort_config,
  ]);

  const filter_data = (osa_data) => {
    const filtered_data = apply_search_filter(osa_data, search_query);
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
    set_store_list(indexed_data);
  };

  const apply_search_filter = (data, query) => {
    const fields_to_search = [
      "cstCode",
      "cstName1",
      "cstName2",
      "chain",
      "chainID",
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
    set_refresh_store_list((prev) => !prev);
  };
  // - PAGINATION PROCESS ========================================
  // + PUSH TO CLOUD METHOD STORE
  const [batch_process, set_batch_process] = useState("");
  const push_to_cloud_store = async (
    data,
    batch_size = 1000,
    delay = 500,
    abort_controller
  ) => {
    set_show_push_store_alert(true);
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
            `/DB2_BENBY_MERCH_APP/TBL_STORE_MASTER/DATA/${item.cstCode}`
          );

          // Set the data (you may need to adapt this to support cancellation)
          await set(data_ref, {
            a1_cstCode: item.cstCode,
            a2_cstName1: item.cstName1 || "",
            a3_cstName2: item.cstName2 || "",
            b1_chain: item.chain || "",
            b2_chainID: parseInt(item.chainID) || 0,
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
          set_show_push_store_alert(false);
          break; // Exit the loop if cancelled
        }

        await process_batch(batch); // Process the current batch

        console.log(`Processed batch ${Math.floor(i / batch_size) + 1}`);
        set_batch_process(
          `Processed Batch : ${Math.floor(i / batch_size) + 1}`
        );

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
      set_show_push_store_alert(false);
    }
  };

  // Example usage in your component
  const [abort_controller, set_abort_controller] = useState(null);

  const handle_push_to_cloud_store = (data) => {
    const controller = new AbortController();
    set_abort_controller(controller);

    push_to_cloud_store(data, 1000, 500, controller);
  };

  const cancel_push_to_cloud_store = () => {
    if (abort_controller) {
      abort_controller.abort();
      set_abort_controller(null); // Reset the controller after aborting
    }
  };

  // - PUSH TO CLOUD METHOD STORE

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
            Fetching Store Master Data from database...
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
            Transfering Store Data to cloud...
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
              onClick={cancel_push_to_cloud_store}
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
          <div>Store Master</div>
          <div
            className="h-100 content-center"
            style={{ position: "absolute", right: "0", gap: "1vh" }}
          >
            <button
              className="h-100 btn-general btn-green btn-sm"
              style={{ padding: "0 2vh" }}
              onClick={() => get_MCP()}
            >
              Get from Database
            </button>
            <button
              className="h-100 btn-general btn-green btn-sm"
              style={{ padding: "0 2vh" }}
              onClick={() => {
                handle_push_to_cloud_store(db_store_list);
              }}
              disabled={
                is_get_store_loading || db_store_list.length === 0
                  ? true
                  : false
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
                {render_thead("#", "", 10)}
                {render_thead("STORE CODE", "cstCode", 20)}
                {render_thead("STORE NAME 1", "cstName1", 60)}
                {render_thead("STORE NAME 2", "cstName2", 60)}
                {render_thead("CHAIN", "chain", 30)}
                {render_thead("CHAIN ID", "chainID", 25)}
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
                    {store_list.length !== 0 ? (
                      <React.Fragment>
                        {store_list.map((data) => {
                          return (
                            <tr
                              style={{
                                textAlign: "center",
                                fontSize: "1.2vh",
                                height: "4vh",
                              }}
                              className={`${
                                selected_list_id === data.a0_ID
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() => set_selected_list_id(data.a0_ID)}
                            >
                              {render_row(data.index, 10)}
                              {render_row(data.cstCode, 20)}
                              {render_row(data.cstName1, 60)}
                              {render_row(data.cstName2, 60)}
                              {render_row(data.chain, 30)}
                              {render_row(data.chainID, 25)}
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    ) : null}
                    {store_list.length === 0 ? (
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
          {store_list.length !== 0 ? (
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
      {is_get_store_loading ? RENDER_LOADING_MODAL() : null}
      {show_push_store_alert ? RENDER_PUSH_MODAL() : null}
    </React.Fragment>
  );
};

export default P3_6_STORE_MASTER_INDEX;
