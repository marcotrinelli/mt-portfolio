import React from "react";
import "./LinkIcon.scss";


export default function LinkIcon({url, text}) {

    return (
        <a className="external" href={url} target="_blank">{text}</a>
    );
}
