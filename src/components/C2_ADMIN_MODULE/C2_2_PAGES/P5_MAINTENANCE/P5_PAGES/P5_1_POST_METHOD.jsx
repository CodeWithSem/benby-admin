import React, { useState } from "react";
import { db } from "../../../../../assets/scripts/firebase";
import { set, ref } from "firebase/database";
import { FaAnglesRight, FaChevronDown } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

const P5_1_POST_METHOD = ({ set_page_display }) => {
  const [confirm_post_modal, set_confirm_post_modal] = useState(false);
  // + JSON CONVERSION
  const [json_text_data, set_json_text_data] = useState("");
  const [rows, set_rows] = useState([
    { column_1: "", column_2: "", data_type: "string" },
  ]);

  const handle_row_conversion = () => {
    const lines = json_text_data.split("\n");

    const formatted_rows = lines.map((line) => {
      const [column_1, column_2] = line.split(":").map((str) => str.trim());
      return {
        column_1: column_1 || "",
        column_2: column_2 || "",
        data_type: "string",
      };
    });

    set_rows(formatted_rows);
  };

  const add_row = () => {
    set_rows([...rows, { column_1: "", column_2: "", data_type: "string" }]);
  };
  const clear_row = () => {
    set_rows([]);
  };

  const remove_row = (index) => {
    const updated_rows = rows.filter((_, i) => i !== index);
    set_rows(updated_rows);
  };

  const handle_input_change = (index, field, value) => {
    const updated_rows = [...rows];
    updated_rows[index][field] = value;
    set_rows(updated_rows);
  };

  const get_json_object = () => {
    const json_value = {};
    rows.forEach((row) => {
      if (row.column_1 && row.column_2) {
        json_value[row.column_1] =
          row.data_type === "float" ? parseFloat(row.column_2) : row.column_2;
      }
    });
    return json_value;
  };

  const get_json_string = () => {
    const json_value = {};
    rows.forEach((row) => {
      if (row.column_1 && row.column_2) {
        json_value[row.column_1] =
          row.data_type === "float" ? parseFloat(row.column_2) : row.column_2;
      }
    });
    return JSON.stringify(json_value, null, 2);
  };
  // - JSON CONVERSION
  const [post_info, set_post_info] = useState({
    database: "",
    path: "",
  });

  const handle_add = async () => {
    const path = `/${post_info.database}/${post_info.path}`;
    try {
      await set(ref(db, path), get_json_object());
      alert("Data stored!");
      set_confirm_post_modal(false);
    } catch (error) {
      alert("Error storing data: " + error.message);
    }
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div
        style={{
          position: "relative",
          height: "4vh",
          width: "100%",
          marginBottom: "1vh",
          fontSize: "2vh",
          fontWeight: "500",
          color: "var(--primary-color)",
        }}
        className="content-left"
      >
        <div onClick={() => set_page_display("")} style={{ cursor: "pointer" }}>
          Maintenance
        </div>
        <div className="content-center" style={{ width: "4vh" }}>
          <FaAnglesRight style={{ fontSize: "1.2vh" }} />
        </div>
        <div>POST Method</div>
        <div className="h-100" style={{ position: "absolute", right: "0" }}>
          <button
            className="h-100 btn-general btn-gray btn-sm"
            style={{ padding: "0 2vh" }}
            onClick={() => set_page_display("")}
          >
            Go Back
          </button>
        </div>
      </div>
      <div
        style={{
          height: "10vh",
          gap: "2vh",
          marginBottom: "2vh",
        }}
        className="content-center w-100"
      >
        <div
          className="card h-100 content-center"
          style={{
            flex: "1",
            flexDirection: "column",
            padding: "1vh",
            fontSize: "1.8vh",
            gap: "1vh",
          }}
        >
          <div className="content-center w-100">
            <div className="content-left" style={{ width: "10vh" }}>
              DATABASE
            </div>
            <div className="content-center" style={{ width: "4vh" }}>
              :
            </div>
            <div style={{ flex: "1" }}>
              <input
                className="w-100 border-light"
                style={{ fontSize: "1.6vh", padding: "0.4vh" }}
                value={post_info.database}
                onChange={(e) => {
                  const data = e.target.value;
                  set_post_info({
                    ...post_info,
                    database: data.toString(),
                  });
                }}
              />
            </div>
          </div>
          <div className="content-center w-100">
            <div className="content-left" style={{ width: "10vh" }}>
              PATH
            </div>
            <div className="content-center" style={{ width: "4vh" }}>
              :
            </div>
            <div style={{ flex: "1" }}>
              <input
                className="w-100 border-light"
                style={{ fontSize: "1.6vh", padding: "0.4vh" }}
                value={post_info.path}
                onChange={(e) => {
                  const data = e.target.value;
                  set_post_info({
                    ...post_info,
                    path: data.toString(),
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ height: "78vh", width: "100%", gap: "2vh" }}
        className="content-center"
      >
        <div
          className="content-center h-100"
          style={{ flex: "0.6", flexDirection: "column" }}
        >
          <div
            className="w-100 content-center"
            style={{
              height: "4vh",
            }}
          >
            <div
              className="h-100 w-100"
              style={{
                fontSize: "2vh",
                fontWeight: "500",
                color: "var(--primary-color)",
              }}
            >
              JSON Structure
            </div>
          </div>
          <div className="w-100 card" style={{ flex: "1" }}>
            <textarea
              value={json_text_data}
              onChange={(e) => set_json_text_data(e.target.value)}
              className="w-100 h-100"
              style={{
                resize: "none",
                border: "none",
                borderRadius: "0.7vh",
                padding: "1vh",
                fontSize: "1.4vh",
                color: "var(--text-color)",
                lineHeight: "2.4vh",
              }}
              rows="5"
              cols="30"
              placeholder="Enter data as 'column_1: column_2' per line"
            />
          </div>
          <div
            className="w-100 content-right"
            style={{ height: "7vh", paddingTop: "2vh" }}
          >
            <button
              className="h-100 btn-general btn-green btn-sm"
              style={{ padding: "0 1vh", letterSpacing: "0.1vh" }}
              onClick={handle_row_conversion}
            >
              CONVERT TO TABLE
            </button>
          </div>
        </div>
        <div
          className="content-center h-100"
          style={{ flex: "1", flexDirection: "column" }}
        >
          <div
            className="w-100 content-center"
            style={{
              height: "4vh",
            }}
          >
            <div
              className="h-100 w-100"
              style={{
                fontSize: "2vh",
                fontWeight: "500",
                color: "var(--primary-color)",
              }}
            >
              Converted as Table
            </div>
          </div>
          <div className="w-100 card" style={{ flex: "1", padding: "1vh" }}>
            <div
              className="w-100 border-light"
              style={{ height: "64.5vh", overflow: "scroll", padding: "0" }}
            >
              <table
                className="converted-table"
                style={{
                  width: "100%",
                  marginBottom: "20px",
                  borderCollapse: "collapse",
                  fontSize: "1.8vh",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "40%",
                        textAlign: "start",
                        padding: "0.5vh",
                        fontWeight: "500",
                      }}
                      className="border-light"
                    >
                      FIELD
                    </th>
                    <th
                      style={{
                        width: "40%",
                        textAlign: "start",
                        padding: "0.5vh",
                        fontWeight: "500",
                      }}
                      className="border-light"
                    >
                      DATA
                    </th>
                    <th
                      style={{
                        width: "12%",
                        textAlign: "start",
                        padding: "0.5vh",
                        fontWeight: "500",
                      }}
                      className="border-light"
                    >
                      Type
                    </th>
                    <th style={{ width: "8%" }} className="border-light"></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td className="border-light" style={{ padding: "0.5vh" }}>
                        <input
                          type="text"
                          className="w-100"
                          style={{ border: "none", fontSize: "1.4vh" }}
                          placeholder="Field here..."
                          value={row.column_1}
                          onChange={(e) =>
                            handle_input_change(
                              index,
                              "column_1",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="border-light" style={{ padding: "0.5vh" }}>
                        <input
                          type="text"
                          className="w-100"
                          style={{ border: "none", fontSize: "1.4vh" }}
                          placeholder="Data here..."
                          value={row.column_2}
                          onChange={(e) =>
                            handle_input_change(
                              index,
                              "column_2",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="border-light" style={{ padding: "0.5vh" }}>
                        <div
                          className="h-100 w-100 content-center"
                          style={{ position: "relative" }}
                        >
                          <select
                            value={row.data_type}
                            onChange={(e) =>
                              handle_input_change(
                                index,
                                "data_type",
                                e.target.value
                              )
                            }
                            style={{
                              fontSize: "1.4vh",
                              padding: "0.5vh",
                              width: "100%",
                              border: "none",
                              appearance: "none",
                              color: "var(--text-color)",
                            }}
                          >
                            <option value="string">String</option>
                            <option value="float">Float</option>
                          </select>
                          <div
                            className="h-100 content-center"
                            style={{ position: "absolute", right: "1vh" }}
                          >
                            <FaChevronDown
                              style={{
                                fontSize: "1.4vh",
                                color: "var(--text-color)",
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="border-light">
                        <div
                          className="h-100 w-100 content-center"
                          style={{ padding: "0.2vh" }}
                        >
                          <button
                            className="content-center btn-general btn-red"
                            style={{
                              height: "2.5vh",
                              width: "2.5vh",
                              cursor: "pointer",
                              borderWidth: "0.1vh",
                            }}
                            onClick={() => remove_row(index)}
                          >
                            <MdClose
                              style={{ fontSize: "1.4vh", color: "#FFF" }}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div
            className="w-100 content-right"
            style={{ height: "7vh", paddingTop: "2vh", gap: "1vh" }}
          >
            <button
              className="h-100 btn-general btn-blue btn-sm"
              style={{ padding: "0 1vh", letterSpacing: "0.1vh" }}
              onClick={add_row}
            >
              ADD ROW
            </button>
            <button
              className="h-100 btn-general btn-red btn-sm"
              style={{ padding: "0 1vh", letterSpacing: "0.1vh" }}
              onClick={clear_row}
            >
              CLEAR ROW
            </button>
            <button
              className="h-100 btn-general btn-gray btn-sm"
              style={{ padding: "0 1vh", letterSpacing: "0.1vh" }}
              onClick={() => console.log(get_json_string())}
              //   onClick={() => console.log(get_json_object())}
            >
              Console.log
            </button>
            <button
              className="h-100 btn-general btn-green btn-sm"
              style={{ padding: "0 1vh", letterSpacing: "0.1vh" }}
              onClick={() => set_confirm_post_modal(true)}
              disabled={
                rows.length > 0 &&
                rows.every((row) => row.column_1 && row.column_2)
                  ? false
                  : true
              }
            >
              POST DATA
            </button>
          </div>
        </div>
      </div>
      {/* + MODAL */}
      {confirm_post_modal ? (
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
                height: "7vh",
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
                Post Method
              </div>
              <div
                style={{
                  height: "4.2vh",
                  width: "4.2vh",
                  marginRight: "2vh",
                }}
                className="btn-close-modal"
                onClick={() => set_confirm_post_modal(false)}
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
              <div
                className="w-100 content-center"
                style={{ height: "4vh", marginBottom: "2vh" }}
              >
                Are you sure you want to POST in this path?
              </div>
              <div className="w-100" style={{ height: "8vh" }}>
                <div
                  className="content-center w-100"
                  style={{ marginBottom: "1vh" }}
                >
                  <div className="content-left" style={{ width: "10vh" }}>
                    DATABASE
                  </div>
                  <div className="content-center" style={{ width: "4vh" }}>
                    :
                  </div>
                  <div style={{ flex: "1" }}>
                    <input
                      className="w-100 border-light"
                      style={{
                        fontSize: "1.6vh",
                        padding: "0.4vh",
                        color: "var(--text-color)",
                      }}
                      value={post_info.database}
                      disabled
                    />
                  </div>
                </div>
                <div className="content-center w-100">
                  <div className="content-left" style={{ width: "10vh" }}>
                    PATH
                  </div>
                  <div className="content-center" style={{ width: "4vh" }}>
                    :
                  </div>
                  <div style={{ flex: "1" }}>
                    <input
                      className="w-100 border-light"
                      style={{
                        fontSize: "1.6vh",
                        padding: "0.4vh",
                        color: "var(--text-color)",
                      }}
                      value={post_info.path}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* - MODAL CONTENT */}
            {/* + MODAL BUTTONS */}
            <div
              style={{
                width: "100%",
                height: "7vh",
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
                  padding: "0 2vh",
                  borderRadius: "0.5vh",
                  fontSize: "1.6vh",
                  letterSpacing: "0.1vh",
                }}
                className="btn-general btn-green btn-sm"
                onClick={handle_add}
              >
                Post Data
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
                onClick={() => set_confirm_post_modal(false)}
              >
                Close
              </button>
            </div>
            {/* - MODAL BUTTONS */}
          </div>
        </React.Fragment>
      ) : null}
      {/* - MODAL */}
    </React.Fragment>
  );
};

export default P5_1_POST_METHOD;
