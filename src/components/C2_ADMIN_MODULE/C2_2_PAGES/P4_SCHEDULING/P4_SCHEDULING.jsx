import React, { useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import P4_1_JOB_SCHEDULING_INDEX from "./P4_PAGES/P4_1_JOB_SCHEDULING/P4_1_JOB_SCHEDULING_INDEX";
import P4_2_MANUAL_TRANSFER_INDEX from "./P4_PAGES/P4_2_MANUAL_TRANSFER/P4_2_MANUAL_TRANSFER_INDEX";
import P4_3_JOB_LOG_INDEX from "./P4_PAGES/P4_3_JOB_LOG/P4_3_JOB_LOG_INDEX";

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
            onClick={() => set_page_display("Job Scheduling")}
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
            onClick={() => set_page_display("Manual Transfer")}
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
          {/* + JOB LOG */}
          <div
            className="admin-card content-center"
            onClick={() => set_page_display("Job Log")}
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
              Job Log
            </div>
          </div>
          {/* - JOB LOG */}
        </div>
        {page_display === "Job Scheduling" ? (
          <P4_1_JOB_SCHEDULING_INDEX set_page_display={set_page_display} />
        ) : null}
        {page_display === "Manual Transfer" ? (
          <P4_2_MANUAL_TRANSFER_INDEX set_page_display={set_page_display} />
        ) : null}
        {page_display === "Job Log" ? (
          <P4_3_JOB_LOG_INDEX set_page_display={set_page_display} />
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default P4_SCHEDULING;
