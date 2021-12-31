import React from "react";
import "./Footer.scss";
import { Fade } from "react-awesome-reveal";
import { useTheme } from "styled-components";

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      <div style={{ paddingTop: "100px" }} />
      <div className="footer-div">
        <Fade>
          <p className="footer-text" style={{ color: theme.text }}>
            © {new Date().getFullYear()} Marco Trinelli
          </p>
        </Fade>
      </div>
    </>
  );
};

export default Footer;
