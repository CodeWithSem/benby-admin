import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import { MdClose } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa6";

const M1_DELETE_FILTER = ({
  set_show_delete_filter_modal,
  delete_loading,
  delete_all,
  delete_by_date_uploaded,
  delete_by_employee_id,
  delete_by_store_code,
}) => {
  const [selected_filter, set_selected_filter] = useState("Delete All");
  const [filter_value, set_filter_value] = useState("");

  const handle_filter_delete = (selected_filter, filter_value) => {
    if (selected_filter === "Delete All") {
      delete_all();
    } else if (selected_filter === "Date Uploaded") {
      delete_by_date_uploaded(filter_value);
    } else if (selected_filter === "Employee ID") {
      delete_by_employee_id(filter_value);
    } else if (selected_filter === "Store Code") {
      delete_by_store_code(filter_value);
    }
  };
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div class={`modal-overlay`}></div>
      <div
        class={`modal`}
        style={{
          width: "65vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* + MODAL HEADER */}
        <div
          style={{
            width: "100%",
            height: "6vh",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "0.1vh solid var(--border-color-light)",
            paddingTop: "0.3vh",
          }}
        >
          <div
            style={{
              fontSize: "1.8vh",
              color: "var(--text-color)",
              marginLeft: "2vh",
              letterSpacing: "0.1vh",
            }}
          >
            Delete Filter
          </div>
          <div
            style={{
              height: "4.2vh",
              width: "4.2vh",
              marginRight: "2vh",
            }}
            className="btn-close-modal"
            onClick={() => set_show_delete_filter_modal(false)}
          >
            <MdClose
              style={{
                color: "var(--text-color)",
                fontSize: "2.4vh",
              }}
            />
          </div>
        </div>
        {/* - MODAL HEADER */}
        {/* + MODAL CONTENT */}
        <div
          style={{
            width: "100%",
            height: "100%",
            padding: "3vh",
            fontSize: "1.6vh",
            color: "var(--text-color)",
          }}
        >
          <div className="content-center w-100">
            <div className="content-left" style={{ width: "10vh" }}>
              Filter By
            </div>
            <div className="content-center" style={{ width: "4vh" }}>
              :
            </div>
            <div style={{ flex: "1" }}>
              <div className="select-general" style={{ height: "4vh" }}>
                <select
                  className="h-100 w-100"
                  style={{ fontSize: "1.6vh", padding: "0 1vh" }}
                  value={selected_filter}
                  onChange={(e) => set_selected_filter(e.target.value)}
                >
                  <option>Delete All</option>
                  <option>Date Uploaded</option>
                  <option>Employee ID</option>
                  <option>Store Code</option>
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
          {selected_filter !== "Delete All" ? (
            <div className="content-center w-100" style={{ marginTop: "2vh" }}>
              <div className="content-left" style={{ width: "10vh" }}>
                Value
              </div>
              <div className="content-center" style={{ width: "4vh" }}>
                :
              </div>
              <div style={{ flex: "1" }}>
                <div className="input-general" style={{ height: "4vh" }}>
                  <input
                    className="h-100 w-100"
                    style={{
                      fontSize: "1.6vh",
                      padding: "0 1vh",
                      letterSpacing: "0.1vh",
                    }}
                    value={filter_value}
                    onChange={(e) => set_filter_value(e.target.value)}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
        {/* - MODAL CONTENT */}
        {/* + MODAL BUTTONS */}
        <div
          style={{
            width: "100%",
            height: "6vh",
            borderTop: "0.1vh solid var(--border-color-light)",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "1vh",
            gap: "1vh",
          }}
        >
          <button
            style={{
              height: "100%",
              width: "10vh",
              padding: "0 2vh",
              borderRadius: "0.5vh",
              fontSize: "1.6vh",
              letterSpacing: "0.1vh",
            }}
            className="btn-general btn-red btn-sm content-center"
            onClick={() => handle_filter_delete(selected_filter, filter_value)}
            disabled={delete_loading ? true : false}
          >
            {delete_loading ? (
              <Oval
                visible={true}
                height="2.4vh"
                width="2.4vh"
                strokeWidth={8}
                color="#fff"
                secondaryColor="var(--border-color-light)"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              "Delete"
            )}
          </button>
          <button
            style={{
              height: "100%",
              padding: "0 2vh",
              borderRadius: "0.5vh",
              fontSize: "1.6vh",
              letterSpacing: "0.1vh",
            }}
            className="btn-general btn-gray btn-sm"
            onClick={() => set_show_delete_filter_modal(false)}
          >
            Close
          </button>
        </div>
        {/* - MODAL BUTTONS */}
      </div>
    </React.Fragment>
  );
};

export default M1_DELETE_FILTER;
