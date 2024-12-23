import React, { useState } from "react";
import { db } from "../../../../../assets/scripts/firebase";
import { set, ref } from "firebase/database";
import { FaAnglesRight } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

const P5_2_DELETE_METHOD = ({ set_page_display }) => {
  const [confirm_delete_modal, set_confirm_delete_modal] = useState(false);
  const [post_info, set_post_info] = useState({
    database: "",
    path: "",
  });

  const handle_delete = async () => {
    const path = `/${post_info.database}/${post_info.path}`;
    try {
      await set(ref(db, path), null);
      alert("Data deleted!");
      set_confirm_delete_modal(false);
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
        <div>DELETE Method</div>
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
                style={{
                  fontSize: "1.6vh",
                  padding: "0.4vh",
                  color: "var(--text-color)",
                }}
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
                style={{
                  fontSize: "1.6vh",
                  padding: "0.4vh",
                  color: "var(--text-color)",
                }}
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
      <div className="w-100 content-left" style={{ height: "5vh" }}>
        <button
          className="h-100 btn-general btn-red btn-sm"
          style={{ padding: "0 1vh", letterSpacing: "0.1vh" }}
          onClick={() => set_confirm_delete_modal(true)}
        >
          DELETE DATA
        </button>
      </div>
      {/* + MODAL */}
      {confirm_delete_modal ? (
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
                Deletion Method
              </div>
              <div
                style={{
                  height: "4.2vh",
                  width: "4.2vh",
                  marginRight: "2vh",
                }}
                className="btn-close-modal"
                onClick={() => set_confirm_delete_modal(false)}
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
                Are you sure you want to delete this?
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
                className="btn-general btn-red btn-sm"
                onClick={handle_delete}
              >
                Delete
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
                onClick={() => set_confirm_delete_modal(false)}
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

export default P5_2_DELETE_METHOD;
