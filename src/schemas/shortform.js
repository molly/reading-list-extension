import { isValidDate, isValidIsoDateTime } from "./validate";

const shortform = [
  {
    fieldName: "title",
    label: "Title",
    type: "TextField",
    rows: 2,
    required: true
  },
  {
    fieldName: "author",
    label: "Author",
    type: "TextField"
  },
  {
    fieldName: "date",
    label: "Date",
    type: "DateField",
    required: true,
    default: "",
    validate: isValidDate
  },
  {
    fieldName: "workGroup",
    type: "group",
    fields: [
      {
        label: "Preposition",
        fieldName: "preposition",
        type: "TextField",
        default: "in",
        sx: { maxWidth: "100px", mr: "16px" },
        importance: "secondary"
      },
      {
        label: "Work",
        fieldName: "work",
        type: "TextField",
        sx: { flexGrow: 1, mr: "16px" }
      },
      {
        label: "Italicize?",
        fieldName: "workItalics",
        type: "BooleanField",
        default: true,
        sx: { mr: 0 }
      }
    ]
  },
  {
    fieldName: "publisherGroup",
    type: "group",
    fields: [
      {
        label: "Publisher",
        fieldName: "publisher",
        type: "TextField",
        sx: { flexGrow: 1, mr: "16px" },
        importance: "secondary"
      },
      {
        label: "Parenthetical",
        fieldName: "parenthetical",
        type: "TextField",
        importance: "secondary"
      }
    ]
  },
  {
    label: "URL",
    fieldName: "href",
    type: "TextField",
    rows: 2,
    required: true
  },
  {
    label: "Tags",
    fieldName: "tags",
    type: "FreeSelectField",
    options: null, // Filled dynamically
    multi: true
  },
  {
    label: "Summary",
    fieldName: "summary",
    type: "TextField",
    importance: "secondary",
    rows: 3
  },
  // TODO
  // relatedReading: {
  //   type: 'array'
  // }
  {
    fieldName: "datesGroup",
    type: "group",
    fields: [
      {
        label: "Started",
        fieldName: "started",
        type: "DateField",
        required: true,
        sx: { flexGrow: 1, mr: "10px" },
        validate: isValidDate
      },
      {
        label: "Completed",
        fieldName: "completed",
        type: "DateField",
        importance: "secondary",
        sx: { flexGrow: 1 },
        validate: isValidDate
      }
    ]
  },
  {
    label: "Entry added",
    fieldName: "entryAdded",
    type: "DateTimeField",
    required: true,
    validate: isValidIsoDateTime
  }
];

export default shortform;
