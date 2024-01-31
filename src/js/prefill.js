import client from "../api/client";
import { FIELDS } from "../schemas";

export const getPrefillData = async () => {
  const [tabDetails] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  });
  if (!tabDetails || !tabDetails.id) {
    return {};
  }
  let prefillData = { href: tabDetails.url };
  try {
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tabDetails.id },
      files: ["build/scrape.js"]
    });

    if (result) {
      prefillData = { ...prefillData, ...result };
    }
  } catch (err) {
    console.error(err);
    return prefillData;
  }
  return prefillData;
};

export const filterPrefillData = (prefillData, collection) => {
  return FIELDS[collection].reduce((acc, field) => {
    if (field in prefillData) {
      acc[field] = prefillData[field];
    }
    return acc;
  }, {});
};

export const getTags = async () => {
  let tags = { blockchain: [], press: [], shortform: [] };
  try {
    if (!tags.length) {
      const response = await client.get("/tags");
      tags = response.data;
    }
  } catch (err) {
    // Return anyway
  }
  return tags;
};
