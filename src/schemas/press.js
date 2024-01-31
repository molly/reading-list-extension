import shortform from "./shortform";

let press = [
  ...shortform.filter(
    (field) =>
      !["summary", "datesGroup", "relatedReading", "entryAdded"].includes(
        field.fieldName,
      ),
  ),
];

export default press;
