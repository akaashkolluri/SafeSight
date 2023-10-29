import React, { use, useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";

import InsightTable from "./InsightTable";
import styles from "../styles/home.module.css";

function History() {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    let allIncidents = localStorage.getItem("allIncidents");
    allIncidents = allIncidents.split(",");
    console.log(allIncidents);
    let data = [];
    for (let i = 0; i < allIncidents.length; i++) {
      console.log(allIncidents[i]);
      try {
        console.log(JSON.parse(localStorage.getItem(allIncidents[i])));
        data.push(JSON.parse(localStorage.getItem(allIncidents[i])));
      } catch {
        console.log("error parsing");
      }
    }

    setTableData(data);
  }, []);
  return (
    <div className={styles.colorContainer}>
      <Header />
      <div className={styles.body}>
        <h1 className={styles.title}> Report History </h1>

        <p />

        <p />
        <a href="/history" className={styles.subButton}>
          {" "}
          Been here before? See report history!
        </a>
        <InsightTable
          data={tableData}
          isHistory={true}
          //   setVideoTime={setVideo}
          setTableData={setTableData}
        />
      </div>
      <Footer />
    </div>
  );
}

export default History;
