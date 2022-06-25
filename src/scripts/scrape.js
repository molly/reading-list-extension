export const normalizeString = (str) => {
  if (typeof str === "string") {
    return str.replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
  }
  return str;
};

export const humanizeList = (list) => {
  if (!Array.isArray(list) || list.length === 0) {
    return "";
  } else if (list.length === 1) {
    return list[0];
  } else if (list.length === 2) {
    return `${list[0]} and ${list[1]}`;
  } else {
    return `${list.slice(0, -1).join(", ")}, and ${list[list.length - 1]}`;
  }
};

export const getDataFromSchema = (schema) => {
  const results = {};

  // Title
  if ("headline" in schema) {
    results.title = normalizeString(schema.headline);
  }

  // Authors
  if ("author" in schema) {
    let authors = [];
    for (let author of schema.author) {
      if ("name" in author) {
        authors.push(normalizeString(author.name));
      }
    }
    results.author = humanizeList(authors);
  }

  // Work
  if ("publisher" in schema && "name" in schema.publisher) {
    results.work = normalizeString(schema.publisher.name);
  } else if ("isPartOf" in schema && "name" in schema.isPartOf) {
    results.work = normalizeString(schema.isPartOf.name);
  }
  return results;
};

const getSchema = () => {
  const schemaNode = document.evaluate(
    "//script[contains(text(),'http://schema.org')]",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
  return JSON.parse(schemaNode.innerHTML);
};

const scrapePage = () => {
  let results = {};
  try {
    const schema = getSchema();
    if (schema) {
      results = { ...getDataFromSchema(schema) };
    }
  } catch (err) {
    // Continue to fallback methods
  }
  return results;
  // const scrapedData = {};
  // const shareTitleTags = document.querySelector(
  //   'meta[property="og:title"], meta[property="twitter:title"], meta[name="twitter:title"]'
  // );
  // if (shareTitleTags) {
  //   scrapedData.title = normalize(shareTitleTags.getAttribute("content"));
  // }
  // return scrapedData;
};

scrapePage();
