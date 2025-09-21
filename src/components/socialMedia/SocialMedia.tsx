import React from "react";
import "./SocialMedia.css";
import { socialMediaLinks } from "../../portfolio";
import styled from "styled-components";

const IconWrapper = styled.span<{ backgroundColor: string }>`
  i {
    background-color: ${(props) => props.backgroundColor};
  }
  &:hover i {
    background-color: ${({ theme }) => theme.text};
    transition: 0.3s ease-in;
  }
`;

const SocialMedia: React.FC = () => {
  return (
    <div className="social-media-div">
      {socialMediaLinks.map((media, index) => {
        return (
          <a
            key={index}
            href={media.link}
            className="icon-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWrapper backgroundColor={media.backgroundColor}>
              <i className={`fab ${media.fontAwesomeIcon}`}></i>
            </IconWrapper>
          </a>
        );
      })}
    </div>
  );
};

export default SocialMedia;
