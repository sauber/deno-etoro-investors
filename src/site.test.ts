import { assertNotMatch, assertStringIncludes } from "@std/assert";
import { createURL, site } from "./site.ts";

Deno.test("site", () => {
  const path = "/test/path";
  const url = createURL(path, { istestaccount: false });
  assertStringIncludes(url.toString(), "istestaccount=false");
  assertStringIncludes(url.toString(), "client_request_id=");
  assertStringIncludes(url.toString(), "https://www.etoro.com");
  assertStringIncludes(url.toString(), path);
  assertStringIncludes(url.toString(), "?");
  assertStringIncludes(url.toString(), "&");
  assertStringIncludes(url.toString(), site + path + "?");
});

Deno.test("Blank parameter", () => {
  const path = "/test/path";
  const url = createURL(path, { istestaccount: undefined, copyblock: null });
  assertNotMatch(url.toString(), /istestaccount/);
  assertNotMatch(url.toString(), /copyblock/);
});
