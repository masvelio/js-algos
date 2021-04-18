/* eslint-disable @typescript-eslint/camelcase */
const pageview = (url: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  window.gtag("config", process.env.NEXT_PUBLIC_GA_TRACKING_ID, {
    page_path: url,
    page_title: url,
    page_location: url,
  });
};

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const event = ({ action, category, label, value }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export default {
  pageview,
  event,
};
