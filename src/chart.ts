import { createURL, fetchjson, type UserName } from "./site.ts";

/** Properties of each entry in chart */
type ChartItem = {
  timestamp: string;
  equity: number;
};

/** List of entries in chart */
export type Chart = ChartItem[];

/** Output of API call */
export type Simulation = {
  simulation: {
    oneYearAgo: {
      chart: Chart;
    };
  };
};

/** Confirm stats include CustomerId */
function validate(data: Simulation): boolean {
  const chartLength = data.simulation.oneYearAgo.chart.length;
  if (chartLength < 365) {
    throw new Error(
      `Chart length of ${chartLength} days is less than one year`,
    );
  }
  return true;
}

/** Fetch investor stats */
export async function chart(
  username: UserName,
): Promise<Chart> {
  const template = "/sapi/trade-data-real/chart/public/%s/oneYearAgo/1";
  const path = template.replace("%s", username);
  const url: URL = createURL(path);
  const response = await fetchjson<Simulation>(url);
  validate(response);
  return response.simulation.oneYearAgo.chart;
}
