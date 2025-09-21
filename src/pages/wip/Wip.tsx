import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import { Fade } from "react-awesome-reveal";
import "./wip.css";
import Button from "../../components/button/Button";
import { useTheme } from "styled-components";

export default function Wip(): JSX.Element {
  const theme = useTheme();
  return (
    <div className="wip-main">
      <Header />
      <div className="wip-class">
        <Fade bottom duration={2000} distance="40px">
          <h1>Woops</h1>
          <h1 className="wip-descr">Work In Progress</h1>
          <p>The requested page is unavailable at the moment!</p>
          <div style={{ textAlign: "center", paddingTop: "20px" }}>
            <Button text="Go Home" to="/home" theme={theme} />
          </div>
        </Fade>
      </div>
      <Footer />
      <TopButton />
    </div>
  );
}
