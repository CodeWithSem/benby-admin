import React, { useState } from "react";
import { FiDatabase } from "react-icons/fi";
import P2_1_MCP_INDEX from "./P2_PAGES/P2_1_MCP/P2_1_MCP_INDEX";
import P2_2_OSA_INDEX from "./P2_PAGES/P2_2_OSA/P2_2_OSA_INDEX";
import P2_3_MERCH_DEPLOYMENT_INDEX from "./P2_PAGES/P2_3_MERCH_DEPLOYMENT/P2_3_MERCH_DEPLOYMENT_INDEX";
import P2_4_MD_HISTORY_INDEX from "./P2_PAGES/P2_4_MD_HISTORY/P2_4_MD_HISTORY_INDEX";
import P2_5_EXECUTION_PLANNER_INDEX from "./P2_PAGES/P2_5_EXECUTION_PLANNER/P2_5_EXECUTION_PLANNER_INDEX";
import P2_6_EP_HISTORY_INDEX from "./P2_PAGES/P2_6_EP_HISTORY/P2_6_EP_HISTORY_INDEX";
import P2_7_MCL_INDEX from "./P2_PAGES/P2_7_MCL/P2_7_MCL_INDEX";
import P2_8_STORE_MASTER_INDEX from "./P2_PAGES/P2_8_STORE_MASTER/P2_8_STORE_MASTER_INDEX";
import P2_9_TDS_DATABASE_INDEX from "./P2_PAGES/P2_9_TDS_DATABASE/P2_9_TDS_DATABASE_INDEX";
import P2_10_TDS_TAGGING_DATA_INDEX from "./P2_PAGES/P2_10_TDS_TAGGING_DATA/P2_10_TDS_TAGGING_DATA_INDEX";
import P2_11_TDS_TAGGING_CHAIN_INDEX from "./P2_PAGES/P2_11_TDS_TAGGING_CHAIN/P2_11_TDS_TAGGING_CHAIN_INDEX";
import P2_12_OSA_EXPORT_INDEX from "./P2_PAGES/P2_12_OSA_EXPORT/P2_12_OSA_EXPORT_INDEX";

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
              <div
                className="admin-card content-center"
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
              <div
                className="admin-card content-center"
                onClick={() => set_page_display("MD History")}
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
                  MD History
                </div>
              </div>
              {/* - MD HISTORY */}
              {/* + EXECUTION PLANNER */}
              <div
                className="admin-card content-center"
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
              <div
                className="admin-card content-center"
                onClick={() => set_page_display("EP History")}
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
                  EP History
                </div>
              </div>
              {/* - EP HISTORY */}
              {/* + MCL */}
              <div
                className="admin-card content-center"
                onClick={() => set_page_display("MCL")}
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
                  MCL (Products)
                </div>
              </div>
              {/* - MCL */}
              {/* + STORE MASTER */}
              <div
                className="admin-card content-center"
                onClick={() => set_page_display("Store Master")}
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
                  Store Master
                </div>
              </div>
              {/* - STORE MASTER */}
              {/* + TDS DATABASE */}
              <div
                className="admin-card content-center"
                onClick={() => set_page_display("TDS Database")}
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
                  TDS Database
                </div>
              </div>
              {/* - TDS DATABASE */}
              {/* + TDS TAGGING (DATA) */}
              <div
                className="admin-card content-center"
                onClick={() => set_page_display("TDS Tagging")}
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
                  TDS Tagging (Data)
                </div>
              </div>
              {/* + TDS TAGGING (DATA) */}
              {/* + TDS TAGGING (CHAIN) */}
              <div
                className="admin-card content-center"
                onClick={() => set_page_display("Chain Tagging")}
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
                  TDS Tagging (Chain)
                </div>
              </div>
              {/* - TDS TAGGING (CHAIN) */}
              {/* + OSA EXPORT */}
              <div
                className="admin-card content-center"
                onClick={() => set_page_display("OSA Export")}
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
                  OSA Export
                </div>
              </div>
              {/* - OSA EXPORT */}
            </div>
          </React.Fragment>
        ) : null}
        {page_display === "MCP" ? (
          <P2_1_MCP_INDEX set_page_display={set_page_display} />
        ) : null}
        {page_display === "OSA" ? (
          <P2_2_OSA_INDEX set_page_display={set_page_display} />
        ) : null}
        {page_display === "Merch Deployment" ? (
          <P2_3_MERCH_DEPLOYMENT_INDEX set_page_display={set_page_display} />
        ) : null}
        {page_display === "MD History" ? (
          <P2_4_MD_HISTORY_INDEX set_page_display={set_page_display} />
        ) : null}
        {page_display === "Execution Planner" ? (
          <P2_5_EXECUTION_PLANNER_INDEX set_page_display={set_page_display} />
        ) : null}
        {page_display === "EP History" ? (
          <P2_6_EP_HISTORY_INDEX set_page_display={set_page_display} />
        ) : null}
        {page_display === "MCL" ? (
          <P2_7_MCL_INDEX set_page_display={set_page_display} />
        ) : null}
        {page_display === "Store Master" ? (
          <P2_8_STORE_MASTER_INDEX set_page_display={set_page_display} />
        ) : null}
        {page_display === "TDS Database" ? (
          <P2_9_TDS_DATABASE_INDEX set_page_display={set_page_display} />
        ) : null}
        {page_display === "TDS Tagging" ? (
          <P2_10_TDS_TAGGING_DATA_INDEX set_page_display={set_page_display} />
        ) : null}
        {page_display === "Chain Tagging" ? (
          <P2_11_TDS_TAGGING_CHAIN_INDEX set_page_display={set_page_display} />
        ) : null}
        {page_display === "OSA Export" ? (
          <P2_12_OSA_EXPORT_INDEX set_page_display={set_page_display} />
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default P2_CLOUD_MANAGEMENT_INDEX;
