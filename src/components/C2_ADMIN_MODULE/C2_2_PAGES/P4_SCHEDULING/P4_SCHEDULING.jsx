import React, { useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";

const P4_SCHEDULING = () => {
  const [page_display, set_page_display] = useState("");
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="h-100 w-100">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2vh",
          }}
        >
          {/* + JOB SCHEDULING */}
          <div
            className="admin-card content-center"
            onClick={() => set_page_display("MCP")}
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
              <MdOutlineAccessTime style={{ fontSize: "2vh", color: "#FFF" }} />
            </div>
            <div
              style={{
                fontSize: "1.6vh",
                letterSpacing: "0.1vh",
                color: "var(--text-color)",
              }}
            >
              Job Scheduling
            </div>
          </div>
          {/* - JOB SCHEDULING */}
          {/* + MANUAL TRANSFER */}
          <div
            className="admin-card content-center"
            onClick={() => set_page_display("OSA")}
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
              <MdOutlineAccessTime style={{ fontSize: "2vh", color: "#FFF" }} />
            </div>
            <div
              style={{
                fontSize: "1.6vh",
                letterSpacing: "0.1vh",
                color: "var(--text-color)",
              }}
            >
              Manual Transfer
            </div>
          </div>
          {/* - MANUAL TRANSFER */}
        </div>
        {/* {page_display === "MCP" ? (
          <P3_1_MCP_INDEX set_page_display={set_page_display} />
        ) : null} */}
      </div>
    </React.Fragment>
  );
};

export default P4_SCHEDULING;
