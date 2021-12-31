import React from "react";
import "./Footer.scss";
import { Fade } from "react-awesome-reveal";
/* eslint-disable jsx-a11y/accessible-emoji */
import { useTheme } from 'styled-components'

export default function Footer() {
    const theme = useTheme();
    return (
        <>
            <div style={{paddingTop: "100px"}}/>
            <div className="footer-div">
                <Fade>
                    <p className="footer-text" style={{ color: theme.text }}>
                        © {new Date().getFullYear()} Marco Trinelli
                    </p>
                </Fade>
            </div>
        </>
    );
}
