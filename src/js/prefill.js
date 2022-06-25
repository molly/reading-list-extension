export const getPrefillData = async (collection, formData) => {
  const [tabDetails] = await chrome.tabs.query({ active: true });
  const prefillData = { href: tabDetails.url };
  if (!tabDetails || !tabDetails.id) {
    return { ...formData, ...prefillData };
  }
  try {
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tabDetails.id },
      files: ["build/scripts/scrape.js"],
    });
    return { ...formData, ...prefillData, ...result };
  } catch (err) {
    return { ...formData, ...prefillData };
  }
};
