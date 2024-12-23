import React, { useState } from "react";
import P5_1_POST_METHOD from "./P5_PAGES/P5_1_POST_METHOD";
import P5_2_DELETE_METHOD from "./P5_PAGES/P5_2_DELETE_METHOD";
import { IoSettingsOutline } from "react-icons/io5";

const P5_MAINTENANCE_INDEX = () => {
  const [page_display, set_page_display] = useState("");
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="h-100 w-100">
        {page_display === "" ? (
          <React.Fragment>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "2vh",
              }}
            >
              {/* + POST Method */}
              <div
                className="admin-card content-center"
                onClick={() => set_page_display("POST Method")}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "1vh",
                    left: "1vh",
                    height: "4vh",
                    width: "4vh",
                    background: "var(--primary-color)",
                    borderRadius: "0.4vh",
                  }}
                  className="content-center"
                >
                  <IoSettingsOutline
                    style={{ fontSize: "2vh", color: "#FFF" }}
                  />
                </div>
                <div
                  style={{
                    fontSize: "1.8vh",
                    letterSpacing: "0.1vh",
                    color: "var(--text-color)",
                  }}
                >
                  POST Method
                </div>
              </div>
              {/* - POST Method */}
              {/* + DELETE Method */}
              <div
                className="admin-card content-center"
                onClick={() => set_page_display("DELETE Method")}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "1vh",
                    left: "1vh",
                    height: "4vh",
                    width: "4vh",
                    background: "var(--primary-color)",
                    borderRadius: "0.4vh",
                  }}
                  className="content-center"
                >
                  <IoSettingsOutline
                    style={{ fontSize: "2vh", color: "#FFF" }}
                  />
                </div>
                <div
                  style={{
                    fontSize: "1.8vh",
                    letterSpacing: "0.1vh",
                    color: "var(--text-color)",
                  }}
                >
                  DELETE Method
                </div>
              </div>
              {/* - DELETE Method */}
            </div>
          </React.Fragment>
        ) : null}
        {page_display === "POST Method" ? (
          <P5_1_POST_METHOD set_page_display={set_page_display} />
        ) : null}
        {page_display === "DELETE Method" ? (
          <P5_2_DELETE_METHOD set_page_display={set_page_display} />
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default P5_MAINTENANCE_INDEX;
