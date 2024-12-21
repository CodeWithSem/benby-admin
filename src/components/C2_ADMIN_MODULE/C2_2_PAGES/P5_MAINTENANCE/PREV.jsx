import React, { useState } from "react";
import { db } from "../../../../assets/scripts/firebase";
import { set, ref, update } from "firebase/database";
import { MdOutlineCloudSync } from "react-icons/md";

const P5_MAINTENANCE_INDEX = () => {
  const [inputData, setInputData] = useState(""); // State to store raw input
  const [rows, setRows] = useState([{ column1: "", column2: "" }]); // State to store the structured data

  // Function to convert multi-line text into structured rows
  const handleConvertToRows = () => {
    const lines = inputData.split("\n"); // Split the input by new lines

    const formattedRows = lines.map((line) => {
      const [column1, column2] = line.split(":").map((str) => str.trim()); // Split each line by colon and trim spaces
      return { column1: column1 || "", column2: column2 || "" }; // Return row object
    });

    setRows(formattedRows); // Update the rows state with the formatted data
  };
  const [post_info, set_post_info] = useState({
    database: "",
    path: "",
    data: "", // This will hold the raw input data (as a string)
  });

  const convert_to_table = (data) => {
    // Attempt to parse the string into an object
    let json;
    try {
      json = JSON.parse(data); // Parse the user input as JSON
    } catch (error) {
      alert("Invalid JSON. Please enter a valid object.");
      return; // Exit the function if parsing fails
    }
    setRows(json);
  };

  const handle_add = async () => {
    // Attempt to parse the string into an object
    // let data;
    // try {
    //   data = JSON.parse(post_info.data); // Parse the user input as JSON
    // } catch (error) {
    //   alert("Invalid JSON. Please enter a valid object.");
    //   return; // Exit the function if parsing fails
    // }

    // Construct the path to store data in Firebase
    const path = `/${post_info.database}/${post_info.path}`;

    try {
      // Store the parsed object in Firebase Realtime Database
      await set(ref(db, path), getJsonObject());
      alert("Data successfully stored!");
    } catch (error) {
      alert("Error storing data: " + error.message);
    }
  };

  const handle_update = async () => {
    const data = {
      a2_DESC: "123",
    };
    try {
      const path = `/DB2_BENBY_MERCH_APP/TBL_MCP/DATA/1`;
      await update(ref(db, path), data);
    } catch (error) {
      alert(error);
    } finally {
      alert("success");
    }
  };

  const handle_delete = async () => {
    try {
      const path = `/DB2_BENBY_MERCH_APP/TBL_STORE_TIMELOGS`;
      await set(ref(db, path), null);
    } catch (error) {
      alert(error);
    } finally {
      alert("success");
    }
  };

  // + JSON TABLE
  // State to manage the rows in the table

  // Function to add a new row
  const addRow = () => {
    setRows([...rows, { column1: "", column2: "" }]);
  };

  // Function to remove a row
  const removeRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  // Function to handle changes in the input fields
  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  // Convert the table rows into a JSON object
  const getJsonObject = () => {
    const jsonObj = {};
    rows.forEach((row) => {
      if (row.column1 && row.column2) {
        jsonObj[row.column1] = row.column2;
      }
    });
    return jsonObj;
  };
  // - JSON TABLE
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
          {/* + POST METHOD */}
          <div
            className="admin-card content-center"
            style={{
              flexDirection: "column",
              gap: "1vh",
              height: "auto",
              padding: "1vh",
            }}
          >
            <div className="content-center" style={{ gap: "1vh" }}>
              <span style={{ width: "10vh" }}>DATABASE :</span>
              <input
                type="text"
                value={post_info.database}
                style={{ width: "20vh" }}
                onChange={(e) => {
                  const data = e.target.value;
                  set_post_info({
                    ...post_info,
                    database: data.toString(),
                  });
                }}
              />
            </div>
            <div className="content-center" style={{ gap: "1vh" }}>
              <span style={{ width: "10vh" }}>PATH :</span>
              <input
                type="text"
                value={post_info.path}
                style={{ width: "20vh" }}
                onChange={(e) => {
                  const data = e.target.value;
                  set_post_info({
                    ...post_info,
                    path: data.toString(),
                  });
                }}
              />
            </div>
            {/* Multi-line input for typing data */}
            <div className="content-center" style={{ gap: "1vh" }}>
              <span style={{ width: "10vh" }}>DATA :</span>
              <textarea
                value={inputData}
                onChange={(e) => setInputData(e.target.value)} // Update raw input data
                rows="5"
                cols="30"
                placeholder="Enter data as 'column1: column2' per line"
                style={{ width: "100%", marginBottom: "10px" }}
              />
            </div>
            <button onClick={handle_add}>PUSH</button>
            <button onClick={handleConvertToRows}>Convert to Table</button>
          </div>
          {/* - POST METHOD */}
          <div
            className="content-center"
            style={{ gap: "1vh", flexDirection: "column" }}
          >
            <button onClick={handle_update}>UPDATE</button>
            <button onClick={handle_delete}>DELETE</button>
          </div>
        </div>
        <div style={{ width: "100%", height: "50vh", overflowY: "scroll" }}>
          <table border="1" style={{ width: "100%", marginBottom: "20px" }}>
            <thead>
              <tr>
                <th>Field (column1)</th>
                <th>Data (column2)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={row.column1}
                      onChange={(e) =>
                        handleInputChange(index, "column1", e.target.value)
                      }
                      placeholder="Field (e.g. name)"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.column2}
                      onChange={(e) =>
                        handleInputChange(index, "column2", e.target.value)
                      }
                      placeholder="Data (e.g. John)"
                    />
                  </td>
                  <td>
                    <button onClick={() => removeRow(index)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button onClick={addRow}>Add Row</button>
        <button onClick={() => console.log(getJsonObject())}>
          Console.log
        </button>
      </div>
    </React.Fragment>
  );
};

export default P5_MAINTENANCE_INDEX;
