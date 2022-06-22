const shortform = [
  {
    fieldName: "title",
    label: "Title",
    type: "TextField",
    rows: 3,
    required: true,
  },
  {
    fieldName: "author",
    label: "Author",
    type: "TextField",
  },
  { fieldName: "date", label: "Date", type: "DateField" },
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
      },
      {
        label: "Work",
        fieldName: "work",
        type: "TextField",
        sx: { flexGrow: 1, mr: "16px" },
      },
      {
        label: "Italicize?",
        fieldName: "workItalics",
        type: "BooleanField",
        default: true,
        sx: { mr: 0 },
      },
    ],
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
      },
      {
        label: "Parenthetical",
        fieldName: "parenthetical",
        type: "TextField",
      },
    ],
  },
  {
    label: "URL",
    fieldName: "href",
    type: "TextField",
    rows: 2,
    required: true,
  },
  {
    label: "Tags",
    fieldName: "tags",
    type: "TextField",
    rows: 2,
    // TODO
  },
  {
    label: "Summary",
    fieldName: "summary",
    type: "TextField",
    rows: 3,
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
      },
      {
        label: "Completed",
        fieldName: "completed",
        type: "DateField",
        sx: { flexGrow: 1 },
      },
    ],
  },
  {
    label: "Entry added",
    fieldName: "entryAdded",
    type: "DateTimeField",
    required: true,
  },
];

export default shortform;
