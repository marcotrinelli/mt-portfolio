import React from "react";
import "./WorkExperience.scss";
import ExperienceCard from "../../components/experienceCard/ExperienceCard";
import { workExperiences } from "../../portfolio";
import { Fade } from "react-awesome-reveal";
import { useTheme } from 'styled-components'
import Button from "../../components/button/Button";

export default function WorkExperience() {
    const theme = useTheme();

    if (workExperiences.display) {
        return (
            <div id="experience">
                <Fade bottom duration={1000} distance="20px">
                    <div className="experience-container" id="workExperience">
                        <div>
                            <h1 className="experience-heading" style={{ color: theme.title }}>Experience</h1>
                            <div className="experience-cards-div">
                                {workExperiences.experience.map((card, i) => {
                                    return (
                                        <ExperienceCard
                                            key={i}
                                            cardInfo={{
                                                company: card.company,
                                                desc: card.desc,
                                                date: card.date,
                                                companylogo: card.companylogo,
                                                role: card.role,
                                                descBullets: card.descBullets
                                            }}
                                        />
                                    );
                                })}
                            </div>

                        </div>
                    </div>
                    <div style={{ textAlign: "center", paddingTop: "20px" }}>
                        <Button
                            text="See more"
                            to="/experience"
                            theme={theme}
                        />
                    </div>
                </Fade>
            </div>
        );
    }
    return null;
}
