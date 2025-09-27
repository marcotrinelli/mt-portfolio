import React from "react";
import DisplayLottie from "../displayLottie/DisplayLottie";

interface FooterLink {
  name: string;
  url: string;
}

interface HobbyCardInfo {
  image: string | any; // Can be either image path string or Lottie animation data
  title: string;
  description: string;
  footer: FooterLink[];
  isLottie?: boolean; // Flag to determine if image is Lottie animation
}

interface HobbyCardProps {
  cardInfo: HobbyCardInfo;
}

const HobbyCard: React.FC<HobbyCardProps> = ({ cardInfo }) => {
  function openUrlInNewTab(url: string): void {
    const win = window.open(url, "_blank");
    if (win) {
      win.focus();
    }
  }

  return (
    <div className="certificate-card hobby-card">
      <div className="certificate-image-div hobby-animation-div">
        {cardInfo.isLottie ? (
          <div className="hobby-lottie-container">
            <DisplayLottie animationData={cardInfo.image} />
          </div>
        ) : (
          <img src={cardInfo.image} alt="Hobby" className="card-image" />
        )}
      </div>
      <div className="certificate-detail-div hobby-detail-div">
        <h5 className="card-title hobby-title">{cardInfo.title}</h5>
        <p className="card-subtitle hobby-description">
          {cardInfo.description}
        </p>
      </div>
      <div className="certificate-card-footer hobby-footer">
        {cardInfo.footer.map((v, i) => {
          return (
            <p
              key={i}
              onClick={() => openUrlInNewTab(v.url)}
              className="hobby-link"
            >
              {v.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default HobbyCard;
