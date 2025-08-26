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
      setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <h1 className="center">Pass pdf documents to receive extracted data</h1>

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
        The amout of ram memory available at Render's free plan is not enough for image preprocessing. Try cloning GitHub repository{" "}
        <a href="https://github.com/BartlomiejRydzak/ocr-service.git" target="_blank" rel="noopener noreferrer">
          https://github.com/BartlomiejRydzak/ocr-service.git
        </a>
      </div>
    )}


    {Object.entries(data).map(([fileKey, fileValue], fileIndex) => (
      <div key={fileKey} className="file-result">
        <h2>{`File: ${files[fileIndex]?.name || fileKey}`}</h2> 

        {Object.entries(fileValue).map(([pageKey, pageValue], pageIndex) => (
          <div key={pageKey} className="page-result">
            <h3>{`Page: ${pageIndex + 1}`}</h3> 

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
