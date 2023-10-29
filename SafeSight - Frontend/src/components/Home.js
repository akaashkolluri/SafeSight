import React from "react";
import Footer from "./Footer";
import Header from "./Header";

import { Row, Col } from "antd";
import styles from "../styles/home.module.css";
function Home() {
  return (
    <div className={styles.colorContainer}>
      <Header />
      <div>
        <div className={styles.body}>
          <div className={styles.backgroundGradient}>
            <div className={styles.textBox}>
              <h1 className={styles.title}> Stop. Site. Settle. </h1>

              <h2>
                Powered by computer vision and robust LLMs trained on legal
                data, SafeSight is the all-in-one tool for automatic monitoring,
                prevention, detection, and claim filing of workplace injuries.
              </h2>
              <p />
              <a href="/about">About Us</a>
              <a href="/identify">
                Analyze<span color="red"> </span>Video
              </a>
              <a href="/history">Reports</a>
            </div>
          </div>

          <img src="/front-util.png" className={styles.frontImage} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
