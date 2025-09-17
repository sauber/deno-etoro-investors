import { assertInstanceOf } from "@std/assert";
import { chart, type Chart } from "./chart.ts";
import type { UserName } from "./site.ts";

Deno.test("Chart", { ignore: true }, async () => {
  const customer: UserName = "GainersQtr";
  const results: Chart = await chart(customer);
  console.log(results);
  assertInstanceOf(results, Array);
});
