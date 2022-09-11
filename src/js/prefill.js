import client from "../api/client";
import { FIELDS } from "../schemas";

export const getPrefillData = async () => {
  const [tabDetails] = await chrome.tabs.query({ active: true });
  let prefillData = { href: tabDetails.url };
  if (!tabDetails || !tabDetails.id) {
    return prefillData;
  }
  try {
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tabDetails.id },
      files: ["build/scrape.js"],
    });

    if (result) {
      prefillData = { ...prefillData, ...result };
    }
  } catch (err) {
    console.log(err);
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
  try {
    const response = await client.get("/tags");
    return response.data;
  } catch (err) {
    return [];
  }
};
