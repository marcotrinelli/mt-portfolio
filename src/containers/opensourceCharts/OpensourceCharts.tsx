import React from "react";
import { Fade } from "react-awesome-reveal";
import "./OpensourceCharts.css";
import { useTheme } from "styled-components";

export default function OpensourceCharts(): JSX.Element {
  const theme = useTheme();
  return (
    <div>
      <div className="os-charts-header-div">
        <Fade bottom duration={2000} distance="20px">
          <h1 className="os-charts-header" style={{ color: theme.text }}>
            Open Source Charts
          </h1>
          <p className="subTitle">
            Charts showing contributions and activities
          </p>
        </Fade>
      </div>
      <div className="os-charts-body-div">
        <p>Charts will be displayed here when chart components are available</p>
      </div>
    </div>
  );
}
