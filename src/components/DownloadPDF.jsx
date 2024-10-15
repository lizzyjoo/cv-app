import PropTypes from "prop-types";
import html2pdf from "html2pdf.js";
import "./CV.css";
import Icon from "@mdi/react";
import { mdiDownload } from "@mdi/js";

const DownloadPDF = ({ rootElementId, downloadFileName }) => {
  const downloadPDF = () => {
    const element = document.getElementById(rootElementId);

    if (!element) {
      console.error(`Element with id "${rootElementId}" not found`);
      alert("Error: Could not find CV content. Please try again.");
      return;
    }

    console.log("Content to be converted:", element.innerHTML);

    const opt = {
      margin: [0, 0, 0, 0], // [top, left, bottom, right] margins in mm
      filename: downloadFileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        console.log("PDF generated successfully");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        alert("Error generating PDF. Please check the console for details.");
      });
  };

  return (
    <button id="downloadBtn" onClick={downloadPDF}>
      <Icon path={mdiDownload} size={1} />
    </button>
  );
};

DownloadPDF.propTypes = {
  rootElementId: PropTypes.string,
  downloadFileName: PropTypes.string,
};

export default DownloadPDF;
