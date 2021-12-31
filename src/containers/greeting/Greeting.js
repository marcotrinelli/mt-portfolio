import React from "react";
import "./Greeting.scss";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import { greeting } from "../../portfolio";
import { Fade } from "react-awesome-reveal";
import profilePic from "../../assets/images/marcoProfile.png";
import Typewriter from 'typewriter-effect';
import { useTheme } from 'styled-components'

export default function Greeting() {
    const theme = useTheme();
    return (
        <Fade bottom duration={2000} distance="40px">
            <div className="greet-main" id="greeting">
                <div className="greeting-main">
                    <div className="greeting-text-div">
                        <div>
                            <h1 className="greeting-text" style={{ color: theme.primary }}>
                                {" "}
                                {/* {greeting.title}{" "} */}
                                <Typewriter
                                    onInit={(typewriter) => {
                                        typewriter
                                            .changeDelay(75)
                                            .typeString("Hi! ")
                                            .pauseFor(300)
                                            .typeString("I'm Marco :)")
                                            .callFunction((state) => {
                                                // turn off animation
                                                state.elements.cursor.style.animation = 'none'
                                                // hide cursor
                                                state.elements.cursor.style.display = 'none'
                                            })
                                            .start()
                                    }}
                                />
                            </h1>
                            <p
                                className="greeting-text-p"
                                style={{ color: theme.secondaryText }}
                            >
                                {greeting.subTitle}
                            </p>
                            <img
                                alt="marco-profile"
                                src={profilePic}
                                className="profile-image"
                                style={{
                                    border: `0.5rem solid ${theme.text}`,
                                }}
                            />
                            <SocialMedia theme={theme} />
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    );
}
