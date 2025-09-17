import { assertGreater, assertInstanceOf } from "@std/assert";
import { type Instruments, instruments } from "./instruments.ts";

Deno.test("Instruments", { ignore: true }, async () => {
  const results: Instruments = await instruments();
  assertInstanceOf(results, Array);
  assertGreater(results.length, 0);
});
