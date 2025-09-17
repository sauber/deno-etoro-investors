import { createURL, type CustomerID, fetchjson } from "./site.ts";

/** Properties of investor stats */
export type StatsResults = {
  CustomerId: number;
  UserName: string;
  DisplayFullName: boolean;
  FullName?: string;
  HasAvatar: boolean;
  PopularInvestor: boolean;
  IsFund: boolean;
  Gain: number;
  RiskScore: number;
  MaxDailyRiskScore: number;
  MaxMonthlyRiskScore: number;
  Copiers: number;
  CopiersGain: number;
  AUMTier: number;
  AUMTierV2: number;
  AUMTierDesc: string;
  VirtualCopiers: number;
  Trades: number;
  WinRatio: number;
  DailyDD: number;
  WeeklyDD: number;
  ProfitableWeeksPct: number;
  ProfitableMonthsPct: number;
  Velocity: number;
  Exposure: number;
  AvgPosSize: number;
  HighLeveragePct: number;
  MediumLeveragePct: number;
  LowLeveragePct: number;
  PeakToValley: number;
  LongPosPct: number;
  ActiveWeeks: number;
  ActiveWeeksPct: number;
  WeeksSinceRegistration: number;
};

/** API response */
type StatsResponse = {
  Status: string;
  Data: StatsResults;
};

/** Available search parameters */
export type StatsParameters = {
  Period: string;
};

/** Default search parameters */
export const StatsDefaults: StatsParameters = {
  Period: "OneYearAgo",
};

/** Confirm stats include CustomerId */
function validate(data: StatsResponse): boolean {
  if (!data.Data.CustomerId) throw new Error(`CustomerId missing`);
  return true;
}

/** Fetch investor stats */
export async function stats(
  cid: CustomerID,
  period: Partial<StatsParameters> = {},
): Promise<StatsResponse> {
  const template = "/sapi/rankings/cid/%d/rankings";
  const path = template.replace("%d", String(cid));
  const parameters = Object.assign({}, StatsDefaults, period);
  const url: URL = createURL(path, parameters);
  const response = await fetchjson<StatsResponse>(url);
  validate(response);
  return response;
}
