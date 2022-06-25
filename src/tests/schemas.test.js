import { getDefault, createEmptyFormData, getFields } from "../schemas";
import { BASIC_SCHEMA, FIELDS } from "./schemas.data";
import moment from "moment";

it("gets the correct default value for a field", () => {
  expect(getDefault(FIELDS.title)).toEqual(""); // Required, no default
  expect(getDefault(FIELDS.author)).toEqual(null); // Not required, no default
  expect(getDefault(FIELDS.workItalics)).toEqual(true); // Default value
  expect(getDefault(FIELDS.date)).toEqual(moment().format("YYYY-MM-DD")); // Required, no default
});

it("creates the expected empty form data from a schema", () => {
  expect(createEmptyFormData(BASIC_SCHEMA)).toEqual({
    title: "",
    started: moment().format("YYYY-MM-DD"),
  });
});

it("gets all fields for a schema", () => {
  expect(getFields(BASIC_SCHEMA)).toEqual([
    "title",
    "author",
    "started",
    "completed",
  ]);
});
