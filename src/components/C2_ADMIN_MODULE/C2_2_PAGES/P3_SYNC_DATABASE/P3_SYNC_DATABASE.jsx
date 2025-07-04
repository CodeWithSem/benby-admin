import React, { useState } from "react";
import { MdOutlineCloudSync } from "react-icons/md";
import P3_1_MCP_INDEX from "./P3_PAGES/P3_1_MCP/P3_1_MCP_INDEX";
import P3_2_OSA_INDEX from "./P3_PAGES/P3_2_OSA/P3_2_OSA_INDEX";
import P3_3_MERCH_DEPLOYMENT_INDEX from "./P3_PAGES/P3_3_MERCH_DEPLOYMENT/P3_3_MERCH_DEPLOYMENT_INDEX";
import P3_4_EXECUTION_PLANNER_INDEX from "./P3_PAGES/P3_4_EXECUTION_PLANNER/P3_4_EXECUTION_PLANNER_INDEX";
import P3_5_MCL_INDEX from "./P3_PAGES/P3_5_MCL/P3_5_MCL_INDEX";
import P3_6_STORE_MASTER_INDEX from "./P3_PAGES/P3_6_STORE_MASTER/P3_6_STORE_MASTER_INDEX";
import P3_7_TDS_DATABASE_INDEX from "./P3_PAGES/P3_7_TDS_DATABASE/P3_7_TDS_DATABASE_INDEX";
import P3_8_TDS_TAGGING_INDEX from "./P3_PAGES/P3_8_TDS_TAGGING/P3_8_TDS_TAGGING_INDEX";

const P3_SYNC_DATABASE = () => {
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
              <MdOutlineCloudSync style={{ fontSize: "2vh", color: "#FFF" }} />
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
          {/* + OSA Not Carried */}
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
              <MdOutlineCloudSync style={{ fontSize: "2vh", color: "#FFF" }} />
            </div>
            <div
              style={{
                fontSize: "1.6vh",
                letterSpacing: "0.1vh",
                color: "var(--text-color)",
              }}
            >
              OSA Not Carried
            </div>
          </div>
          {/* - OSA Not Carried */}
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
              <MdOutlineCloudSync style={{ fontSize: "2vh", color: "#FFF" }} />
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
              <MdOutlineCloudSync style={{ fontSize: "2vh", color: "#FFF" }} />
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
              <MdOutlineCloudSync style={{ fontSize: "2vh", color: "#FFF" }} />
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
              <MdOutlineCloudSync style={{ fontSize: "2vh", color: "#FFF" }} />
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
              <MdOutlineCloudSync style={{ fontSize: "2vh", color: "#FFF" }} />
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
              <MdOutlineCloudSync style={{ fontSize: "2vh", color: "#FFF" }} />
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
        {page_display === "MCP" ? (
          <P3_1_MCP_INDEX set_page_display={set_page_display} />
        ) : null}
        {page_display === "OSA" ? (
          <P3_2_OSA_INDEX set_page_display={set_page_display} />
        ) : null}
        {page_display === "Merch Deployment" ? (
          <P3_3_MERCH_DEPLOYMENT_INDEX set_page_display={set_page_display} />
        ) : null}
        {page_display === "Execution Planner" ? (
          <P3_4_EXECUTION_PLANNER_INDEX set_page_display={set_page_display} />
        ) : null}
        {page_display === "MCL" ? (
          <P3_5_MCL_INDEX set_page_display={set_page_display} />
        ) : null}
        {page_display === "Store Master" ? (
          <P3_6_STORE_MASTER_INDEX set_page_display={set_page_display} />
        ) : null}
        {page_display === "TDS Database" ? (
          <P3_7_TDS_DATABASE_INDEX set_page_display={set_page_display} />
        ) : null}
        {page_display === "TDS Tagging" ? (
          <P3_8_TDS_TAGGING_INDEX set_page_display={set_page_display} />
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default P3_SYNC_DATABASE;
