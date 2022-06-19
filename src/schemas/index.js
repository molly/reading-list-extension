import moment from "moment";
import { shortform } from "./shortform";

export const schemas = {
  shortform,
};

const createEmptyFormData = (schema) => {
  const data = {};
  for (let field of schema) {
    if (field.default) {
      data[field.fieldName] = field.default;
    } else if (field.required) {
      if (field.type === "date") {
        data[field.fieldName] = moment().format("YYYY-MM-DD");
      } else if (field.type === "datetime") {
        data[field.fieldName] = moment().toISOString();
      } else if (data.type === "boolean") {
        data[field.fieldName] = true;
      } else {
        data[field.fieldName] = "";
      }
    }
  }
  return data;
};

export const emptyFormData = ["shortform"].reduce((acc, collection) => {
  acc[collection] = createEmptyFormData(schemas[collection]);
  return acc;
}, {});
