import "./App.css";
import axios from "axios";
import { useState } from "react";


function App() {
  const URL = "https://ocr-appv2.onrender.com/api";
  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(false);


  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(Array.from(event.dataTransfer.files));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRender(false)

    if (files.length === 0) return alert("Please select or drop files first!");

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));

    try {
      setLoading(true); // start loading
      const result = await axios.post(URL + "/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(result.data);
      setData(result.data);
    } catch (error) {
      if (error.response.status === 500) {
        console.error("Server error (500):", error.response.data);
        setRender(true)
      } else {
        console.error(`Error ${error.response.status}:`, error.response.data);
      }
    } finally {
      setLoading(false); // stop loading
    }
  };



  // const data = {"file_0":{"page_0":{"PERSONAL_NUMBER":"84103112811","ID_NUMBER":"OF UFD717225 8410319M5007015P0L 841031128118","PLACE_OF_BIRTH":"RZESZÓW","FAMILY_NAME":"KOS","DATE_OF_ISSUE":"OF 08.09.2020","ISSUING_AUTHORITY":"BURMISTRZ MIASTA RZESZOW"}}}
  return (
    <div className="main-container">
      <h1 className="center">Pass documents to receive extracted data</h1>

    <div
      className={`drag-drop-area ${dragOver ? "drag-over" : ""}`}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
    >
      {files.length > 0 ? (
        <ul>
          {files.map((file, index) => (
            <li key={index}>📂 {file.name}</li>
          ))}
        </ul>
      ) : (
        <p>Drag & drop files here, or click to select</p>
      )}
    </div>


    <form onSubmit={handleSubmit}>
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>

    

    {loading && (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Uploading and processing files, please wait...</p>
      </div>
    )}

    {render && (
      <div className="render-warning">
        Render's free plan memory is not enough for image preprocessing. Try cloning GitHub repository{" "}
        <a href="https://github.com/BartlomiejRydzak/ocr-service.git" target="_blank" rel="noopener noreferrer">
          https://github.com/BartlomiejRydzak/ocr-service.git
        </a>
      </div>
    )}


    {Object.entries(data).map(([fileKey, fileValue], fileIndex) => (
      <div key={fileKey} className="file-result">
        <h2>{`File: ${files[fileIndex]?.name || fileKey}`}</h2> {/* show uploaded file name if available */}

        {Object.entries(fileValue).map(([pageKey, pageValue], pageIndex) => (
          <div key={pageKey} className="page-result">
            <h3>{`Page: ${pageIndex + 1}`}</h3> {/* display page number */}

            <table border="1">
              <thead>
                <tr>
                  <th>Label</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(pageValue).map(([label, value], index) => (
                  <tr key={index}>
                    <td>{label}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    ))}


    </div>
  );
}

export default App;
