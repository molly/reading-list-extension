(function () {
  const normalizeString = (str, options = {}) => {
    let newStr = str;
    if (typeof str === "string") {
      newStr = newStr.replace(/[‘’]/g, "'").replace(/[“”]/g, '"');

      if (options.titlecase) {
        newStr = newStr
          .toLocaleLowerCase()
          .split(" ")
          .map((word) => {
            if (word.length > 0) {
              return word[0].toUpperCase() + word.slice(1);
            }
            return word;
          })
          .join(" ");
      }
    }
    return newStr;
  };

  const hasLowercaseCharacters = (str) =>
    str.split("").some((char) => char === char.toLocaleLowerCase());

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
      results.title = normalizeString(schema.headline, {
        titlecase: !hasLowercaseCharacters(schema.headline),
      });
    }

    // Authors
    if ("author" in schema) {
      let authors = [];
      for (let author of schema.author) {
        if ("name" in author) {
          authors.push(
            normalizeString(author.name, {
              titlecase: !hasLowercaseCharacters(author.name),
            })
          );
        }
      }
      results.author = humanizeList(authors);
    }

    // Work
    if ("publisher" in schema && "name" in schema.publisher) {
      results.work = normalizeString(schema.publisher.name, {
        titlecase: !hasLowercaseCharacters(schema.publisher),
      });
    } else if ("isPartOf" in schema && "name" in schema.isPartOf) {
      results.work = normalizeString(schema.isPartOf.name, {
        titlecase: !hasLowercaseCharacters(schema.isPartOf.name),
      });
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
      // Malformed JSON, fall back to other scraping methods
    }

    if (!("title" in results)) {
      const titleTag = document.querySelector(
        'meta[property="og:title"], meta[property="twitter:title"], meta[name="twitter:title"]'
      );
      if (titleTag) {
        const title = titleTag.getAttribute("content");
        results.title = normalizeString(title, {
          titlecase: !hasLowercaseCharacters(title),
        });
      }
    }

    if (!("author" in results)) {
      const authorTag = document.querySelector('meta[name="author"]');
      if (authorTag) {
        const author = authorTag.getAttribute("content");
        results.author = normalizeString(author, {
          titlecase: !hasLowercaseCharacters(author),
        });
      }
    }

    if (!("work" in results)) {
      const publisherTag = document.querySelector(
        'meta[property="og:site_name"]'
      );
      if (publisherTag) {
        const publisher = publisherTag.getAttribute("content");
        results.work = normalizeString(publisher, {
          titlecase: !hasLowercaseCharacters(publisher),
        });
      }
    }

    if (!("date" in results)) {
      const dateTag = document.querySelector(
        'meta[name="article.updated"], meta[itemProp="dateModified"], meta[name="article.published"], meta[itemProp="datePublished"], meta[itemProp="dateLastPubbed"]'
      );
      if (dateTag) {
        results.date = getDateFromIsoString(dateTag.getAttribute("content"));
      }
    }

    if (!("summary" in results)) {
      const summaryTag = document.querySelector(
        'meta[name="article.summary"], meta[property="og:description"], meta[name="twitter:description"]'
      );
      if (summaryTag) {
        results.summary = normalizeString(summaryTag.getAttribute("content"));
      }
    }

    if (
      document.documentElement.lang &&
      !document.documentElement.lang.toLowerCase().startsWith("en")
    ) {
      const languageNames = new Intl.DisplayNames(["en"], { type: "language" });
      results.parenthetical = `in ${languageNames.of(
        document.documentElement.lang.toUpperCase()
      )}`;
    }

    return results;
  };

  return scrapePage();
})();
