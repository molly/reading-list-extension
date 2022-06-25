import { normalizeString, humanizeList } from "./scrape";

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
