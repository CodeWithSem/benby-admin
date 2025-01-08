import React, { useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";

const P4_1_JOB_SCHEDULING_INDEX = () => {
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
          {/* + JOB SCHEDULE */}
          <div
            className="admin-sched-card"
            // onClick={() => set_page_display("MCP")}
          >
            <div
              className="content-center"
              style={{
                position: "absolute",
                top: "1vh",
                left: "1vh",
                height: "4vh",
                gap: "1vh",
              }}
            >
              <div
                style={{
                  height: "4vh",
                  width: "4vh",
                  background: "var(--primary-color)",
                  borderRadius: "0.4vh",
                }}
                className="content-center"
              >
                <MdOutlineAccessTime
                  style={{ fontSize: "2vh", color: "#FFF" }}
                />
              </div>
              <div style={{ fontSize: "1.6vh", color: "var(--primary-color)" }}>
                Job Schedule
              </div>
            </div>
            <div
              className="w-100 content-center"
              style={{
                height: "3vh",
                marginTop: "7vh",
                gap: "1vh",
                padding: "0 2vh",
                fontSize: "1.4vh",
              }}
            >
              <div style={{ width: "50%" }}>Start Time</div>
              <div style={{ width: "50%" }}>End Time </div>
            </div>
            <div
              className="w-100 content-center"
              style={{
                height: "vh",
                gap: "1vh",
                padding: "0 2vh",
                fontSize: "1.4vh",
              }}
            >
              <div style={{ width: "50%", height: "100%" }}>
                <select
                  className="select-general"
                  style={{ fontSize: "1.8vh", padding: "0 1vh" }}
                  // value={schedule_start_time}
                  // onChange={(e) =>
                  //   handle_start_time(e.target.value)
                  // }
                  // onChange={(e) => setStartTime(e.target.value)}
                  aria-label="Start time select"
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>
                      {i % 12 === 0 ? 12 : i % 12} {i < 12 ? "AM" : "PM"}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ width: "50%" }}>End Time </div>
            </div>
            {/* <div
              className="w-100 content-center border"
              style={{
                height: "7vh",
                marginTop: "7vh",
                gap: "1vh",
                padding: "0 2vh",
              }}
            >
              <div className="" style={{ width: "50%" }}>
                <div style={{ fontSize: "1.2vh" }}>Start Time</div>
                <div style={{ marginTop: "5px", height: "4vh" }}>
                  <select
                    className="select-general"
                    style={{ fontSize: "1.8vh", padding: "0 1vh" }}
                    // value={schedule_start_time}
                    // onChange={(e) =>
                    //   handle_start_time(e.target.value)
                    // }
                    // onChange={(e) => setStartTime(e.target.value)}
                    aria-label="Start time select"
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i}>
                        {i % 12 === 0 ? 12 : i % 12} {i < 12 ? "AM" : "PM"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="" style={{ width: "50%" }}>
                <div style={{ fontSize: "1.2vh" }}>End Time</div>
                <div style={{ marginTop: "5px", height: "4vh" }}>
                  <select
                    className="select-general"
                    style={{ fontSize: "1.8vh", padding: "0 1vh" }}
                    // value={schedule_end_time}
                    // onChange={(e) => handle_end_time(e.target.value)}
                    aria-label="End time select"
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i}>
                        {i % 12 === 0 ? 12 : i % 12} {i < 12 ? "AM" : "PM"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div> */}
          </div>
          {/* - JOB SCHEDULE */}
          {/* + OSA */}
          <div
            className="admin-sched-card content-center"
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
              OSA
            </div>
          </div>
          {/* - OSA */}
          {/* + MERCH DEPLOYMENT */}
          <div
            className="admin-sched-card content-center"
            onClick={() => set_page_display("Merch Deployment")}
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
              Merch Deployment
            </div>
          </div>
          {/* - MERCH DEPLOYMENT */}
          {/* + EXECUTION PLANNER */}
          <div
            className="admin-sched-card content-center"
            onClick={() => set_page_display("Execution Planner")}
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
              Execution Planner
            </div>
          </div>
          {/* - EXECUTION PLANNER */}
        </div>
        {/* {page_display === "MCP" ? (
          <P3_1_MCP_INDEX set_page_display={set_page_display} />
        ) : null} */}
      </div>
    </React.Fragment>
  );
};

export default P4_1_JOB_SCHEDULING_INDEX;
