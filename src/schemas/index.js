import moment from "moment";
import { shortform } from "./shortform";

export const schemas = {
  shortform,
};

const getDefault = (field) => {
  if ("default" in field) {
    return field.default;
  } else if (field.required) {
    if (field.type === "DateField") {
      return moment().format("YYYY-MM-DD");
    } else if (field.type === "DateTimeField") {
      return moment().toISOString();
    } else if (field.type === "BooleanField") {
      return true;
    } else {
      return "";
    }
  }
  return null;
};

const createEmptyFormData = (schema) => {
  const data = {};
  for (let field of schema) {
    if (field.type === "group") {
      for (const key of Object.keys(field.fields)) {
        const defaultValue = getDefault(field.fields[key]);
        if (defaultValue !== null) {
          data[field.fields[key].fieldName] = defaultValue;
        }
      }
    } else {
      const defaultValue = getDefault(field);
      if (defaultValue !== null) {
        data[field.fieldName] = defaultValue;
      }
    }
  }
  return data;
};

export const emptyFormData = ["shortform"].reduce((acc, collection) => {
  acc[collection] = createEmptyFormData(schemas[collection]);
  return acc;
}, {});
