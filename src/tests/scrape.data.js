export const BASIC_SCHEMA = {
  "@context": "http://schema.org",
  "@type": "NewsArticle",
  headline: "Crypto’s frozen mystery: The fate of billions in Celsius deposits",
  dateModified: "2022-06-21T16:53:36.021Z",
  datePublished: "2022-06-21T11:00:00.102Z",
  description:
    "A disruptive company with a charismatic leader threw a lot of wealth into uncertainty — and vividly demonstrates the end of the crypto party.",
  author: [
    {
      "@type": "Person",
      name: "Steven Zeitchik",
      url: "https://www.washingtonpost.com/people/steven-zeitchik/",
    },
    {
      "@type": "Person",
      name: "Rachel Lerman",
      url: "https://www.washingtonpost.com/people/rachel-lerman/",
    },
  ],
  isPartOf: {
    "@type": ["CreativeWork", "Product"],
    name: "The Washington Post",
    productID: "washingtonpost.com:basic",
    description:
      "Breaking news and analysis on politics, business, world, national news, entertainment and more. In-depth DC, Virginia, Maryland news coverage including traffic, weather, crime, education, restaurant reviews and more.",
    sku: "https://subscribe.washingtonpost.com",
    image:
      "https://www.washingtonpost.com/resizer/2CjPNwqvXHPS_2RpuRTKY-p3eVo=/1484x0/www.washingtonpost.com/pb/resources/img/twp-social-share.png",
    brand: {
      "@type": "brand",
      name: "The Washington Post",
    },
    offers: {
      "@type": "offer",
      url: "https://subscribe.washingtonpost.com/acquisition?promo=o26",
    },
  },
  publisher: {
    "@id": "washingtonpost.com",
    "@type": "NewsMediaOrganization",
    name: "The Washington Post",
    logo: {
      "@type": "ImageObject",
      url: "https://www.washingtonpost.com/wp-stat/img/wplogo_344x60_blk.png",
      width: 344,
      height: 60,
    },
  },
};
