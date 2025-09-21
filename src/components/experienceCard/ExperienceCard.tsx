import React, { useState, createRef } from "react";
import "./ExperienceCard.scss";
import ColorThief from "colorthief";
import { useTheme } from "styled-components";
import LinkIcon from "../linkIcon/LinkIcon";

interface DescBullet {
  desc: string;
  url?: string;
}

interface ExperienceCardInfo {
  role: string;
  company: string;
  location: string;
  companylogo: string;
  date: string;
  desc: string;
  descBullets: DescBullet[];
}

interface ExperienceCardProps {
  cardInfo: ExperienceCardInfo;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ cardInfo }) => {
  const [colorArrays, setColorArrays] = useState<number[]>([]);
  const theme = useTheme();
  const imgRef = createRef<HTMLImageElement>();

  function getColorArrays(): void {
    const colorThief = new ColorThief();
    if (imgRef.current) {
      setColorArrays(colorThief.getColor(imgRef.current));
    }
  }

  function rgb(values: number[] | undefined): string | null {
    return typeof values === "undefined"
      ? null
      : "rgb(" + values.join(", ") + ")";
  }

  return (
    <div className="experience-card">
      <div
        style={{ border: `1px solid ${rgb(colorArrays)}` }}
        className="experience-banner"
      >
        <div className="experience-blurred_div">
          <div className="experience-div-company">
            <h5
              className="experience-text-company"
              style={{ color: theme.text }}
            >
              {cardInfo.company}
            </h5>
            <img
              crossOrigin="anonymous"
              ref={imgRef}
              className="experience-roundedimg"
              src={cardInfo.companylogo}
              alt={cardInfo.company}
              onLoad={() => getColorArrays()}
            />
          </div>
          <div className="experience-div-role">
            <h5 className="experience-text-role" style={{ color: theme.text }}>
              {cardInfo.role}
            </h5>
            <h5 className="experience-text-date" style={{ color: theme.text }}>
              {cardInfo.date}
            </h5>
          </div>
          <div className="experience-div-desc">
            <p
              className="subTitle experience-text-desc"
              style={{ color: theme.text }}
            >
              {cardInfo.desc}
            </p>
            <ul>
              {cardInfo.descBullets.map((item, i) => (
                <li
                  key={i}
                  className="subTitle experience-text-bullets"
                  style={{ color: theme.text }}
                >
                  {item.url ? (
                    <LinkIcon url={item.url} text={item.desc} />
                  ) : (
                    item.desc
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
