export const copy = (data) => JSON.parse(JSON.stringify(data));

export const isIsoDate = (str) =>
  !!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}(Z|[+-]\d{2}:\d{2})/.test(str);
