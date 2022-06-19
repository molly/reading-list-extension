export const copy = (data) => JSON.parse(JSON.stringify(data));

// https://stackoverflow.com/questions/52869695/check-if-a-date-string-is-in-iso-and-utc-format
export const isIsoDate = (str) => {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  var d = new Date(str);
  return d.toISOString() === str;
};
