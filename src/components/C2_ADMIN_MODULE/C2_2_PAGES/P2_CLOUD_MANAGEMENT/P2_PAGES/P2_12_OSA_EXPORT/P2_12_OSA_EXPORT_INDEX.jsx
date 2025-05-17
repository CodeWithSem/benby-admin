import React, { useState } from "react";
import { db } from "../../../../../../assets/scripts/firebase";
import { get, ref } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import * as XLSX from "xlsx"; // Import xlsx

const P2_12_OSA_EXPORT_INDEX = ({ set_page_display }) => {
  const [is_loading, set_is_loading] = useState(false);
  const BATCH_SIZE = 200000; // Max rows per Excel file
  const DELAY_TIME = 1000; // Delay time between batches (in ms)

  // const get_osa_raw_data = async () => {
  //   try {
  //     set_is_loading(true);
  //     const response = await get(
  //       ref(db, `/DB1_BENBY_MERCH_APP/TBL_OSA_1/DATA`)
  //     );
  //     const data = response.val();
  //     let osa_data = [];

  //     if (data) {
  //       const storeCodes = Object.keys(data);

  //       // Loop through data and process in batches
  //       for (let i = 0; i < storeCodes.length; i++) {
  //         const store_code = storeCodes[i];
  //         const store_data = data[store_code];
  //         if (store_data) {
  //           const tdsCodes = Object.keys(store_data);
  //           for (let j = 0; j < tdsCodes.length; j++) {
  //             const tds_code = tdsCodes[j];
  //             const tds_data = store_data[tds_code];
  //             if (tds_data) {
  //               const matcodes = Object.keys(tds_data);
  //               for (let k = 0; k < matcodes.length; k++) {
  //                 const matcode = matcodes[k];
  //                 const matcode_data = tds_data[matcode];
  //                 if (matcode_data) {
  //                   const data = {
  //                     a0_ID: uuidv4(),
  //                     a1_Matcode: matcode_data.a1_Matcode,
  //                     a2_Storecode: store_code,
  //                     a3_ActionID: matcode_data.a3_ActionID,
  //                     a4_SubActionID: matcode_data.a4_SubActionID,
  //                     a5_Dateupdated: matcode_data.a5_Dateupdated,
  //                     a6_UpdatedBy: matcode_data.a6_UpdatedBy,
  //                     a7_Pcs: matcode_data.a7_Pcs,
  //                     a8_Cases: matcode_data.a8_Cases,
  //                     a9_InnerBox: matcode_data.a9_InnerBox,
  //                     b1_ExpiryDate: matcode_data.b1_ExpiryDate,
  //                     b2_Remarks: matcode_data.b2_Remarks,
  //                     b3_ExpiryDates: matcode_data.b3_ExpiryDates,
  //                   };
  //                   osa_data.push(data);
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }

  //     // Split the data into batches of 200,000 rows
  //     const chunks = [];
  //     for (let i = 0; i < osa_data.length; i += BATCH_SIZE) {
  //       chunks.push(osa_data.slice(i, i + BATCH_SIZE));
  //     }

  //     // Generate Excel files for each batch
  //     chunks.forEach((chunk, index) => {
  //       const worksheet = XLSX.utils.json_to_sheet(chunk);
  //       const workbook = XLSX.utils.book_new();
  //       XLSX.utils.book_append_sheet(
  //         workbook,
  //         worksheet,
  //         `OSA Data Batch ${index + 1}`
  //       );

  //       // Write each batch to a separate Excel file
  //       XLSX.writeFile(workbook, `OSA_Data_Batch_${index + 1}.xlsx`);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     set_is_loading(false);
  //   }
  // };

  const storeCodes = [
    "500003",
    "500006",
    "500011",
    "500016",
    "500017",
    "500018",
    "500021",
    "500027",
    "500028",
    "500031",
    "500137",
    "500138",
    "500139",
    "500140",
    "500141",
    "500145",
    "500150",
    "500151",
    "500152",
    "500153",
    "500154",
    "500155",
    "500156",
    "500157",
    "500158",
    "500160",
  ];

  const get_osa_raw_data_store_code = async () => {
    try {
      // Fetch data from the parent node /DB1_BENBY_MERCH_APP/TBL_OSA_1/DATA
      const response = await get(
        ref(db, `/DB1_BENBY_MERCH_APP/TBL_STORE_MASTER/DATA`)
      );

      // Get the data object (keys are the store codes)
      const data = response.val();

      // If data exists, extract the store codes (keys)
      if (data) {
        // Extract store codes directly (keys of the parent data object)
        const storeCodes = Object.keys(data); // List of store codes
        console.log(storeCodes); // Log or use the store codes
        get_osa_raw_data(storeCodes);
      } else {
        console.log("No store codes found.");
      }
    } catch (error) {
      console.log(error); // Handle errors
    }
  };

  const get_osa_raw_data = async (storeCodes) => {
    try {
      set_is_loading(true);
      let osa_data = [];

      for (let i = 0; i < storeCodes.length; i += 1000) {
        // Get the current batch of store codes (up to 5)
        const currentBatch = storeCodes.slice(i, i + 1000);

        // Fetch data for each store in the current batch
        for (const store_code of currentBatch) {
          // Fetch data from the DB
          const response = await get(
            ref(db, `/DB1_BENBY_MERCH_APP/TBL_OSA_1/DATA/${store_code}`)
          );
          const data = response.val();

          if (data) {
            const storeCodes = Object.keys(data);

            // Loop through store codes (first loop)
            for (let i = 0; i < storeCodes.length; i++) {
              const store_code = storeCodes[i];
              const store_data = data[store_code];

              if (store_data) {
                // Now, directly process the matcodes inside each store (second loop)
                const matcodes = Object.keys(store_data);

                matcodes.forEach((matcode) => {
                  const matcode_data = store_data[matcode];

                  if (matcode_data) {
                    const data = {
                      // a0_ID: uuidv4(),
                      a1_Matcode: matcode_data.a1_Matcode,
                      a2_Storecode: matcode_data.a2_Storecode,
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
                });
              }
            }
          }
        }
        if (osa_data.length > 0) {
          const worksheet = XLSX.utils.json_to_sheet(osa_data);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            `OSA Data Batch ${Math.floor(i / 1000) + 1}`
          );

          // Write the current batch to a new Excel file
          XLSX.writeFile(
            workbook,
            `OSA_Data_Batch_${Math.floor(i / 1000) + 1}.xlsx`
          );

          // Clear the osa_data array for the next batch
          osa_data = [];
        }
      }

      // // Split the data into batches of 200,000 rows
      // const chunks = [];
      // for (let i = 0; i < osa_data.length; i += BATCH_SIZE) {
      //   chunks.push(osa_data.slice(i, i + BATCH_SIZE));
      // }

      // // Generate Excel files for each batch
      // chunks.forEach((chunk, index) => {
      //   const worksheet = XLSX.utils.json_to_sheet(chunk);
      //   const workbook = XLSX.utils.book_new();
      //   XLSX.utils.book_append_sheet(
      //     workbook,
      //     worksheet,
      //     `OSA Data Batch ${index + 1}`
      //   );

      //   // Write each batch to a separate Excel file
      //   XLSX.writeFile(workbook, `OSA_Data_Batch_${index + 1}.xlsx`);
      // });
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
          {/* <button style={{ height: "10vh" }} onClick={get_osa_raw_data}>
            Get OSA Data
          </button> */}
          <button
            style={{ height: "10vh" }}
            onClick={get_osa_raw_data_store_code}
          >
            Get OSA Store Code
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
