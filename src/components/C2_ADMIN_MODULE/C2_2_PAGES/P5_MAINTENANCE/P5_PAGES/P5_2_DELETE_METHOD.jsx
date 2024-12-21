import React, { useState } from "react";
import { db } from "../../../../../assets/scripts/firebase";
import { set, ref } from "firebase/database";
import { FaAnglesRight } from "react-icons/fa6";

const P5_2_DELETE_METHOD = ({ set_page_display }) => {
  const [post_info, set_post_info] = useState({
    database: "",
    path: "",
  });

  const handle_delete = async () => {
    const path = `/${post_info.database}/${post_info.path}`;
    try {
      await set(ref(db, path), null);
      alert("Data successfully deleted!");
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
            GO BACK
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
          onClick={handle_delete}
        >
          DELETE DATA
        </button>
      </div>
    </React.Fragment>
  );
};

export default P5_2_DELETE_METHOD;
