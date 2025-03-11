import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { MdClose } from "react-icons/md";
import { db } from "../../../../../../../assets/scripts/firebase";
import { set, update, get, ref } from "firebase/database";

const M1_ADD_BRAND = ({ set_display_modal, set_refresh_sku_brand_list }) => {
  const [new_brand_data, set_new_brand_data] = useState({
    a1_ID: 0,
    b1_DESC: "",
    c1_CAT: "",
  });
  const [delete_loading, set_delete_loading] = useState(false);

  // const handle_filter_delete = (selected_filter, filter_value) => {
  //   if (selected_filter === "Delete All") {
  //     delete_all();
  //   } else if (selected_filter === "Store Code") {
  //     delete_by_store_code(filter_value);
  //   }
  // };

  const get_sku_brand_count = async () => {
    try {
      const response = await get(
        ref(db, `/DB1_BENBY_MERCH_APP/TBL_MAINTAINABLE/SKU_BRAND_COUNT/COUNT`)
      );
      const data = response.val();
      set_new_brand_data({ ...new_brand_data, a1_ID: data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_sku_brand_count();
  }, []);

  const add_sku_brand = async (sku_brand_data) => {
    try {
      await set(
        ref(
          db,
          `/DB1_BENBY_MERCH_APP/TBL_MAINTAINABLE/SKU_BRAND/${sku_brand_data.a1_ID}`
        ),
        sku_brand_data
      ).then(() => {
        increment_sku_brand_count(sku_brand_data.a1_ID);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const increment_sku_brand_count = async (id) => {
    try {
      await update(
        ref(db, `/DB1_BENBY_MERCH_APP/TBL_MAINTAINABLE/SKU_BRAND_COUNT`),
        {
          COUNT: id + 1,
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      alert("Added Successfully!");
      set_refresh_sku_brand_list((prev) => !prev);
      set_display_modal("");
    }
  };
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div class={`modal-overlay`}></div>
      <div
        class={`modal`}
        style={{
          width: "65vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* + MODAL HEADER */}
        <div
          style={{
            width: "100%",
            height: "6vh",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "0.1vh solid var(--border-color-light)",
            paddingTop: "0.3vh",
          }}
        >
          <div
            style={{
              fontSize: "1.8vh",
              color: "var(--text-color)",
              marginLeft: "2vh",
              letterSpacing: "0.1vh",
            }}
          >
            Add New Brand
          </div>
          <div
            style={{
              height: "4.2vh",
              width: "4.2vh",
              marginRight: "2vh",
            }}
            className="btn-close-modal"
            onClick={() => set_display_modal("")}
          >
            <MdClose
              style={{
                color: "var(--text-color)",
                fontSize: "2.4vh",
              }}
            />
          </div>
        </div>
        {/* - MODAL HEADER */}
        {/* + MODAL CONTENT */}
        <div
          style={{
            width: "100%",
            height: "100%",
            padding: "3vh",
            fontSize: "1.6vh",
            color: "var(--text-color)",
            display: "flex",
            flexDirection: "column",
            gap: "2vh",
          }}
        >
          <div className="content-center w-100">
            <div className="content-left" style={{ width: "10vh" }}>
              ID
            </div>
            <div className="content-center" style={{ width: "4vh" }}>
              :
            </div>
            <div style={{ flex: "1", height: "4vh" }}>
              <input
                type="text"
                value={new_brand_data.a1_ID}
                className="input-general"
                style={{ padding: "0 1vh" }}
                disabled
              />
            </div>
          </div>
          <div className="content-center w-100">
            <div className="content-left" style={{ width: "10vh" }}>
              Brand
            </div>
            <div className="content-center" style={{ width: "4vh" }}>
              :
            </div>
            <div style={{ flex: "1", height: "4vh" }}>
              <input
                type="text"
                value={new_brand_data.b1_DESC}
                className="input-general"
                style={{ padding: "0 1vh" }}
                onChange={(e) => {
                  const value = e.target.value;
                  set_new_brand_data({
                    ...new_brand_data,
                    b1_DESC: value.toUpperCase(),
                  });
                }}
              />
            </div>
          </div>
          <div className="content-center w-100">
            <div className="content-left" style={{ width: "10vh" }}>
              Category
            </div>
            <div className="content-center" style={{ width: "4vh" }}>
              :
            </div>
            <div style={{ flex: "1", height: "4vh" }}>
              <input
                type="text"
                value={new_brand_data.c1_CAT}
                className="input-general"
                style={{ padding: "0 1vh" }}
                onChange={(e) => {
                  const value = e.target.value;
                  set_new_brand_data({
                    ...new_brand_data,
                    c1_CAT: value.toUpperCase(),
                  });
                }}
              />
            </div>
          </div>
        </div>
        {/* - MODAL CONTENT */}
        {/* + MODAL BUTTONS */}
        <div
          style={{
            width: "100%",
            height: "6vh",
            borderTop: "0.1vh solid var(--border-color-light)",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "1vh",
            gap: "1vh",
          }}
        >
          <button
            style={{
              height: "100%",
              width: "14vh",
              padding: "0 2vh",
              borderRadius: "0.5vh",
              fontSize: "1.6vh",
              letterSpacing: "0.1vh",
            }}
            className="btn-general btn-green btn-sm content-center"
            onClick={() => add_sku_brand(new_brand_data)}
            disabled={delete_loading ? true : false}
          >
            {delete_loading ? (
              <Oval
                visible={true}
                height="2.4vh"
                width="2.4vh"
                strokeWidth={8}
                color="#fff"
                secondaryColor="var(--border-color-light)"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              "Add Brand"
            )}
          </button>
          <button
            style={{
              height: "100%",
              padding: "0 2vh",
              borderRadius: "0.5vh",
              fontSize: "1.6vh",
              letterSpacing: "0.1vh",
            }}
            className="btn-general btn-gray btn-sm"
            onClick={() => set_display_modal("")}
          >
            Close
          </button>
        </div>
        {/* - MODAL BUTTONS */}
      </div>
    </React.Fragment>
  );
};

export default M1_ADD_BRAND;
