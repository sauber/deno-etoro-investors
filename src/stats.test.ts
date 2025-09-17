import { assertInstanceOf } from "@std/assert";
import { type CustomerID, stats, type StatsResults } from "./stats.ts";

Deno.test("Stats", { ignore: true }, async () => {
  const customer: CustomerID = 4657429;
  const results: StatsResults = await stats(customer);
  assertInstanceOf(results, Object);
});
