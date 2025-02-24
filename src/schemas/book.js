import { isValidDate, isValidInt } from "./validate";

const book = [
  {
    fieldName: "title",
    label: "Title",
    type: "TextField",
    rows: 2,
    required: true
  },
  {
    fieldName: "subtitle",
    label: "Subtitle",
    type: "TextField",
    importance: "secondary"
  },
  {
    fieldName: "author",
    label: "Author",
    type: "TextField",
    required: true
  },
  {
    fieldName: "editor",
    label: "Editor",
    type: "TextField",
    importance: "secondary"
  },
  {
    fieldName: "imageSrc",
    label: "Cover image",
    type: "TextField",
    importance: "secondary"
  },
  {
    fieldName: "href",
    label: "Link",
    type: "TextField",
    importance: "secondary"
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
        fieldName: "date",
        label: "Date",
        type: "DateField",
        default: "",
        required: true,
        validate: isValidDate
      }
    ]
  },
  {
    fieldName: "seriesGroup",
    type: "group",
    fields: [
      {
        label: "Series",
        fieldName: "series",
        type: "TextField",
        sx: { flexGrow: 1, mr: "16px" },
        importance: "secondary"
      },
      {
        label: "#",
        fieldName: "seriesNumber",
        type: "IntField",
        importance: "secondary",
        sx: { maxWidth: "60px" },
        validate: isValidInt
      }
    ]
  },
  {
    fieldName: "detailsGroup",
    type: "group",
    fields: [
      {
        label: "Fiction",
        fieldName: "fiction",
        type: "BooleanField",
        sx: { mr: "16px" },
        default: true
      },
      {
        label: "Border",
        fieldName: "border",
        type: "BooleanField",
        sx: { mr: "16px" },
        default: false
      },
      {
        label: "Pages",
        fieldName: "pages",
        type: "IntField",
        importance: "secondary",
        sx: { flexGrow: 1 },
        validate: isValidInt
      }
    ]
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
        sx: { mr: "16px", maxWidth: "100px" }
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
    label: "Tags",
    fieldName: "tags",
    type: "FreeSelectField",
    options: null, // Filled dynamically
    multi: true
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
