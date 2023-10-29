import React, { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import styles from "../styles/home.module.css";
function SinglePhoto({ smallData, setDesc }) {
  useEffect(() => {
    console.log(
      parseInt(smallData.time.split(":")[0]) * 60 +
        parseInt(smallData.time.split(":")[1])
    );
    setVideo(
      parseInt(smallData.time.split(":")[0]) * 60 +
        parseInt(smallData.time.split(":")[1])
    );
  });

  const setVideo = (second) => {
    console.log("CALLED");
    var vid = document.getElementById("Video");
    vid.currenttime = second + "";
    console.log(vid);
  };

  return (
    <div>
      <video currentTime={"3.0"} width="460" id="Video">
        <source src={smallData.video} />
      </video>
    </div>
  );
}

export default SinglePhoto;
