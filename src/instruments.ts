import { fetchjson } from "./site.ts";

/** Source and size of image of instrument in PNG format */
export type InstrumentPNG = {
  "InstrumentID": number;
  "Width": number;
  "Height": number;
  "Uri": string;
};

/** Source and size of image of instrument in SVG format */
export type InstrumentSVG = {
  "InstrumentID": number;
  "Uri": string;
  "BackgroundColor": string;
  "TextColor": string;
};

/** Properties of instrument */
export type Instrument = {
  "InstrumentID": number;
  "InstrumentDisplayName": string;
  "InstrumentTypeID": number;
  "ExchangeID": number;
  "Images": InstrumentPNG | InstrumentSVG[];
  "SymbolFull": string;
  "PriceSource": string;
  "HasExpirationDate": boolean;
  "IsInternalInstrument": boolean;
};

/** List of instruments */
export type Instruments = Instrument[];

/** Output of API call */
export type InstrumentResults = {
  InstrumentDisplayDatas: Instruments;
};

/** Location of instrument list */
const url = new URL(
  "https://api.etorostatic.com/sapi/instrumentsmetadata/V1.1/instruments/bulk?bulkNumber=1&totalBulks=1",
);

/** Fetch list of instruments */
export async function instruments(): Promise<InstrumentResults> {
  const response = await fetchjson<InstrumentResults>(url);
  return response;
}
