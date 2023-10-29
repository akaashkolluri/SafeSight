import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import FileDownload from "./FileDownload";

import styles from "../styles/home.module.css";
function About() {
  return (
    <div className={styles.colorContainer}>
      <Header />
      <div className={styles.body}>
        <h1 className={styles.title}> About SafeSight </h1>
        <h2 className={styles.subtitle}>
          {" "}
          <b> The Problem</b>
        </h2>
        <h4 className={styles.bodytext}>
          {" "}
          Annually, 2.78 million workers die due to work-related accidents and
          diseases, with 374 million more facing non-fatal incidents. That's
          7,500 daily deaths, surpassing those from road accidents, war, and
          violence combined. Implementing an AI-based workplace safety
          monitoring tool addresses the pressing issue of workplace injuries.
          SafeSight technology ensures real-time monitoring, timely incident
          detection, and automated generation of accurate injury reports,
          enhancing workplace safety and efficiency.
        </h4>
        <h2 className={styles.subtitle}>
          {" "}
          <b> Our Solution</b>
        </h2>
        <h4 className={styles.bodytext}>
          {" "}
          SafeSight is a cutting-edge technology company that specializes in
          real-time security footage analysis. We utilize state-of-the-art AI
          technology to scan, identify, and alert about potential hazards in
          public spaces, ensuring that risks are addressed promptly and
          efficiently. Founded by a former paralegal with firsthand knowledge of
          the aftermath of preventable injuries, SafeSight aims to bridge the
          gap between surveillance and safety, revolutionizing the way
          businesses approach on-premises safety.
        </h4>
        <h2 className={styles.subtitle}>
          {" "}
          <b> Our Mission </b>
        </h2>
        <h4 className={styles.bodytext}>
          {" "}
          Our mission is to empower businesses and public spaces with real-time
          insights, enabling immediate action to ensure the safety of every
          individual. We believe in proactive prevention, ensuring that
          potential hazards are not just observed but acted upon.
        </h4>
      </div>
      <Footer />
    </div>
  );
}

export default About;
