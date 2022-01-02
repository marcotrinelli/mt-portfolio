import React from "react";
import "./LinkIcon.scss";


export default function LinkIcon({url, text, style}) {

    return (
        <a className="fas fa-external-link-alt linkicon" style={style} href={url} target="_blank">{text}</a>
    );
}
