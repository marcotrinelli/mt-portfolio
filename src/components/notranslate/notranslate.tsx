import React from "react";

interface NoTranslateProps {
  children: React.ReactNode;
}

const NoTranslate: React.FC<NoTranslateProps> = ({ children }) => {
  return <span className="notranslate">{children}</span>;
};

export default NoTranslate;
