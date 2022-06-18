const shortformSchema = {
  title: {
    type: "textarea",
    rows: 3,
    required: true,
  },
  author: {
    type: "textinput",
  },
  date: {
    type: "date",
  },
  work: {
    type: "string",
  },
  publisher: {
    type: "string",
  },
  workItalics: {
    type: "boolean",
    default: true,
  },
  preposition: {
    type: "textinput",
    default: "in",
  },
  parenthetical: {
    type: "textinput",
  },
  href: {
    type: "textarea",
    rows: 2,
    required: true,
  },
  tags: {
    type: "textarea",
    rows: 2,
    // TODO
  },
  summary: {
    type: "textarea",
    rows: 3,
  },
  // TODO
  // relatedReading: {
  //   type: 'array'
  // }
  started: {
    type: "date",
    required: true,
  },
  completed: {
    type: "date",
  },
  entryAdded: {
    type: "datetime",
  },
};
