import { DateTime } from "luxon";
import book from "./book";
import bookUpdate from "./bookUpdate";
import press from "./press";
import shortform from "./shortform";

export const SCHEMAS = {
  shortform,
  book,
  bookUpdate,
  press
};

const TYPES = ["shortform", "book", "bookUpdate", "press"];

export const getDefault = (field) => {
  if ("default" in field) {
    return field.default;
  } else if (field.required) {
    if (field.type === "DateField") {
      return DateTime.now().toISODate();
    } else if (field.type === "DateTimeField") {
      return DateTime.now().toISO();
    } else if (field.type === "BooleanField") {
      return true;
    } else {
      return "";
    }
  }
  return null;
};

export const createEmptyFormData = (schema) => {
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

export const EMPTY_FORM_DATA = TYPES.reduce((acc, collection) => {
  acc[collection] = createEmptyFormData(SCHEMAS[collection]);
  return acc;
}, {});

export const getFields = (schema) => {
  let fields = [];
  for (const field of schema) {
    if (field.type === "group") {
      fields = fields.concat(getFields(field.fields));
    } else {
      fields.push(field.fieldName);
    }
  }
  return fields;
};

export const FIELDS = TYPES.reduce((acc, collection) => {
  acc[collection] = getFields(SCHEMAS[collection]);
  return acc;
}, {});
