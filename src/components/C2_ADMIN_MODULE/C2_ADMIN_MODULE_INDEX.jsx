import React, { useEffect, useState } from "react";
import C2_1_SIDEBAR_INDEX from "./C2_1_SIDEBAR/C2_1_SIDEBAR_INDEX";
import P2_CLOUD_MANAGEMENT_INDEX from "./C2_2_PAGES/P2_CLOUD_MANAGEMENT/P2_CLOUD_MANAGEMENT_INDEX";
import P3_SYNC_DATABASE from "./C2_2_PAGES/P3_SYNC_DATABASE/P3_SYNC_DATABASE";
import P5_MAINTENANCE_INDEX from "./C2_2_PAGES/P5_MAINTENANCE/P5_MAINTENANCE_INDEX";

const C2_ADMIN_MODULE_INDEX = () => {
  const [active_page_label, set_active_page_label] = useState(() => {
    return localStorage.getItem("active_page_label") || "Cloud Management";
  });

  useEffect(() => {
    localStorage.setItem("active_page_label", active_page_label);
  }, [active_page_label]);

  const RENDER_PAGE = () => {
    if (active_page_label === "Cloud Management") {
      return <P2_CLOUD_MANAGEMENT_INDEX />;
    } else if (active_page_label === "Sync Database") {
      return <P3_SYNC_DATABASE />;
    } else if (active_page_label === "Maintenance") {
      return <P5_MAINTENANCE_INDEX />;
    }
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          background: "var(--body-color)",
        }}
        className="content-center"
      >
        <div
          style={{ height: "100%", width: "34vh", padding: "2vh 0 2vh 2vh" }}
        >
          <C2_1_SIDEBAR_INDEX
            active_page_label={active_page_label}
            set_active_page_label={set_active_page_label}
          />
        </div>
        <div
          style={{ height: "100%", width: "85vw", padding: "2vh 2vh 2vh 2vh" }}
        >
          <RENDER_PAGE />
        </div>
      </div>
    </React.Fragment>
  );
};

export default C2_ADMIN_MODULE_INDEX;
