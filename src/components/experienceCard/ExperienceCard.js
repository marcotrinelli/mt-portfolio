import React, { useState, createRef } from "react";
import "./ExperienceCard.scss";
import ColorThief from "colorthief";
import { useTheme } from 'styled-components'

export default function ExperienceCard({ cardInfo }) {
    const [colorArrays, setColorArrays] = useState([]);
    const theme = useTheme();
    const imgRef = createRef();

    function getColorArrays() {
        const colorThief = new ColorThief();
        setColorArrays(colorThief.getColor(imgRef.current));
    }

    function rgb(values) {
        return typeof values === "undefined"
            ? null
            : "rgb(" + values.join(", ") + ")";
    }

    const GetDescBullets = ({ descBullets, theme }) => {
        return descBullets
            ? descBullets.map((item, i) => (
                <li
                    key={i}
                    className={"subTitle"}
                    style={{ color: theme.text }}
                >
                    {item}
                </li>
            ))
            : null;
    };

    return (
        <div className={"experience-card"}
            style={{
                backgroundColor: theme.paperbg,
                boxShadow: `0px 10px 30px -15px ${theme.boxShadowColor}`
            }}
        >
            <div style={{ background: "white" }} className="experience-banner">
                <div className="experience-blurred_div"></div>
                <div className="experience-div-company">
                    <img
                        crossOrigin={"anonymous"}
                        ref={imgRef}
                        src={cardInfo.companylogo}
                        alt={cardInfo.company}
                        onLoad={() => getColorArrays()}
                    />
                </div>
            </div>
            <div className="experience-text-details">
                {/* <h5 className="experience-text-company">{cardInfo.company}</h5> */}
                <h5
                    className={"experience-text-role"}
                    style={{ color: theme.text }}
                >
                    {cardInfo.role}
                </h5>
                <h5
                    className={"experience-text-date"}
                    style={{ color: theme.text }}
                >
                    {cardInfo.date}
                </h5>
                <p
                    className={"subTitle experience-text-desc"}
                    style={{ color: theme.text }}
                >
                    {cardInfo.desc}
                </p>
                <ul>
                    <GetDescBullets descBullets={cardInfo.descBullets} theme={theme} />
                </ul>
            </div>
        </div>
    );
}
