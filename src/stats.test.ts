import { assertInstanceOf } from "@std/assert";
import { stats, type StatsResults } from "./stats.ts";
import type { CustomerID } from "./site.ts";

Deno.test("Stats", { ignore: true }, async () => {
  const customer: CustomerID = 4657429;
  const results: StatsResults = (await stats(customer)).Data;
  assertInstanceOf(results, Object);
});
