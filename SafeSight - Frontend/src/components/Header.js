import { Component } from "react";
import { Affix } from "antd";
import styles from "../styles/header.module.css";

class Header extends Component {
  render() {
    return (
      <Affix>
        <div className={styles.header}>
          <img src="/logosmall.png" className={styles.logo} />
          <a href="/" className={styles.title}>
            SafeSight
          </a>
          <p style={{ flex: 1 }} />
          <a href="/about" className={styles.tabs}>
            about us
          </a>
          |
          <a href="/identify" className={styles.tabs}>
            analyze video
          </a>
          |
          <a href="/history" className={styles.tabs}>
            past reports
          </a>
        </div>
      </Affix>
    );
  }
}
export default Header;
