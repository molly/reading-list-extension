const normalizeString = (str) => {
  if (typeof str === "string") {
    return str.replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
  }
  return str;
};

const humanizeList = (list) => {
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

const getDateFromIsoString = (isoString) => {
  if (typeof isoString === "string") {
    const match = isoString.match(/^(\d{4}-\d{2}-\d{2})/);
    if (match && match.length) {
      return match[0];
    }
  }
  return null;
};

const getDataFromSchema = (schema) => {
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

  // Date
  if ("dateModified" in schema) {
    results.date = getDateFromIsoString(schema.dateModified);
  } else if ("datePublished" in schema) {
    results.date = getDateFromIsoString(schema.datePublished);
  }

  // Summary
  if ("description" in schema) {
    results.summary = normalizeString(schema.description);
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
    console.log(err);
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
