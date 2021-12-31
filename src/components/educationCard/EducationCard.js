import React, { createRef } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import "./EducationCard.scss";
import { useTheme } from 'styled-components'

export default function EducationCard({ school }) {
    const imgRef = createRef();
    const theme = useTheme();

    const GetDescBullets = ({ descBullets }) => {
        return descBullets
            ? descBullets.map((item, i) => (
                <li key={i} className="subTitle">
                    {item}
                </li>
            ))
            : null;
    };

    if (!school.logo)
        console.error(`Image of ${school.name} is missing in education section`);
    return (
        <div>
            <Fade left duration={1000}>
                <div className="education-card">
                    <div className="education-card-left">
                        <img
                            crossOrigin={"anonymous"}
                            ref={imgRef}
                            className="education-roundedimg"
                            style={{boxShadow: `0px 10px 30px -15px ${theme.boxShadowColor}`}}
                            src={school.logo}
                            alt={school.schoolName}
                        />
                    </div>
                    <div className="education-card-right">
                        <h5 className="education-text-school">{school.schoolName}</h5>

                        <div className="education-text-details">
                            <h5
                                className={"education-text-subHeader"}
                                style={{color: theme.text}}
                            >
                                {school.subHeader}
                            </h5>
                            <p
                                className={"education-text-duration"}
                                style={{color: theme.text}}
                            >
                                {school.duration}
                            </p>
                            <p className="education-text-desc">{school.desc}</p>
                            <div className="education-text-bullets">
                                <ul>
                                    <GetDescBullets descBullets={school.descBullets} />
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>
            <Slide left duration={2000}>
                <div className="education-card-border"></div>
            </Slide>
        </div>
    );
}
