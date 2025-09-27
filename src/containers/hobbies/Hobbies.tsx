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
    <div className="hobbies-main">
      <div className="basic-hobbies">
        <Fade bottom duration={2000} distance="40px">
          <div className="hobbies-heading-div">
            <div className="hobbies-heading-text-div">
              <h1
                className="hobbies-heading-text"
                style={{ color: theme.text }}
              >
                {hobbieSection.title}
              </h1>
              {hobbieSection.subtitle && (
                <p
                  className="hobbies-header-detail-text subTitle"
                  style={{ color: theme.secondaryText }}
                >
                  {hobbieSection.subtitle}
                </p>
              )}
            </div>
          </div>
        </Fade>
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
  );
}
