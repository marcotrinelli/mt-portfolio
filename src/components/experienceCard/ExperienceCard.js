import React, { useState, createRef } from "react";
import "./ExperienceCard.scss";
import ColorThief from "colorthief";
import { useTheme } from 'styled-components'
import LinkIcon from "../linkIcon/LinkIcon";


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
                    className={"subTitle experience-text-bullets"}
                    style={{ color: theme.text }}
                >
                    {item.desc}
                    {item.url && <LinkIcon key={item.url} url={item.url} style={{ color: theme.text }}/>}
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
                {/* <h5 className="experience-text-company" style={{ color: theme.text }}>{cardInfo.company} </h5> */}
                <h5
                    className={"experience-text-role"}
                    style={{ color: theme.text }}
                >
                    {cardInfo.role}
                </h5>
                <h5
                    className="experience-text-location"
                    style={{ color: theme.text }}
                >
                    {cardInfo.location}
                </h5>
                <h5
                    className={"experience-text-date"}
                    style={{ color: theme.text }}
                >
                    {cardInfo.date}
                </h5>
                <div
                    className={"subTitle experience-text-desc"}
                    style={{ color: theme.text }}
                >
                    {cardInfo.desc.split(/\n/).map((line, i) => <p key={i}>{line}</p>)}
                </div>
                <ul>
                    <GetDescBullets descBullets={cardInfo.descBullets} theme={theme} />
                </ul>
            </div>
        </div>
    );
}
