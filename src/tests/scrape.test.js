import {
  normalizeString,
  humanizeList,
  getDateFromIsoString,
  getDataFromSchema,
} from "../scripts/scrape";
import { BASIC_SCHEMA } from "./scrape.data";

it("normalizes strings with curly quotes", () => {
  expect(normalizeString("this has ‘single quotes’")).toEqual(
    "this has 'single quotes'"
  );
  expect(normalizeString("this has “double quotes”")).toEqual(
    'this has "double quotes"'
  );
});

it("normalize doesn't explode on unexpected input", () => {
  expect(normalizeString("")).toEqual("");
  expect(normalizeString(42)).toEqual(42);
  expect(normalizeString(["hi"])).toEqual(["hi"]);

  // No fancy behavior like normalizing strings within arrays
  expect(normalizeString(["it‘s"])).toEqual(["it‘s"]);
});

it("humanizes lists of various lengths", () => {
  expect(humanizeList(["foo"])).toEqual("foo");
  expect(humanizeList(["foo", "bar"])).toEqual("foo and bar");
  expect(humanizeList(["foo", "bar", "baz"])).toEqual("foo, bar, and baz");
});

it("humanize doesn't explode on unexpected input", () => {
  expect(humanizeList([])).toEqual("");
  expect(humanizeList(null)).toEqual("");
  expect(humanizeList(15)).toEqual("");
});

it("parses dates and datetimes into dates", () => {
  expect(getDateFromIsoString("2022-06-25T18:24:06+0000")).toEqual(
    "2022-06-25"
  );
  expect(getDateFromIsoString("2022-06-25")).toEqual("2022-06-25");
  expect(getDateFromIsoString(null)).toEqual(null);
  expect(getDateFromIsoString("foo")).toEqual(null);
});

it("produces expected output from basic schema", () => {
  const results = getDataFromSchema(BASIC_SCHEMA);
  expect(results.title).toEqual(
    "Crypto's frozen mystery: The fate of billions in Celsius deposits"
  );
  expect(results.author).toEqual("Steven Zeitchik and Rachel Lerman");
  expect(results.work).toEqual("The Washington Post");
  expect(results.date).toEqual("2022-06-21");
  expect(results.summary).toEqual(
    "A disruptive company with a charismatic leader threw a lot of wealth into uncertainty — and vividly demonstrates the end of the crypto party."
  );
});
