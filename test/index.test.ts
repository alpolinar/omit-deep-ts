import { describe, expect, it } from "vitest";
import { omitDeep } from "../src/index";

describe("omitDeep", () => {
  it("omits a key from flat object", () => {
    expect(omitDeep({ a: 1, b: 2 }, "a")).toEqual({ b: 2 });
  });

  it("omits keys from nested objects", () => {
    expect(omitDeep({ a: 1, nested: { a: 2, b: 3 } }, "a")).toEqual({ nested: { b: 3 } });
  });

  it("omits keys from arrays of objects", () => {
    expect(
      omitDeep(
        [
          { a: 1, b: 2 },
          { a: 3, b: 4 },
        ],
        "a",
      ),
    ).toEqual([{ b: 2 }, { b: 4 }]);
  });

  it("handles null values without throwing", () => {
    expect(omitDeep({ a: null, b: 2 }, "b")).toEqual({ a: null });
  });

  it("accepts an array of props", () => {
    expect(omitDeep({ a: 1, b: 2, c: 3 }, ["a", "b"])).toEqual({ c: 3 });
  });

  it("accepts variadic props (drop-in compat)", () => {
    expect(omitDeep({ a: 1, b: 2, c: 3 }, "a", "b")).toEqual({ c: 3 });
  });

  it("handles deeply nested arrays", () => {
    expect(
      omitDeep(
        {
          list: [
            { a: 1, b: 2 },
            { a: 3, b: 4 },
          ],
        },
        "a",
      ),
    ).toEqual({ list: [{ b: 2 }, { b: 4 }] });
  });

  it("returns non-object primitives unchanged", () => {
    expect(omitDeep(42 as unknown, "a")).toBe(42);
    expect(omitDeep("hello" as unknown, "a")).toBe("hello");
  });

  it("handles undefined input", () => {
    expect(omitDeep(undefined as unknown, "a")).toBeUndefined();
  });
});
