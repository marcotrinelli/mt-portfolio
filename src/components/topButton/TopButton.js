import React, {useEffect} from "react";
import "./TopButton.css";
import { useTheme } from 'styled-components'

export default function TopButton() {
    const theme = useTheme();

    // to refresh colors after changing theme
    useEffect(() => {
        onMouseLeave(theme.body, theme.text);
    }, [theme])

    function GoUpEvent() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        onMouseLeave(theme.body, theme.text);
    }

    function scrollFunction() {
        if (
            document.body.scrollTop > 30 ||
            document.documentElement.scrollTop > 30
        ) {
            document.getElementById("topButton").style.visibility = "visible";
        } else {
            document.getElementById("topButton").style.visibility = "hidden";
        }
    }

    window.onscroll = function () {
        scrollFunction();
    };

    const onMouseEnter = (color, bgColor) => {
        /* For the button */
        const topButton = document.getElementById("topButton");
        topButton.style.color = color;
        topButton.style.backgroundColor = bgColor;

        /* For arrow icon */
        const arrow = document.getElementById("arrow");
        arrow.style.color = color;
        arrow.style.backgroundColor = bgColor;
    };

    const onMouseLeave = (color, bgColor) => {
        /* For the button */
        const topButton = document.getElementById("topButton");
        topButton.style.color = color;
        topButton.style.backgroundColor = bgColor;

        /* For arrow icon */
        const arrow = document.getElementById("arrow");
        arrow.style.color = color;
        arrow.style.backgroundColor = bgColor;
    };

    return (
        <div
            onClick={GoUpEvent}
            id="topButton"
            style={{
                color: theme.body,
                backgroundColor: theme.text,
                border: `solid 1px ${theme.text}`,
            }}
            title="Go up"
            onMouseEnter={() => onMouseEnter(theme.text, theme.body)}
            onMouseLeave={() => onMouseLeave(theme.body, theme.text)}
        >
            <i className="fas fa-arrow-up" id="arrow" aria-hidden="true" />
        </div>
    );
}
