import React from "react";
import "./Education.scss";
import EducationCard from "../../components/educationCard/EducationCard";
import Button from '../../components/button/Button'
import { educationInfo } from "../../portfolio";
import { useTheme } from 'styled-components'

export default function Education() {
    const theme = useTheme();

    if (educationInfo.display) {
        return (
            <div className="education-section" id="education">
                <h1 className="education-heading" style={{ color: theme.title }}>Education</h1>
                <div className="education-card-container">
                    {educationInfo.schools.map((school, index) => (
                        <EducationCard key={index} school={school} />
                    ))}
                    <div style={{ textAlign: "center", paddingTop: "20px" }}>
                        <Button
                            text="See more"
                            to="/education"
                            theme={theme}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return null;
}
