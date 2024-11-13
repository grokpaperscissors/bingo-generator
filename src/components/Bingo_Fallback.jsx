import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const suggestions = [
  "Item 1",
  "Item 2",
  "Item 3",
  "Item 4",
  "Item 5",
  "This is a test to check rendering",
  "Item 7",
  "Item 8",
  "Item 9",
  "Item 10",
  "Item 11",
  "Item 12",
  "Item 13",
  "Item 14",
  "Item 15",
  "Item 16",
  "Item 17",
  "Item 18",
  "Item 19",
  "Item 20",
  "Item 21",
  "Item 22",
  "Item 23",
  "Item 24",
  "Item 25",
];

function BingoGenerator() {
  const [grid1, setGrid1] = useState(shuffleArray([...suggestions]));
  const [grid2, setGrid2] = useState(shuffleArray([...suggestions]));

  // Shuffle function
  function shuffleArray(array) {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  // Shuffle both grids
  function shuffleGrids() {
    setGrid1(shuffleArray([...suggestions]));
    setGrid2(shuffleArray([...suggestions]));
  }

  // Download both grids as PDF
  function downloadGridsAsPDF() {
    const input = document.getElementById("bingo-grids");
    const format = "a4"; // Can be dynamically adjusted

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: format,
      });

      // Get page dimensions
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Calculate the aspect ratio of the image
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const canvasAspectRatio = canvasWidth / canvasHeight;

      // Calculate the width and height while preserving aspect ratio
      let imgWidth = pageWidth - 20; // 10pt margin on each side
      let imgHeight = imgWidth / canvasAspectRatio;

      // If the calculated height exceeds the page height, adjust based on height
      if (imgHeight > pageHeight - 20) {
        imgHeight = pageHeight - 20;
        imgWidth = imgHeight * canvasAspectRatio;
      }

      // Add the image to the PDF without distortion
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("bingo_grids.pdf");
    });
  }

  return (
    <div className="bingo-container">
      <h1>Bingo Generator</h1>
      <div id="bingo-grids" className="grids">
        <h2>Grid 1</h2>
        <div className="grid">
          {grid1.map((item, index) => (
            <div key={index} className="grid-item">
              {item}
            </div>
          ))}
        </div>
        <h2>Grid 2</h2>
        <div className="grid">
          {grid2.map((item, index) => (
            <div key={index} className="grid-item">
              {item}
            </div>
          ))}
        </div>
      </div>
      <button onClick={shuffleGrids}>Shuffle Both Grids</button>
      <button onClick={downloadGridsAsPDF}>Download as PDF</button>

      <style>{`
        .bingo-container {
          text-align: center;
          font-family: Arial, sans-serif;
          padding: 20px;
        }
        .grids {
          display: flex;
          flex-direction: column;
          gap: 30px;
          margin: 20px auto;
          width: 100%; /* Full width to ensure it fills the space */
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr); /* 5 columns */
          gap: 10px;
          margin: 0 auto;
          width: 100%; /* Ensure grid fills the entire width of the PDF */
        }
        h2 {
          font-size: 30px;
          margin-bottom: 15px;
        }
        .grid-item {
          background-color: #f0f0f0;
          border: 1px solid #ddd;
          padding: 10px;
          font-size: 22px;
          text-align: center; 
          display: flex;
          justify-content: center;
          align-items: center;
          aspect-ratio: 1 / 1; /* Ensures square cells */
        }
        button {
          margin: 10px;
          padding: 12px 20px;
          font-size: 14px;
          cursor: pointer;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
        }
        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}

export default BingoGenerator;
