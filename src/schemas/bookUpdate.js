import { isValidDate } from "./validate";

const book = [
  {
    fieldName: "_id",
    label: "ID",
    type: "TextField",
    required: true,
    readOnly: true
  },
  {
    fieldName: "title",
    label: "Title",
    type: "TextField",
    rows: 2,
    required: true,
    readOnly: true
  },
  {
    fieldName: "subtitle",
    label: "Subtitle",
    type: "TextField",
    importance: "secondary",
    readOnly: true
  },
  {
    fieldName: "author",
    label: "Author",
    type: "TextField",
    required: true,
    readOnly: true
  },
  {
    fieldName: "startEndGroup",
    type: "group",
    fields: [
      {
        label: "Started",
        fieldName: "started",
        type: "DateField",
        validate: isValidDate,
        required: true,
        sx: { mr: "16px", maxWidth: "100px" },
        readOnly: true
      },
      {
        label: "Completed",
        fieldName: "completed",
        type: "DateField",
        validate: isValidDate,
        sx: { mr: "16px", maxWidth: "100px" }
      },
      {
        label: "Status",
        fieldName: "status",
        type: "SelectField",
        options: [
          { value: "read", text: "Read" },
          { value: "currentlyReading", text: "Currently reading" },
          { value: "dnf", text: "Did not finish" },
          { value: "reference", text: "Reference" }
        ],
        sx: { flexGrow: 1 },
        default: "currentlyReading",
        required: true
      }
    ]
  },
  {
    label: "Post to feed?",
    fieldName: "postToFeed",
    type: "BooleanField",
    default: true,
    sx: { mr: 0 }
  }
];

export default book;
