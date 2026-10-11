import React from "react";
import { Helmet } from "react-helmet";
import { seo } from "../../portfolio";

interface SeoHeaderProps {
  pageTitle?: string;
}

const SeoHeader: React.FC<SeoHeaderProps> = ({ pageTitle }) => {
  const title = pageTitle ? `${pageTitle} | Marco Trinelli` : seo.title;

  // defer={false} sets the title synchronously, before the GA4 pageview effect reads it
  return (
    <Helmet defer={false}>
      <title>{title}</title>
      <meta name="description" content={seo.description} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content={seo.og.type} />
      <meta property="og:url" content={seo.og.url} />
    </Helmet>
  );
};

export default SeoHeader;
