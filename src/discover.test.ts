import { assertInstanceOf } from "@std/assert";
import { discover, type DiscoverResults } from "./discover.ts";

Deno.test("Discover", { ignore: true }, async () => {
  const investors: DiscoverResults = await discover();
  assertInstanceOf(investors, Object);
  assertInstanceOf(investors.Items, Object);
});
