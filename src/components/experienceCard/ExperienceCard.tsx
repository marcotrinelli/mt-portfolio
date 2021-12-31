import "./ExperienceCard.scss";
import { useTheme } from "styled-components";
import LinkIcon from "../linkIcon/LinkIcon";
import { Theme } from "@/theme/Themes";

interface ExperienceCardProps {
  cardInfo: {
    company: string;
    companylogo: string;
    role: string;
    date: string;
    desc: string;
    location: string;
    descBullets?: { desc: string; url?: string }[];
  };
}

export default function ExperienceCard({ cardInfo }: ExperienceCardProps) {
  const theme = useTheme();

  const GetDescBullets = ({
    descBullets,
    theme,
  }: {
    descBullets?: { desc: string; url?: string }[];
    theme: Theme;
  }) => {
    return descBullets
      ? descBullets.map((item, i) => (
          <li
            key={i}
            className={"subTitle experience-text-bullets"}
            style={{ color: theme.text }}
          >
            {item.desc}
            {item.url && (
              <LinkIcon
                key={item.url}
                url={item.url}
                style={{ color: theme.text }}
              />
            )}
          </li>
        ))
      : null;
  };

  return (
    <div
      className={"experience-card"}
      style={{
        backgroundColor: theme.paperbg,
        boxShadow: `0px 10px 30px -15px ${theme.boxShadowColor}`,
      }}
    >
      <div style={{ background: "white" }} className="experience-banner">
        <div className="experience-blurred_div"></div>
        <div className="experience-div-company">
          <img
            crossOrigin={"anonymous"}
            src={cardInfo.companylogo}
            alt={cardInfo.company}
          />
        </div>
      </div>
      <div className="experience-text-details">
        {/* <h5 className="experience-text-company" style={{ color: theme.text }}>{cardInfo.company} </h5> */}
        <h5 className={"experience-text-role"} style={{ color: theme.text }}>
          {cardInfo.role}
        </h5>
        <h5 className="experience-text-location" style={{ color: theme.text }}>
          {cardInfo.location}
        </h5>
        <h5 className={"experience-text-date"} style={{ color: theme.text }}>
          {cardInfo.date}
        </h5>
        <div
          className={"subTitle experience-text-desc"}
          style={{ color: theme.text }}
        >
          {cardInfo.desc.split(/\n/).map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        <ul>{GetDescBullets({ descBullets: cardInfo.descBullets, theme })}</ul>
      </div>
    </div>
  );
}
