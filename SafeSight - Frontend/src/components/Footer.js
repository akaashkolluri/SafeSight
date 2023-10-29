import { Component } from "react";
import { Layout, Col } from "antd";
import styles from "../styles/footer.module.css";

class Footer extends Component {
  render() {
    return (
      <Layout.Footer className={styles.footer}>
        <Col>
          <a href="https://github.com/akaashkolluri/visiocomp">
            made by Akaash Kolluri, Alan Ma, and Andrew Ai
          </a>
          <p> 🎃 CalHacks 10.0 🎃</p>
        </Col>
      </Layout.Footer>
    );
  }
}
export default Footer;
