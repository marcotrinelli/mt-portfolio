import React from "react";

interface FooterLink {
  name: string;
  url: string;
}

interface AchievementCardInfo {
  image: string;
  title: string;
  description: string;
  footer: FooterLink[];
}

interface AchievementCardProps {
  cardInfo: AchievementCardInfo;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ cardInfo }) => {
  function openUrlInNewTab(url: string): void {
    const win = window.open(url, "_blank");
    if (win) {
      win.focus();
    }
  }

  return (
    <div className="certificate-card">
      <div className="certificate-image-div">
        <img src={cardInfo.image} alt="Achievement" className="card-image" />
      </div>
      <div className="certificate-detail-div">
        <h5 className="card-title">{cardInfo.title}</h5>
        <p className="card-subtitle">{cardInfo.description}</p>
      </div>
      <div className="certificate-card-footer">
        {cardInfo.footer.map((v, i) => {
          return (
            <p key={i} onClick={() => openUrlInNewTab(v.url)}>
              {v.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementCard;
