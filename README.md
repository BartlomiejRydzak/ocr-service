OCR Service

OCR Service is a web application designed to extract data from Polish personal IDs issued since 2019. Simply upload a scanned PDF of the document, ensuring it is centered on the page. You can upload both the front and back of the ID, and the app will extract all relevant information for you.

---

Features

- Extracts personal data from Polish IDs issued since 2019.
- Supports PDF uploads.
- Provides structured data output for each page of the document.
- Drag-and-drop interface for easy file uploads.
- Error handling for large files or server limitations.

---

Deployment

You can try the live version of the app here: https://ocr-service-seven.vercel.app

---

Installation (Optional)

To run the app locally:

1. Clone the repository:

git clone https://github.com/BartlomiejRydzak/ocr-service.git
cd ocr-service

2. Install dependencies:

npm install

3. Start the development server:

npm start

4. Open http://localhost:3000 in your browser.

---

Usage

1. Upload a PDF file of your Polish ID.
2. Wait for the extraction process to complete.
3. View the extracted data displayed per page.
4. If the processing fails due to memory limits (on Render free plan), consider cloning the repository and running locally.

---

Example Output

Here’s an example of how extracted data might look:

Label               | Value
------------------- | --------------------------------
PERSONAL_NUMBER      | 84103112811
ID_NUMBER            | UFD717225
PLACE_OF_BIRTH       | RZESZÓW
FAMILY_NAME          | KOS
DATE_OF_ISSUE        | 08.09.2020
ISSUING_AUTHORITY    | BURMISTRZ MIASTA RZESZOW

---

Technologies Used

- Frontend: React
- Backend: Node.js, Express
- File Processing: Axios for uploads
- Deployment: Render (backend), Vercel (frontend)

---

License

This project is licensed under the MIT License.
