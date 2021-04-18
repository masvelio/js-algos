const title = "JavaScript Algorithms & Data Structures";
const titleTemplate = "%s | JS Algos";
const description =
  "Algorithms and data structures implemented in JavaScript with explanations and links to further readings";

const seoConfig = {
  title,
  titleTemplate,
  description,
  // canonical: "https://masvel.io",
  openGraph: {
    type: "website",
    locale: "en_GB",
    // url: "https://masvel.io",
    title,
    description,
  },
  twitter: {
    // handle: "@masvelio",
    // site: "@masvelio",
    cardType: "summary_large_image",
  },
};

export default seoConfig;
