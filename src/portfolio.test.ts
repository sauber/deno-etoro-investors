import { assertInstanceOf } from "@std/assert";
import { portfolio, type PortfolioResults } from "./portfolio.ts";
import type { CustomerID } from "./site.ts";

Deno.test("Portfolio", { ignore: true }, async () => {
  const customer: CustomerID = 4657429;
  const results: PortfolioResults = await portfolio(customer);
  assertInstanceOf(results, Object);
});
