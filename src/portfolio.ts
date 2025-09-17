import { createURL, type CustomerID, fetchjson } from "./site.ts";

export type Mirror = {
  MirrorID: number;
  ParentCID: number;
  ParentUsername: string;
  Invested: number;
  NetProfit: number;
  Value: number;
  PendingForClosure: boolean;
};

export type Position = {
  InstrumentID: number;
  Direction: "Buy" | "Sell";
  Invested: number;
  NetProfit: number;
  Value: number;
};

export type InstrumentType = {
  IndustryTypeID: number;
  Direction: "Buy" | "Sell";
  Invested: number;
  NetProfit: number;
  Value: number;
};

export type StockIndustry = {
  StockIndustryID: number;
  Direction: "Buy" | "Sell";
  Invested: number;
  NetProfit: number;
  Value: number;
};

/** Output of API call */
export type PortfolioResults = {
  CreditByRealizedEquity: number;
  CreditByUnrealizedEquity: number;
  AggregatedMirrors: Mirror[];
  AggregatedPositions: Position[];
  AggregatedPositionsByInstrumentTypeID: InstrumentType[];
  AggregatedPositionsByStockIndustryID: StockIndustry[];
};

/** Confirm stats include CustomerId */
function validate(data: PortfolioResults): boolean {
  if (!("CreditByRealizedEquity" in data)) {
    throw new Error(`CreditByRealizedEquity missing`);
  }
  return true;
}

/** Fetch investor stats */
export async function portfolio(cid: CustomerID): Promise<PortfolioResults> {
  const path = "/sapi/trade-data-real/live/public/portfolios";
  const url: URL = createURL(path, { cid });
  const response = await fetchjson<PortfolioResults>(url);
  validate(response);
  return response;
}
