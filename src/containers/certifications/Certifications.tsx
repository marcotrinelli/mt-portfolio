import React from "react";
import "./Certifications.css";
import { Fade } from "react-awesome-reveal";
import { certifications } from "../../portfolio";
import CertificationCard from "../../components/certificationCard/CertificationCard";
import { useTheme } from "styled-components";

export default function Certifications(): JSX.Element {
  const theme = useTheme();
  return (
    <div className="main" id="certs">
      <div className="certs-header-div">
        <Fade bottom duration={2000} distance="20px">
          <h1 className="certs-header" style={{ color: theme.text }}>
            Certifications
          </h1>
        </Fade>
      </div>
      <div className="certs-body-div">
        {certifications.certifications.map((cert, index: number) => {
          return (
            <CertificationCard key={index} certificate={cert} theme={theme} />
          );
        })}
      </div>
    </div>
  );
}
