import React, { useEffect, useState } from "react";
import C2_ADMIN_MODULE_INDEX from "../C2_ADMIN_MODULE/C2_ADMIN_MODULE_INDEX";
import "../../assets/style/general-style.css";
import "../../assets/style/sidebar-style.css";
import "../../assets/style/font-style.css";
import "../../assets/style/admin-style.css";
import "../../assets/style/pagination-style.css";

const C0_NAVIGATION_INDEX = () => {
  // + PAGE SWITCH BUTTON
  const [page_display, set_page_display] = useState(() => {
    return localStorage.getItem("page_display") || "admin";
  });

  useEffect(() => {
    localStorage.setItem("page_display", page_display);
  }, [page_display]);

  const handle_key_press = (event) => {
    if (event.altKey && event.key === "1") {
      set_page_display("login");
    } else if (event.altKey && event.key === "2") {
      set_page_display("display");
    } else if (event.altKey && event.key === "3") {
      set_page_display("admin");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handle_key_press);
    return () => {
      window.removeEventListener("keydown", handle_key_press);
    };
  }, []);
  // - PAGE SWITCH BUTTON

  const RENDER_ADMIN_PAGE = () => {
    return <C2_ADMIN_MODULE_INDEX />;
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {page_display === "admin" ? <RENDER_ADMIN_PAGE /> : null}
    </React.Fragment>
  );
};

export default C0_NAVIGATION_INDEX;
