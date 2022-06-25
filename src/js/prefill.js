export const getPrefillData = async (collection, formData) => {
  const [tabDetails] = await chrome.tabs.query({ active: true });
  const prefillData = { href: tabDetails.url };
  if (!tabDetails || !tabDetails.id) {
    return { ...formData, ...prefillData };
  }
  try {
    const tmp = await chrome.scripting.executeScript({
      target: { tabId: tabDetails.id },
      files: ["build/scripts/scrape.js"],
    });
    console.log(tmp);
    const result = tmp[0].result;
    console.log(result);

    return { ...formData, ...prefillData, ...result };
  } catch (err) {
    return { ...formData, ...prefillData };
  }
};
