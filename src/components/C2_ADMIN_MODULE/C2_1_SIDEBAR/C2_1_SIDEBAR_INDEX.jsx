import React, { useEffect, useState } from "react";
import logo from "../../../assets/images/benby-logo.png";
import { MdOutlineAccessTime, MdOutlineCloudSync } from "react-icons/md";
import { FiDatabase } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";

const C2_1_SIDEBAR_INDEX = ({ active_page_label, set_active_page_label }) => {
  const handle_select_page = (page) => {
    set_active_page_label(page);
  };

  const [show_maintenance, set_show_maintenance] = useState(false);
  const handle_key_press = (event) => {
    if (event.altKey && event.ctrlKey && event.key === "PageUp") {
      set_show_maintenance(true);
    } else if (event.altKey && event.ctrlKey && event.key === "PageDown") {
      set_show_maintenance(false);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handle_key_press);

    return () => {
      window.removeEventListener("keydown", handle_key_press);
    };
  }, []);

  // RETURN ORIGIN
  return (
    <div className="sidebar-container">
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img
            className="h-100 w-100"
            style={{ display: "block" }}
            src={logo}
            alt=""
          />
        </div>
        <div className="sidebar-header-content">
          <div className="sidebar-header-title">BENBY MERCH APP</div>
          <div className="sidebar-header-subtitle">ADMINISTRATIVE CONTROL</div>
        </div>
      </div>

      {/* Sidebar Items */}
      <div className="sidebar-items">
        {/* + Cloud Management */}
        <div
          className={`sidebar-item ${
            active_page_label === "Cloud Management" ? "active" : ""
          }`}
          onClick={() => handle_select_page("Cloud Management")}
        >
          <div
            style={{ height: "5.4vh", width: "5.4vh" }}
            className="content-center"
          >
            <FiDatabase style={{ fontSize: "2.2vh" }} />
          </div>
          <div className="sidebar-item-text">Cloud Management</div>
        </div>
        {/* - Cloud Management */}
        {/* + Sync Database */}
        <div
          className={`sidebar-item ${
            active_page_label === "Sync Database" ? "active" : ""
          }`}
          onClick={() => handle_select_page("Sync Database")}
        >
          <div
            style={{ height: "5.4vh", width: "5.4vh" }}
            className="content-center"
          >
            <MdOutlineCloudSync style={{ fontSize: "2.2vh" }} />
          </div>
          <div className="sidebar-item-text">Sync Database</div>
        </div>
        {/* - Sync Database */}
        {/* + Scheduling */}
        <div
          className={`sidebar-item ${
            active_page_label === "Scheduling" ? "active" : ""
          }`}
          onClick={() => handle_select_page("Scheduling")}
        >
          <div
            style={{ height: "5.4vh", width: "5.4vh" }}
            className="content-center"
          >
            <MdOutlineAccessTime style={{ fontSize: "2.2vh" }} />
          </div>
          <div className="sidebar-item-text">Scheduling</div>
        </div>
        {/* - Scheduling */}
        {/* + Maintenance */}
        {show_maintenance ? (
          <React.Fragment>
            <div
              className={`sidebar-item ${
                active_page_label === "Maintenance" ? "active" : ""
              }`}
              onClick={() => handle_select_page("Maintenance")}
            >
              <div
                style={{ height: "5.4vh", width: "5.4vh" }}
                className="content-center"
              >
                <IoSettingsOutline style={{ fontSize: "2.2vh" }} />
              </div>
              <div className="sidebar-item-text">Maintenance</div>
            </div>
          </React.Fragment>
        ) : null}

        {/* - Maintenance */}
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-footer-item">
          <div className="sidebar-footer-icon">
            <FaUserCircle style={{ fontSize: "4vh" }} />
          </div>
          <div className="sidebar-footer-user-info">
            <div className="sidebar-footer-user-name">SEM J. SIANGHIO</div>
            <div className="sidebar-footer-user-role">ADMIN</div>
          </div>
          <div className="sidebar-footer-icon logout">
            <BiLogOut style={{ fontSize: "2.4vh" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default C2_1_SIDEBAR_INDEX;
