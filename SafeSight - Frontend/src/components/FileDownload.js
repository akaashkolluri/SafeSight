import React, { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import styles from "../styles/home.module.css";
function FileDownload({ html }) {
  useEffect(() => {
    console.log(html);
  });
  const printDocument = () => {
    console.log("printing", html);
    let iframe = document.createElement("iframe");
    iframe.style.visibility = "hidden";
    document.body.appendChild(iframe);
    let iframedoc = iframe.contentDocument || iframe.contentWindow.document;
    iframedoc.body.innerHTML = html;

    html2canvas(iframedoc.body, {}).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  };
  return (
    <div>
      <a
        onClick={() => {
          printDocument();
        }}
        className={styles.downloadButton}
      >
        {" "}
        Download HTML
      </a>
    </div>
  );
}

export default FileDownload;
