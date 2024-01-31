import {
  isValidDate,
  isValidIsoDateTime,
  makeFieldValidator,
  validate,
} from "../schemas/validate";

it("validates a date with makeDateValidator", () => {
  expect(isValidDate("2022-asdf")).toEqual(false);
  expect(isValidDate("2022")).toEqual(true);
  expect(isValidDate("2022-02")).toEqual(true);
  expect(isValidDate("2022-02-02")).toEqual(true);
  expect(isValidDate("2022-09-11T15:24:09.496")).toEqual(false); // only dates, no DateTimes
});

it("validates a date with isValidIsoDateTime", () => {
  expect(isValidIsoDateTime("2022-09-10T18:36:09.444Z")).toEqual(true); // Z format
  expect(isValidIsoDateTime("2022-09-11T15:24:09.496-04:00")).toEqual(true); // offset format
  expect(isValidIsoDateTime("2022-09-11T15:24:09.496")).toEqual(true); // timezone not required
  expect(isValidIsoDateTime("2022-09-11")).toEqual(false); // only DateTimes are valid
});

it("makes validator based on schema", () => {
  // Value required, needs to validate as a date
  const requiredDateValidator = makeFieldValidator({
    required: true,
    validate: isValidDate,
  });
  expect(requiredDateValidator(null)).toEqual(false);
  expect(requiredDateValidator("2022-02-02")).toEqual(true);
  expect(requiredDateValidator("not a date")).toEqual(false);

  // Value optional, if specified it needs to validate as a date
  const optionalDateValidator = makeFieldValidator({
    required: false,
    validate: isValidDate,
  });
  expect(optionalDateValidator(null)).toEqual(true);
  expect(optionalDateValidator("2022-02-02")).toEqual(true);
  expect(optionalDateValidator("not a date")).toEqual(false);

  // Value can be anything (except empty strings), just needs to exist
  const requiredFieldValidator = makeFieldValidator({ required: true });
  expect(requiredFieldValidator(null)).toEqual(false);
  expect(requiredFieldValidator(undefined)).toEqual(false);
  expect(requiredFieldValidator("")).toEqual(false);
  expect(requiredFieldValidator(false)).toEqual(true); // Falsy is fine, just checking that something's there
  expect(requiredFieldValidator("hello")).toEqual(true);
  expect(requiredFieldValidator(5)).toEqual(true);

  // Any value or no value will validate
  const anythingFieldValidator = makeFieldValidator({});
  expect(anythingFieldValidator(null)).toEqual(true);
  expect(anythingFieldValidator(undefined)).toEqual(true);
  expect(anythingFieldValidator(false)).toEqual(true);
  expect(anythingFieldValidator("hi")).toEqual(true);
});

it("validates formData against provided basic schema", () => {
  const basicSchema = [
    {
      fieldName: "title",
      label: "Title",
      type: "TextField",
      rows: 2,
      required: true,
    },
    {
      fieldName: "author",
      label: "Author",
      type: "TextField",
      required: false,
    },
    {
      fieldName: "date",
      label: "Date",
      type: "DateField",
      required: true,
      default: "",
      validate: isValidDate,
    },
  ];

  expect(
    validate({ title: "Some title", date: "2022-05-01" }, basicSchema),
  ).toEqual(true);
  expect(
    validate(
      { title: "Some title", author: "Hemingway", date: "2022-05-01" },
      basicSchema,
    ),
  ).toEqual(true);

  // Missing required field
  expect(validate({ date: "2022-05-01" }, basicSchema)).toEqual(false);
  expect(validate({ title: "Some title" }, basicSchema)).toEqual(false);

  // Field that doesn't validate
  expect(
    validate({ title: "Some title", date: "not a date" }, basicSchema),
  ).toEqual(false);
});

it("validates formData against provided nested schema", () => {
  const nestedSchema = [
    {
      fieldName: "title",
      label: "Title",
      type: "TextField",
      rows: 2,
      required: true,
    },
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
          validate: isValidDate,
        },
        {
          label: "Completed",
          fieldName: "completed",
          type: "DateField",
          importance: "secondary",
          sx: { flexGrow: 1 },
          validate: isValidDate,
        },
      ],
    },
  ];

  expect(
    validate({ title: "Some title", started: "2022-05-01" }, nestedSchema),
  ).toEqual(true);
  expect(
    validate(
      { title: "Some title", started: "2022-05-01", completed: "2022-05-02" },
      nestedSchema,
    ),
  ).toEqual(true);

  // Missing required field
  expect(validate({ started: "2022-05-01" }, nestedSchema)).toEqual(false);
  expect(validate({ title: "Some title" }, nestedSchema)).toEqual(false);

  // Field that doesn't validate
  expect(
    validate({ title: "Some title", started: "not a date" }, nestedSchema),
  ).toEqual(false);
});
