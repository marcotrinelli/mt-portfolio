import React from "react";
import "./Footer.scss";
import SocialMedia from "../socialMedia/SocialMedia";
import { greeting } from "../../portfolio";

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-inner">
      <p className="footer-text">
        <span className="footer-copyright">©</span>{" "}
        {new Date().getFullYear()} {greeting.username}
      </p>
      <SocialMedia />
    </div>
  </footer>
);

export default Footer;
