import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Row } from "antd";
import Analyze from "./Analyze";
import DragDropFile from "./UploadBox";
// import * as firebase from "firebase";
// import "firebase/auth";
// import "firebase/storage";

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

import styles from "../styles/home.module.css";
import stylesSpec from "../styles/identify.module.css";

import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { upload } from "@testing-library/user-event/dist/upload";
const { Dragger } = Upload;

function Identify() {
  const [video, setVideo] = useState();
  const [url, setUrl] = useState(" ");
  const [analyze, setAnalyze] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [firebaseVideoRef, setFirebaseVideoRef] = useState();

  useEffect(() => {
    localStorage.setItem("test", "test");
  });
  return (
    <div className={styles.colorContainer}>
      <Header />
      {isUploading || !analyze ? (
        <div className={styles.body}>
          <h1 className={styles.title}> Analyze Video</h1>
          {/* <h2 className={styles.subtitle}> How this works? </h2> */}
          <h4 className={styles.bodytext}>
            Users can upload video surveillance footage to auto-analyze for
            hazards and incidents and generate reports. Companies can
            automatically integrate this software into their workplace
            monitoring systems.
          </h4>
          <Row>
            {/* <input
            type="file"
            onChange={(e) => {
              setVideo(e.target.files[0]);
              //   uploadFile(e.target.files[0]);
            }}
          /> */}
            <div className={stylesSpec.left}>
              <DragDropFile
                handleFile={(e) => {
                  setVideo(e[0]);
                  //   uploadFile(e.target.files[0]);
                }}
              />
              {video ? (
                <a
                  onClick={() => {
                    setAnalyze(true);
                  }}
                >
                  {" "}
                  Upload Video{" "}
                </a>
              ) : (
                <></>
              )}
            </div>

            <p />
            {video ? (
              <div className={stylesSpec.right}>
                <video width="500" controls>
                  <source src={URL.createObjectURL(video)} />
                </video>
              </div>
            ) : (
              <></>
            )}
          </Row>
        </div>
      ) : (
        <Analyze video={video} />
      )}
      <Footer />
    </div>
  );
}

export default Identify;

//   const uploadImage = () => {
//     const data = new FormData();
//     data.append("file", video);
//     data.append("upload_preset", "ffpthtzj");
//     data.append("cloud_name", "dsiujnla0");
//     fetch("https://api.cloudinary.com/v1_1/dsiujnla0/video/upload", {
//       method: "post",
//       body: data,
//     })
//       .then((resp) => resp.json())
//       .then((data) => setUrl(data.url))
//       .catch((err) => console.log(err));
//   };

// const uploadFile = async () => {
//     const S3_BUCKET = "elasticbeanstalk-us-east-2-595106069715";
//     const REGION = "us-east-2";

//     AWS.config.update({
//       accessKeyId: "AKIAYVDYV7TJZ6TMAUZO",
//       secretAccessKey: "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",
//     });
//     const s3 = new AWS.S3({
//       params: { Bucket: S3_BUCKET },
//       region: REGION,
//     });

//     const params = {
//       Bucket: S3_BUCKET,
//       Key: "here",
//       Body: video,
//     };

//     var upload = s3
//       .putObject(params)
//       .on("httpUploadProgress", (evt) => {
//         console.log(
//           "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
//         );
//       })
//       .promise();

//     await upload.then((err, data) => {
//       console.log(err);
//       console.log(data);
//       alert("File uploaded successfully.");
//     });
//   };
