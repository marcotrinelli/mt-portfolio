import React from "react";
import "./Hobbies.scss";
import HobbyCard from "../../components/hobbyCard/HobbyCard";
import { hobbieSection } from "../../portfolio";
import { Fade } from "react-awesome-reveal";
import { useTheme } from "styled-components";

export default function Hobbies(): JSX.Element | null {
  const theme = useTheme();
  if (!hobbieSection.display) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="hobbies">
        <div className="hobbies-main-div">
          <div className="hobbies-header">
            <h1
              className={"heading hobbies-heading"}
              style={{ color: theme.title }}
            >
              {hobbieSection.title}
            </h1>
            {hobbieSection.subtitle && (
              <p
                className="hobbies-subtitle"
                style={{ color: theme.secondaryText }}
              >
                {hobbieSection.subtitle}
              </p>
            )}
          </div>
          <div className="hobbies-cards-div">
            {hobbieSection.hobbiesCards.map((card, i: number) => {
              return (
                <HobbyCard
                  key={i}
                  cardInfo={{
                    title: card.title,
                    description: card.subtitle,
                    image: card.image,
                    footer: card.footerLink,
                    isLottie: true, // All hobby cards will use Lottie animations
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
