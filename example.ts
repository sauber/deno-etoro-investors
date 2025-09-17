import {
  type Chart,
  chart,
  type CustomerID,
  discover,
  type DiscoverResults,
  type Instrument,
  type Instruments,
  instruments,
  portfolio,
  type PortfolioResults,
  Position,
  type Position,
  stats,
  type StatsResults,
  type UserName,
} from "jsr:@sauber/etoro-investors@0.2.0";

import { linechart } from "jsr:@sauber/widgets";

// Discovery
const investors: DiscoverResults = await discover();
console.log(
  `Found ${investors.TotalRows} investors. One of them is ${
    investors.Items[0].UserName
  }.`,
);

// UserName and CustomerID
const username: UserName = investors.Items[0].UserName;
const id: CustomerID = investors.Items[0].CustomerId;

// Stats
const investor: StatsResults = await stats(id);
console.log(`${username} has a gain of ${investor.Gain} since one year ago.`);

// Chart
const chartData: Chart = await chart(username);
const series: number[] = chartData.map((item) => item.equity);
console.log("One year simulation chart:");
console.log(linechart(series, 12, 72));

// Instruments
const instr: Instruments = await instruments();
console.log(`Found ${instr.length} instruments for trading.`);

// Portfolio
const presults: PortfolioResults = await portfolio(id);
const positions: Position[] = presults.AggregatedPositions.sort(
  (a, b) => b.Value - a.Value,
).slice(0, 3);
console.log("Top 3 positions:");
positions.forEach((p: Position) =>
  console.log(
    instr.find((i: Instrument) => i.InstrumentID === p.InstrumentID)
      ?.InstrumentDisplayName,
    p.Value,
  )
);
