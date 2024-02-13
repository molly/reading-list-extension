import client from "../api/client";
import { FIELDS } from "../schemas";

function getSelection() {
  return window.getSelection().toString();
}

export const getPrefillData = async () => {
  const [tabDetails] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  });
  if (!tabDetails || !tabDetails.id) {
    return {};
  }
  const selectionResult = await chrome.scripting.executeScript({
    target: { tabId: tabDetails.id },
    func: getSelection
  });
  let selection;
  if (selectionResult && selectionResult.length && selectionResult[0].result) {
    selection = selectionResult[0].result;
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
    if (selection) {
      prefillData = { ...prefillData, summary: selection };
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
