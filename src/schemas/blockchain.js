import shortform from "./shortform";

const blockchain = [
  ...shortform.filter((field) => field.fieldName !== "summary"),
  {
    label: "Status",
    fieldName: "status",
    type: "SelectField",
    options: [
      { text: "Currently reading", value: "currentlyReading" },
      { text: "Read", value: "read" },
      { text: "Reference", value: "reference" },
      { text: "Shelved", value: "shelved" },
      { text: "To read", value: "toRead" },
    ],
    required: false,
  },
];

export default blockchain;
