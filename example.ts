import { linechart } from "jsr:@sauber/widgets";

import {
  chart,
  type ChartResults,
  type CustomerID,
  discover,
  type DiscoverResults,
  type Instrument,
  type Instruments,
  instruments,
  portfolio,
  type PortfolioResults,
  type Position,
  stats,
  type StatsData,
  type UserName,
} from "jsr:@sauber/etoro-investors";

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
const investor: StatsData = (await stats(id)).Data;
console.log(`${username} has a gain of ${investor.Gain} since one year ago.`);

// Chart
const chartData: ChartResults = await chart(username);
const series: number[] = chartData.simulation.oneYearAgo.chart.map((item) =>
  item.equity
);
console.log("One year simulation chart:");
console.log(linechart(series, 12, 72));

// Instruments
const instr: Instruments = (await instruments()).InstrumentDisplayDatas;

// Portfolio
const presults: PortfolioResults = await portfolio(id);
const positions: Position[] = presults.AggregatedPositions.sort(
  (a, b) => b.Value - a.Value,
).slice(0, 3);
console.log("Top 3 positions:");
positions.forEach((p: Position) =>
  console.log(
    p.Value.toFixed(2) + "%",
    instr.find((i: Instrument) => i.InstrumentID === p.InstrumentID)
      ?.InstrumentDisplayName,
  )
);
