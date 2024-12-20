import React from "react";
import { MdOutlineCloudSync } from "react-icons/md";

const P3_SYNC_DATABASE = () => {
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
              <MdOutlineCloudSync style={{ fontSize: "2vh", color: "#FFF" }} />
            </div>
            <div
              style={{
                fontSize: "1.8vh",
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
              <MdOutlineCloudSync style={{ fontSize: "2vh", color: "#FFF" }} />
            </div>
            <div
              style={{
                fontSize: "1.8vh",
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
              <MdOutlineCloudSync style={{ fontSize: "2vh", color: "#FFF" }} />
            </div>
            <div
              style={{
                fontSize: "1.8vh",
                letterSpacing: "0.1vh",
                color: "var(--text-color)",
              }}
            >
              Merch Deployment
            </div>
          </div>
          {/* - MERCH DEPLOYMENT */}
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
              <MdOutlineCloudSync style={{ fontSize: "2vh", color: "#FFF" }} />
            </div>
            <div
              style={{
                fontSize: "1.8vh",
                letterSpacing: "0.1vh",
                color: "var(--text-color)",
              }}
            >
              Execution Planner
            </div>
          </div>
          {/* - EXECUTION PLANNER */}
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
              <MdOutlineCloudSync style={{ fontSize: "2vh", color: "#FFF" }} />
            </div>
            <div
              style={{
                fontSize: "1.8vh",
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
              <MdOutlineCloudSync style={{ fontSize: "2vh", color: "#FFF" }} />
            </div>
            <div
              style={{
                fontSize: "1.8vh",
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
              <MdOutlineCloudSync style={{ fontSize: "2vh", color: "#FFF" }} />
            </div>
            <div
              style={{
                fontSize: "1.8vh",
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
              <MdOutlineCloudSync style={{ fontSize: "2vh", color: "#FFF" }} />
            </div>
            <div
              style={{
                fontSize: "1.8vh",
                letterSpacing: "0.1vh",
                color: "var(--text-color)",
              }}
            >
              TDS Tagging
            </div>
          </div>
          {/* - TDS TAGGING */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default P3_SYNC_DATABASE;
