import React, { useEffect, useRef, useState } from "react";
import { db } from "../../../../../../assets/scripts/firebase";
import { ref, set, get } from "firebase/database";
import { Oval } from "react-loader-spinner";
import { FaAnglesRight, FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { MdSearch } from "react-icons/md";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowRight,
} from "react-icons/md";
import M1_DELETE_FILTER from "./P2_7_MODALS/M1_DELETE_FILTER";

const P2_7_MCL_INDEX = ({ set_page_display }) => {
  const [show_delete_filter_modal, set_show_delete_filter_modal] =
    useState(false);
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

  // + PAGINATION PROCESS ========================================
  const [mcl_raw_data, set_mcl_raw_data] = useState([]);
  const [mcl_list, set_mcl_list] = useState([]);
  const [selected_list_id, set_selected_list_id] = useState("");
  const [refresh_mcl_list, set_refresh_mcl_list] = useState(false);
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

  const get_mcl_raw_data = async () => {
    try {
      set_is_loading(true);
      const response = await get(ref(db, `/DB1_BENBY_MERCH_APP/TBL_MCL/DATA`));
      const data = response.val();
      const data_array_mcl = Object.values(data);
      set_mcl_raw_data(data_array_mcl);
    } catch (error) {
      console.log(error);
    } finally {
      set_is_loading(false);
    }
  };

  useEffect(() => {
    get_mcl_raw_data();
  }, []);

  useEffect(() => {
    filter_data(mcl_raw_data);
  }, [mcl_raw_data, current_page, search_query, refresh_mcl_list, sort_config]);

  const filter_data = (mcl_data) => {
    const filtered_data = apply_search_filter(mcl_data, search_query);
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
    set_mcl_list(indexed_data);
  };

  const apply_search_filter = (data, query) => {
    const fields_to_search = [
      "a1_Matcode",
      "a2_GroupName",
      "a3_Brand",
      "a4_SubBrand",
      "a5_SKUName",
      "a6_Dateuploaded",
      "b3_Category",
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
    set_refresh_mcl_list((prev) => !prev);
  };
  // - PAGINATION PROCESS ========================================

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

  // + DELETE FILTER
  const [delete_loading, set_delete_loading] = useState(false);

  const delete_all = async () => {
    const path = `/DB1_BENBY_MERCH_APP/TBL_MCL/DATA`;
    try {
      set_delete_loading(true);
      await set(ref(db, path), null);
      alert("Deletion Success!");
      set_refresh_mcl_list((prev) => !prev);
      set_show_delete_filter_modal(false);
    } catch (error) {
      set_delete_loading(false);
      console.log(error);
    } finally {
      set_delete_loading(false);
    }
  };
  // - DELETE FILTER

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
            Cloud Management
          </div>
          <div className="content-center" style={{ width: "4vh" }}>
            <FaAnglesRight style={{ fontSize: "1.2vh" }} />
          </div>
          <div>MCL (Products)</div>
          <div
            className="h-100 content-center"
            style={{ position: "absolute", right: "0", gap: "1vh" }}
          >
            {/* <button
              className="h-100 btn-general btn-green btn-sm"
              style={{ padding: "0 2vh" }}
              onClick={() => set_page_display("")}
            >
              Export as Excel
            </button> */}
            <button
              className="h-100 btn-general btn-red btn-sm"
              style={{ padding: "0 2vh" }}
              onClick={() => set_show_delete_filter_modal(true)}
            >
              Delete Filter
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
                {render_thead("MAT CODE", "a1_Matcode", 20)}
                {render_thead("GROUP NAME", "a2_GroupName", 20)}
                {render_thead("BRAND", "a3_Brand", 30)}
                {render_thead("SUB BRAND", "a4_SubBrand", 30)}
                {render_thead("SKU NAME", "a5_SKUName", 50)}
                {render_thead("DATE UPLOADED", "a6_Dateuploaded", 20)}
                {render_thead("UPLOADED BY", "a7_UploadedBy", 20)}
                {render_thead("STATUS", "a8_Status", 20)}
                {render_thead("ARRANGE BY", "a9_ArrangeBy", 20)}
                {render_thead("FOR AVAILABLE", "b1_ForAvailable", 20)}
                {render_thead("FOR OUT OF STOCK", "b2_ForOutofStock", 20)}
                {render_thead("CATEGORY", "b3_Category", 20)}
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
                    {mcl_list.length !== 0 ? (
                      <React.Fragment>
                        {mcl_list.map((data) => {
                          return (
                            <tr
                              style={{
                                textAlign: "center",
                                fontSize: "1.2vh",
                                height: "4vh",
                              }}
                              className={`${
                                selected_list_id === data.a1_Matcode
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() =>
                                set_selected_list_id(data.a1_Matcode)
                              }
                            >
                              {render_row(data.index, 10)}
                              {render_row(data.a1_Matcode, 20)}
                              {render_row(data.a2_GroupName, 20)}
                              {render_row(data.a3_Brand, 30)}
                              {render_row(data.a4_SubBrand, 30)}
                              {render_row(data.a5_SKUName, 50)}
                              {render_row(data.a6_Dateuploaded, 20)}
                              {render_row(data.a7_UploadedBy, 20)}
                              {render_row(data.a8_Status, 20)}
                              {render_row(data.a9_ArrangeBy, 20)}
                              {render_row(data.b1_ForAvailable, 20)}
                              {render_row(data.b2_ForOutofStock, 20)}
                              {render_row(data.b3_Category, 20)}
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    ) : null}
                    {mcl_list.length === 0 ? (
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
          {mcl_list.length !== 0 ? (
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
      {show_delete_filter_modal ? (
        <M1_DELETE_FILTER
          set_show_delete_filter_modal={set_show_delete_filter_modal}
          delete_loading={delete_loading}
          delete_all={delete_all}
        />
      ) : null}
    </React.Fragment>
  );
};

export default P2_7_MCL_INDEX;
