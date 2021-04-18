import React from "react";
import { NextSeo, NextSeoProps } from "next-seo";

import seoConfig from "src/seoConfing";

export type SEOProps = Pick<NextSeoProps, "title" | "description">;

const SEO = ({ title, description }: SEOProps) => (
  <NextSeo
    title={title}
    description={description}
    openGraph={{ title, description }}
    titleTemplate={seoConfig.titleTemplate}
  />
);

export default SEO;
