/** API address */
export const site = "https://www.etoro.com";

/** Generate random UUDI */
const uuid = crypto.randomUUID();

/** Dict of parameters */
export type URLParameters = Record<string, string | number | boolean>;

/** Numeric ID of Customer */
export type CustomerID = number;

/** Username string of Customer */
export type UserName = string;

/** Generate a URL from path and parameters */
export function createURL(path: string, parameters: URLParameters = {}): URL {
  const url = new URL(path, site);
  Object.entries(parameters).forEach(([key, value]) =>
    url.searchParams.set(key, String(value))
  );
  url.searchParams.set("client_request_id", uuid);
  return url;
}

/** Fetch JSON data from URL */
export function fetchjson<T>(url: URL): Promise<T> {
  console.log(url);

  return fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
    },
  }).then((resp) => resp.json());
}
