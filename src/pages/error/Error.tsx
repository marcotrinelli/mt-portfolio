import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Fade } from "react-awesome-reveal";
import "./Error.css";
import Button from "../../components/button/Button";
import { useTheme } from "styled-components";

interface ErrorPageProps {
  title: string;
  subtitle: string;
  description: string;
}
export default function Error({
  title,
  subtitle,
  description,
}: ErrorPageProps): JSX.Element {
  const theme = useTheme();
  return (
    <div className="error-main">
      <Header />
      <div className="error-class">
        <Fade bottom duration={2000} distance="40px">
          <h1>{title}</h1>
          <h1 className="error-404">{subtitle}</h1>
          <p>{description}</p>
          <div style={{ textAlign: "center", paddingTop: "20px" }}>
            <Button text="Go Home" to="/home" theme={theme} />
          </div>
        </Fade>
      </div>
      <Footer />
    </div>
  );
}
