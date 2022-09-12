export const isValidDate = (value) =>
  /^(\d{4}(-\d{2}(-\d{2})?)?)$/m.test(value);

export const isValidIsoDateTime = (str) =>
  /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}(Z|[+-]\d{2}:\d{2})?/.test(str);

export const makeFieldValidator = (fieldSchema) => (value) => {
  if (value !== null && value !== undefined && value !== "") {
    if ("validate" in fieldSchema) {
      return fieldSchema.validate(value);
    }
  } else {
    return !fieldSchema.required;
  }
  return true;
};

export const validate = (formData, schema) => {
  if (!formData) {
    return false;
  }
  for (const field of schema) {
    if (field.type === "group" && !validate(formData, field.fields)) {
      return false;
    } else if (!makeFieldValidator(field)(formData[field.fieldName])) {
      return false;
    }
  }
  return true;
};
