import React, { use, useEffect, useState } from "react";
import Report from "./Report";
import InsightTable from "./InsightTable";
import axios from "axios";
import styles from "../styles/home.module.css";
import { Col, Row, Spin } from "antd";
import { upload } from "@testing-library/user-event/dist/upload";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { LoadingOutlined } from "@ant-design/icons";

import { firebaseConfig } from "../../key";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

function Analyze({ video }) {
  const [loading, setLoading] = useState(true);
  const [toReport, setToReport] = useState(false);
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    if (tableData == null) uploadFile(video);
    else {
      for (let i = 0; i < tableData.length; i++) {
        let id = tableData[i]["id"];
        let toStore = tableData[i];
        localStorage.setItem(id, JSON.stringify(toStore));

        if (localStorage.getItem("allIncidents") == null) {
          localStorage.setItem("allIncidents", id);
        } else {
          localStorage.setItem(
            "allIncidents",
            localStorage.getItem("allIncidents") + "," + id
          );
        }
      }
    }
  });

  const setVideo = (second) => {
    console.log("CALLED");
    var vid = document.getElementById("Video");
    console.log(vid);
    vid.currentTime = second;
    setLoading(false);
  };
  const uploadFile = async (video) => {
    // setIsUploading(true);
    console.log("attempign to upload", video);
    const storageRef = ref(storage, "videos/" + video.name);
    // uploadBytesResumable(storageRef, video).then((snapshot) => {2
    //   console.log("Uploaded a blob or file!");

    //   //   setFirebaseVideoRef("videos/" + video.name);
    //   //   setIsUploading(false);
    // });
    analyzeVideo("videos/" + video.name);
  };

  const analyzeVideo = async (videoRef) => {
    let url =
      "https://visiocomp-api-git-main-akaash.vercel.app/analyzeVideo?name=" +
      videoRef;
    axios.get(url).then((response) => {
      console.log(response["data"]["results"]);

      const temptableData = response["data"]["results"];
      for (let i = 0; i < temptableData.length; i++) {
        const id = Date.now() + i;
        temptableData[i]["id"] = id;
        temptableData[i]["video"] = URL.createObjectURL(video);
        if (temptableData[i]["category"] == "incident") {
          temptableData[i]["action"] = {
            index: i,
            time: temptableData[i]["time"],
            todo: true,
            report: false,
            reportData: "",
            video: URL.createObjectURL(video),
            gpt: temptableData[i]["gpt"],
          };
        } else {
          temptableData[i]["action"] = {
            index: i,
            time: temptableData[i]["time"],
            todo: false,
            report: false,
            reportData: "",
            video: URL.createObjectURL(video),
            gpt: temptableData[i]["gpt"],
          };
        }
      }
      setTableData(temptableData);
      console.log(temptableData);
      setLoading(true);
      setLoading(false);
    });
  };

  return (
    <div>
      {toReport ? (
        <Report />
      ) : (
        <div className={styles.body}>
          <Row gutter={70}>
            <Col className="gutter-row">
              <h1 className={styles.subtitle}> Uploaded Video</h1>
              <video currentTime={"3"} width="400" id="Video" controls>
                <source src={URL.createObjectURL(video)} />
              </video>
            </Col>
            <Col className="gutter-row">
              <h1 className={styles.subtitle}> Insights From Video</h1>
              {loading ? (
                <div>
                  <h4 className={styles.subtitle}>
                    {" "}
                    Insights might take a second...
                  </h4>
                  <Spin indicator={antIcon} />
                </div>
              ) : (
                <div>
                  <InsightTable
                    data={tableData}
                    setVideoTime={setVideo}
                    setTableData={setTableData}
                    video={video}
                  />
                  <a
                    onClick={() => {
                      setToReport(true);
                    }}
                  ></a>
                </div>
              )}
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default Analyze;
