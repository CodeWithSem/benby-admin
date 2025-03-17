import React, { useState } from "react";
import { db } from "../../../../../../assets/scripts/firebase";
import { get, ref } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import * as XLSX from "xlsx"; // Import xlsx

const P2_12_EP_MD_EXPORT_INDEX = ({ set_page_display }) => {
  const [is_loading, set_is_loading] = useState(false);
  const [osa_raw_data, set_osa_raw_data] = useState(false);
  const BATCH_SIZE = 200000; // Max rows per Excel file
  const DELAY_TIME = 1000; // Delay time between batches (in ms)

  const get_md_raw_data = async () => {
    try {
      set_is_loading(true);
      const response = await get(
        ref(db, `/DB1_BENBY_MERCH_APP/TBL_MD_HISTORY/DATA`)
      );
      const data = response.val();
      let osa_data = [];

      if (data) {
        Object.keys(data).forEach((parentPath) => {
          const childPaths = data[parentPath];
          if (childPaths) {
            Object.keys(childPaths).forEach((childPath) => {
              const info = childPaths[childPath];
              if (info) {
                const data = {
                  ...info,
                };
                osa_data.push(data);
              }
            });
          }
        });
      }

      // Split the data into batches of 200,000 rows
      const chunks = [];
      for (let i = 0; i < osa_data.length; i += BATCH_SIZE) {
        chunks.push(osa_data.slice(i, i + BATCH_SIZE));
      }

      // Generate Excel files for each batch
      chunks.forEach((chunk, index) => {
        const worksheet = XLSX.utils.json_to_sheet(chunk);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
          workbook,
          worksheet,
          `OSA Data Batch ${index + 1}`
        );

        // Write each batch to a separate Excel file
        XLSX.writeFile(workbook, `OSA_Data_Batch_${index + 1}.xlsx`);
      });
    } catch (error) {
      console.log(error);
    } finally {
      set_is_loading(false);
    }
  };
  const get_ep_raw_data = async () => {
    try {
      set_is_loading(true);
      const response = await get(
        ref(db, `/DB1_BENBY_MERCH_APP/TBL_EP_HISTORY/DATA`)
      );
      const data = response.val();
      let osa_data = [];

      if (data) {
        Object.keys(data).forEach((parentPath) => {
          const childPaths = data[parentPath];
          if (childPaths) {
            const data = {
              ...childPaths,
            };
            osa_data.push(data);
          }
        });
      }

      // Split the data into batches of 200,000 rows
      const chunks = [];
      for (let i = 0; i < osa_data.length; i += BATCH_SIZE) {
        chunks.push(osa_data.slice(i, i + BATCH_SIZE));
      }

      // Generate Excel files for each batch
      chunks.forEach((chunk, index) => {
        const worksheet = XLSX.utils.json_to_sheet(chunk);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
          workbook,
          worksheet,
          `OSA Data Batch ${index + 1}`
        );

        // Write each batch to a separate Excel file
        XLSX.writeFile(workbook, `OSA_Data_Batch_${index + 1}.xlsx`);
      });
    } catch (error) {
      console.log(error);
    } finally {
      set_is_loading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="admin-page-container">
        {is_loading ? <div>Fetching OSA Data...</div> : null}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "20vh",
            gap: "2vh",
          }}
        >
          <button style={{ height: "10vh" }} onClick={get_md_raw_data}>
            Get MD Data
          </button>
          <button style={{ height: "10vh" }} onClick={get_ep_raw_data}>
            Get EP Data
          </button>
          {/* <button
            style={{ height: "10vh" }}
            onClick={get_md_raw_data_store_code}
          >
            Get OSA Store Code
          </button> */}
          {osa_raw_data.length !== 0 ? (
            <button
              style={{ height: "10vh" }}
              //  onClick={() => set_page_display("")}
            >
              Export as Excel
            </button>
          ) : null}
          <button
            style={{ height: "10vh" }}
            onClick={() => set_page_display("")}
          >
            Go Back
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default P2_12_EP_MD_EXPORT_INDEX;
