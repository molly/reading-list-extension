export const FIELDS = {
  title: {
    fieldName: "title",
    label: "Title",
    type: "TextField",
    rows: 3,
    required: true
  },
  author: {
    fieldName: "author",
    label: "Author",
    type: "TextField"
  },
  datesGroup: {
    fieldName: "datesGroup",
    type: "group",
    fields: [
      {
        label: "Started",
        fieldName: "started",
        type: "DateField",
        required: true,
        sx: { flexGrow: 1, mr: "10px" }
      },
      {
        label: "Completed",
        fieldName: "completed",
        type: "DateField",
        sx: { flexGrow: 1 }
      }
    ]
  },
  workItalics: {
    label: "Italicize?",
    fieldName: "workItalics",
    type: "BooleanField",
    default: true,
    sx: { mr: 0 }
  },
  date: { fieldName: "date", label: "Date", type: "DateField", required: true }
};

export const BASIC_SCHEMA = [FIELDS.title, FIELDS.author, FIELDS.datesGroup];
