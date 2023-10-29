import React, { useState, useEffect } from "react";
import { Space, Table, Tag, Modal } from "antd";
import Report from "./Report";
import FileDownload from "./FileDownload";
import SinglePhoto from "./SinglePhoto";
import styles from "../styles/home.module.css";

function InsightTable({ data, setVideoTime, setTableData, isHistory }) {
  //   const [dataTable, setDataTable] = useEffect([]);

  const [canClearModal, setCanClearModal] = useState(false);

  const [clearModal, setClearModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const fillReport = (index, reportData) => {
    console.log("FILL REPORT HAS BEEN CALLD");
    let tempData = data;
    tempData[index]["action"]["report"] = true;
    tempData[index]["action"]["reportData"] = reportData;

    localStorage.setItem(
      tempData[index]["id"],
      JSON.stringify(tempData[index])
    );
    setTableData(tempData);
    setCanClearModal(true);
  };

  const storeData = (data) => {
    localStorage.setItem("allIncidents", JSON.stringify(data));
  };

  const columns2 = [
    {
      title: "Video Name",
      dataIndex: "videoname",
      key: "video",
    },
    {
      title: "Incident ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "action needed",
      dataIndex: "action",
      key: "action",
      render: (text) => {
        console.log(text);
        if (text.todo && !text.report)
          return (
            <a
              className={styles.downloadButton}
              onClick={() => {
                setIsModalOpen(true);
                setModalData(text);
                console.log("Modal data set to ", text);
              }}
            >
              {" "}
              Generate Report
            </a>
          );
        else if (text.todo && text.report) {
          console.log(text);
          return <FileDownload html={text.reportData} />;
        } else
          return (
            <a
              className={styles.downloadButton}
              onClick={() => {
                setIsModal2Open(true);
                setModalData(text);
                console.log("Modal data set to ", text);
              }}
            >
              {" "}
              Safety Solutions
            </a>
          );
      },
    },
  ];

  const columns = [
    {
      title: "Incident ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "time",
      dataIndex: "time",
      key: "time",
      render: (text) => (
        <a
          onClick={() => {
            setVideoTime(
              parseInt(text.split(":")[0]) * 60 + parseInt(text.split(":")[1])
            );
            console.log("CLICKS!");
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "action needed",
      dataIndex: "action",
      key: "action",
      render: (text) => {
        console.log(text);
        if (text.todo && !text.report)
          return (
            <a
              className={styles.downloadButton}
              onClick={() => {
                setIsModalOpen(true);
                setModalData(text);
                console.log("Modal data set to ", text);
              }}
            >
              {" "}
              Generate Report
            </a>
          );
        else if (text.todo && text.report) {
          console.log(text);
          return <FileDownload html={text.reportData} />;
        } else
          return (
            <a
              className={styles.downloadButton}
              onClick={() => {
                setIsModal2Open(true);
                setModalData(text);
                console.log("Modal data set to ", text);
              }}
            >
              {" "}
              Safety Solutions
            </a>
          );
      },
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [modalData, setModalData] = useState({});

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal2 = () => {
    setIsModal2Open(true);
  };

  const handleOk2 = () => {
    setIsModal2Open(false);
  };

  const handleCancel2 = () => {
    setIsModal2Open(false);
  };

  return (
    <div>
      {isHistory ? (
        <Table columns={columns2} dataSource={data} />
      ) : (
        <Table columns={columns} dataSource={data} />
      )}
      <Modal
        title="Work Comp Survey"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        {/* <SinglePhoto smallData={modalData} bigData={data} /> */}
        <Report data={modalData} fillReport={fillReport} />
      </Modal>
      <Modal
        title="Hazard Report"
        open={isModal2Open}
        onOk={handleOk2}
        onCancel={handleCancel2}
        destroyOnClose={true}
      >
        We detected a hazard in your workspace. Please take a look at the
        following options to ensure the safety of your workers!
        {modalData.gpt}
      </Modal>
    </div>
  );
}

export default InsightTable;
