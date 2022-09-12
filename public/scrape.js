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
    }
    return `${list.slice(0, -1).join(", ")}, and ${list[list.length - 1]}`;
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

  const getAuthor = (node) => {
    if (node.name) {
      return normalizeString(node.name, {
        titlecase: !hasLowercaseCharacters(node.name),
      });
    }
    return null;
  };

  const getDataFromSchema = (schema) => {
    try {
      const results = {};
      // Title
      if (schema.headline) {
        results.title = normalizeString(schema.headline, {
          titlecase: !hasLowercaseCharacters(schema.headline),
        });
      }

      // Authors
      if (schema.author) {
        if (Array.isArray(schema.author)) {
          const authors = schema.author
            .map((authorNode) => getAuthor(authorNode))
            .filter((el) => !!el);
          results.author = humanizeList(authors);
        } else {
          results.author = getAuthor(schema.author);
        }
      }

      // Work
      if (schema.publisher?.name) {
        results.work = normalizeString(schema.publisher.name, {
          titlecase: !hasLowercaseCharacters(schema.publisher.name),
        });
      } else if (schema.isPartOf?.name) {
        results.work = normalizeString(schema.isPartOf.name, {
          titlecase: !hasLowercaseCharacters(schema.isPartOf.name),
        });
      }

      // Date
      if (schema.dateModified) {
        results.date = getDateFromIsoString(schema.dateModified);
      } else if (schema.datePublished) {
        results.date = getDateFromIsoString(schema.datePublished);
      }

      // Summary
      if (schema.description) {
        results.summary = normalizeString(schema.description);
      }

      return results;
    } catch (err) {
      console.error(err);
    }
  };

  const getSchema = () => {
    const schemaNode = document.evaluate(
      "//script[contains(text(),'schema.org')]",
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;

    let schema = JSON.parse(schemaNode.innerHTML);
    if ("@graph" in schema) {
      schema = schema["@graph"];
    }
    if (Array.isArray(schema)) {
      if (schema.length === 1) {
        return schema[0];
      }
      for (const node of schema) {
        const nodeType = node["@type"]?.toLowerCase();
        if (nodeType === "article" || nodeType === "webpage") {
          return node;
        }
      }
    }
    return schema;
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
