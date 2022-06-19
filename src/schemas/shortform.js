export const shortform = [
  {
    fieldName: "title",
    label: "Title",
    type: "textarea",
    rows: 3,
    required: true,
  },
  {
    fieldName: "author",
    label: "Author",
    type: "textinput",
  },
  { fieldName: "date", label: "Date", type: "date" },
  {
    label: "Work",
    fieldName: "work",
    type: "textinput",
  },
  {
    label: "Italicize?",
    fieldName: "workItalics",
    type: "boolean",
    default: true,
  },
  {
    label: "Publisher",
    fieldName: "publisher",
    type: "textinput",
  },
  {
    label: "Preposition",
    fieldName: "preposition",
    type: "textinput",
    default: "in",
  },
  {
    label: "Parenthetical",
    fieldName: "parenthetical",
    type: "textinput",
  },
  {
    label: "URL",
    fieldName: "href",
    type: "textarea",
    rows: 2,
    required: true,
  },
  {
    label: "Tags",
    fieldName: "tags",
    type: "textarea",
    rows: 2,
    // TODO
  },
  {
    label: "Summary",
    fieldName: "summary",
    type: "textarea",
    rows: 3,
  },
  // TODO
  // relatedReading: {
  //   type: 'array'
  // }
  {
    label: "Started",
    fieldName: "started",
    type: "date",
    required: true,
  },
  {
    label: "Completed",
    fieldName: "completed",
    type: "date",
  },
  {
    label: "Entry added",
    fieldName: "entryAdded",
    type: "datetime",
    required: true,
  },
];

const schemas = {
  shortform,
};

export default schemas;
