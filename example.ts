import {
  type Chart,
  chart,
  type CustomerID,
  discover,
  type DiscoverResults,
  portfolio,
  type PortfolioResults,
  Position,
  type Position,
  stats,
  type StatsResults,
  type UserName,
} from "jsr:@sauber/etoro-investors";

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
console.log("Simulation Chart:");
console.log(linechart(series, 12, 72));

// Portfolio
const presults: PortfolioResults = await portfolio(id);
const positions: Position[] = presults.AggregatedPositions.sort(
  (a, b) => b.Value - a.Value,
).slice(0, 3);
console.log("Top 3 Positions:");
positions.forEach((p: Position) => console.log(p.InstrumentID, p.Value));
