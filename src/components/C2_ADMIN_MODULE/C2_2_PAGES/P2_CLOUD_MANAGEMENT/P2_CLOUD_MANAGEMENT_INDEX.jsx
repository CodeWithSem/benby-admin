import React, { useState } from "react";
import { FiDatabase } from "react-icons/fi";
import P2_1_MCP_INDEX from "./P2_PAGES/P2_1_MCP/P2_1_MCP_INDEX";

const P2_CLOUD_MANAGEMENT_INDEX = () => {
  const [page_display, set_page_display] = useState("");
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="h-100">
        {page_display === "" ? (
          <React.Fragment>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "2vh",
              }}
            >
              {/* + MCP */}
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
                  <FiDatabase style={{ fontSize: "2vh", color: "#FFF" }} />
                </div>
                <div
                  style={{
                    fontSize: "1.6vh",
                    letterSpacing: "0.1vh",
                    color: "var(--text-color)",
                  }}
                >
                  MCP
                </div>
              </div>
              {/* - MCP */}
              {/* + OSA */}
              <div className="admin-card content-center">
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
                  <FiDatabase style={{ fontSize: "2vh", color: "#FFF" }} />
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
              <div className="admin-card content-center">
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
                  <FiDatabase style={{ fontSize: "2vh", color: "#FFF" }} />
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
              {/* + MD HISTORY */}
              <div className="admin-card content-center">
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
                  <FiDatabase style={{ fontSize: "2vh", color: "#FFF" }} />
                </div>
                <div
                  style={{
                    fontSize: "1.6vh",
                    letterSpacing: "0.1vh",
                    color: "var(--text-color)",
                  }}
                >
                  MD History
                </div>
              </div>
              {/* - MD HISTORY */}
              {/* + EXECUTION PLANNER */}
              <div className="admin-card content-center">
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
                  <FiDatabase style={{ fontSize: "2vh", color: "#FFF" }} />
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
              {/* + EP HISTORY */}
              <div className="admin-card content-center">
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
                  <FiDatabase style={{ fontSize: "2vh", color: "#FFF" }} />
                </div>
                <div
                  style={{
                    fontSize: "1.6vh",
                    letterSpacing: "0.1vh",
                    color: "var(--text-color)",
                  }}
                >
                  EP History
                </div>
              </div>
              {/* - EP HISTORY */}
              {/* + DIVERSION */}
              <div className="admin-card content-center">
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
                  <FiDatabase style={{ fontSize: "2vh", color: "#FFF" }} />
                </div>
                <div
                  style={{
                    fontSize: "1.6vh",
                    letterSpacing: "0.1vh",
                    color: "var(--text-color)",
                  }}
                >
                  Diversion
                </div>
              </div>
              {/* - DIVERSION */}
              {/* + MCL */}
              <div className="admin-card content-center">
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
                  <FiDatabase style={{ fontSize: "2vh", color: "#FFF" }} />
                </div>
                <div
                  style={{
                    fontSize: "1.6vh",
                    letterSpacing: "0.1vh",
                    color: "var(--text-color)",
                  }}
                >
                  MCL (Products)
                </div>
              </div>
              {/* - MCL */}
              {/* + STORE MASTER */}
              <div className="admin-card content-center">
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
                  <FiDatabase style={{ fontSize: "2vh", color: "#FFF" }} />
                </div>
                <div
                  style={{
                    fontSize: "1.6vh",
                    letterSpacing: "0.1vh",
                    color: "var(--text-color)",
                  }}
                >
                  Store Master
                </div>
              </div>
              {/* - STORE MASTER */}
              {/* + TDS DATABASE */}
              <div className="admin-card content-center">
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
                  <FiDatabase style={{ fontSize: "2vh", color: "#FFF" }} />
                </div>
                <div
                  style={{
                    fontSize: "1.6vh",
                    letterSpacing: "0.1vh",
                    color: "var(--text-color)",
                  }}
                >
                  TDS Database
                </div>
              </div>
              {/* - TDS DATABASE */}
              {/* + TDS TAGGING */}
              <div className="admin-card content-center">
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
                  <FiDatabase style={{ fontSize: "2vh", color: "#FFF" }} />
                </div>
                <div
                  style={{
                    fontSize: "1.6vh",
                    letterSpacing: "0.1vh",
                    color: "var(--text-color)",
                  }}
                >
                  TDS Tagging
                </div>
              </div>
              {/* - TDS TAGGING */}
            </div>
          </React.Fragment>
        ) : null}
        {page_display === "MCP" ? (
          <P2_1_MCP_INDEX set_page_display={set_page_display} />
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default P2_CLOUD_MANAGEMENT_INDEX;
