import React, { useState } from "react";
import { db } from "../../../../../../assets/scripts/firebase";
import { get, ref } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import * as XLSX from "xlsx"; // Import xlsx

const P2_12_OSA_EXPORT_INDEX = ({ set_page_display }) => {
  const [is_loading, set_is_loading] = useState(false);
  const BATCH_SIZE = 200000; // Max rows per Excel file
  const DELAY_TIME = 1000; // Delay time between batches (in ms)

  const get_osa_raw_data = async () => {
    try {
      set_is_loading(true);
      const response = await get(
        ref(db, `/DB1_BENBY_MERCH_APP/TBL_OSA_1/DATA`)
      );
      const data = response.val();
      let osa_data = [];

      if (data) {
        const storeCodes = Object.keys(data);

        // Loop through data and process in batches
        for (let i = 0; i < storeCodes.length; i++) {
          const store_code = storeCodes[i];
          const store_data = data[store_code];
          if (store_data) {
            const tdsCodes = Object.keys(store_data);
            for (let j = 0; j < tdsCodes.length; j++) {
              const tds_code = tdsCodes[j];
              const tds_data = store_data[tds_code];
              if (tds_data) {
                const matcodes = Object.keys(tds_data);
                for (let k = 0; k < matcodes.length; k++) {
                  const matcode = matcodes[k];
                  const matcode_data = tds_data[matcode];
                  if (matcode_data) {
                    const data = {
                      a0_ID: uuidv4(),
                      a1_Matcode: matcode_data.a1_Matcode,
                      a2_Storecode: store_code,
                      a3_ActionID: matcode_data.a3_ActionID,
                      a4_SubActionID: matcode_data.a4_SubActionID,
                      a5_Dateupdated: matcode_data.a5_Dateupdated,
                      a6_UpdatedBy: matcode_data.a6_UpdatedBy,
                      a7_Pcs: matcode_data.a7_Pcs,
                      a8_Cases: matcode_data.a8_Cases,
                      a9_InnerBox: matcode_data.a9_InnerBox,
                      b1_ExpiryDate: matcode_data.b1_ExpiryDate,
                      b2_Remarks: matcode_data.b2_Remarks,
                      b3_ExpiryDates: matcode_data.b3_ExpiryDates,
                    };
                    osa_data.push(data);
                  }
                }
              }
            }
          }
        }
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
      {/* <div className="admin-page-container">
        {is_loading ? <div>Fetching OSA Data...</div> : null}
        <button onClick={get_osa_raw_data}>Get OSA Data</button>
        <button onClick={() => set_page_display("")}>go back</button>
      </div> */}

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
          <button style={{ height: "10vh" }} onClick={get_osa_raw_data}>
            Get OSA Data
          </button>
          {/* {osa_raw_data.length !== 0 ? (
            <button
              style={{ height: "10vh" }}
              //  onClick={() => set_page_display("")}
            >
              Export as Excel
            </button>
          ) : null} */}
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

export default P2_12_OSA_EXPORT_INDEX;
