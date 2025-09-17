import { assertGreaterOrEqual } from "@std/assert";
import { createURL, fetchjson } from "./site.ts";

/** Properties of investors */
export type Investor = {
  CustomerId: number;
  UserName: string;
  FullName: string;
  HasAvatar: boolean;
  IsSocialConnected: boolean;
  IsTestAccount: boolean;
  DisplayFullName: boolean;
  BonusOnly: boolean;
  Blocked: boolean;
  Verified: boolean;
  PopularInvestor: boolean;
  CopyBlock: boolean;
  IsFund: boolean;
  IsBronze: boolean;
  IsProInvestor: boolean;
  FundType: number;
  Tags: number[];
  Gain: number;
  DailyGain: number;
  ThisWeekGain: number;
  RiskScore: number;
  MaxDailyRiskScore: number;
  MaxMonthlyRiskScore: number;
  Copiers: number;
  CopiedTrades: number;
  CopyTradesPct: number;
  CopyInvestmentPct: number;
  BaseLineCopiers: number;
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
  OptimalCopyPosSize: number;
  HighLeveragePct: number;
  MediumLeveragePct: number;
  LowLeveragePct: number;
  PeakToValley: number;
  PeakToValleyStart: string;
  PeakToValleyEnd: string;
  LongPosPct: number;
  TopTradedInstrumentId: number;
  TopTradedAssetClassId: number;
  TopTradedInstrumentPct: number;
  TotalTradedInstruments: number;
  ActiveWeeks: number;
  FirstActivity: string;
  LastActivity: string;
  ActiveWeeksPct: number;
  WeeksSinceRegistration: number;
  Country: string;
  AffiliateId: number;
  InstrumentPct: number;
};

/** List of investors */
export type DiscoverResults = {
  Status: string;
  TotalRows: number;
  Items: Investor[];
};

/** Available search parameters */
export type DiscoverParameters = {
  istestaccount: boolean;
  optin: boolean;
  bonusonly: boolean;
  blocked: boolean;
  copyblock: boolean;
  period: string;
  hasavatar: boolean;
  displayfullname: boolean;
  verified: boolean;
  popularinvestor: boolean;
  isfund: boolean;
  gainmin: number;
  gainmax: number;
  maxdailyriskscoremax: number;
  maxmonthlyriskscoremax: number;
  copiersmin: number;
  copiedtradesmax: number;
  copytradespctmax: number;
  copyinvestmentpctmax: number;
  winratiomin: number;
  dailyddmin: number;
  weeklyddmin: number;
  exposuremin: number;
  peaktovalleymin: number;
  toptradedassetclassid: number;
  sort: string;
  page: number;
  pagesize: number;
};

/** Default search parameters */
export const DiscoverDefaults: DiscoverParameters = {
  istestaccount: false,
  optin: true,
  bonusonly: false,
  blocked: false,
  copyblock: false,
  period: "LastTwoYears",
  hasavatar: true,
  displayfullname: true,
  verified: true,
  popularinvestor: true,
  isfund: false,
  gainmin: 0,
  gainmax: 100,
  maxdailyriskscoremax: 7,
  maxmonthlyriskscoremax: 7,
  copiersmin: 20,
  copiedtradesmax: 0,
  copytradespctmax: 0,
  copyinvestmentpctmax: 0,
  winratiomin: 50,
  dailyddmin: -8,
  weeklyddmin: -10,
  exposuremin: 70,
  peaktovalleymin: -15,
  toptradedassetclassid: 5,
  sort: "-gain",
  page: 1,
  pagesize: 20,
};

/** Validate integrity of downloaded data */
function validate(data: DiscoverResults): boolean {
  assertGreaterOrEqual(data.TotalRows, 0);
  return true;
}

/** API path */
const discoverapi = "/sapi/rankings/rankings";

/** Fetch list of investors */
export async function discover(
  criteria: Partial<DiscoverParameters> = {},
): Promise<DiscoverResults> {
  const parameters = Object.assign({}, DiscoverDefaults, criteria);
  const url: URL = createURL(discoverapi, parameters);
  const response = await fetchjson<DiscoverResults>(url);
  validate(response);
  return response;
}
