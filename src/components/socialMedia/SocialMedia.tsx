import React from "react";
import "./SocialMedia.css";
import { socialMediaLinks } from "../../portfolio";
import ReactGA from "react-ga4";

const SocialMedia: React.FC = () => (
  <ul className="social-media">
    {socialMediaLinks.map((media) => {
      const Icon = media.icon;
      return (
        <li key={media.name}>
          <a
            href={media.link}
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={media.name}
            title={media.name}
            onClick={() =>
              ReactGA.event("social_click", {
                social_network: media.name,
                link_url: media.link,
              })
            }
          >
            <Icon aria-hidden />
          </a>
        </li>
      );
    })}
  </ul>
);

export default SocialMedia;
