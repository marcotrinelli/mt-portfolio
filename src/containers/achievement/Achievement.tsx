import React from "react";
import "./Achievement.scss";
import AchievementCard from "../../components/achievementCard/AchievementCard";
import { hobbieSection } from "../../portfolio";
import { Fade } from "react-awesome-reveal";
import { useTheme } from "styled-components";

export default function Achievement(): JSX.Element | null {
  const theme = useTheme();
  if (!hobbieSection.display) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="achievements">
        <div className="achievement-main-div">
          <div className="achievement-header">
            <h1
              className={"heading achievement-heading"}
              style={{ color: theme.title }}
            >
              {hobbieSection.title}
            </h1>
          </div>
          <div className="achievement-cards-div">
            {hobbieSection.achievementsCards.map((card, i: number) => {
              return (
                <AchievementCard
                  key={i}
                  cardInfo={{
                    title: card.title,
                    description: card.subtitle,
                    image: card.image,
                    footer: card.footerLink,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Fade>
  );
}
