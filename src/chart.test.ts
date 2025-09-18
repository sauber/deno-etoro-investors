import { assertInstanceOf } from "@std/assert";
import { type Chart, chart, type ChartResults } from "./chart.ts";
import type { UserName } from "./site.ts";

Deno.test("Chart", { ignore: true }, async () => {
  const customer: UserName = "GainersQtr";
  const results: ChartResults = await chart(customer);
  assertInstanceOf(results, Object);
  const daily: Chart = results.simulation.oneYearAgo.chart;
  assertInstanceOf(daily, Array);
});
