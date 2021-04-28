import Airtable from "airtable";

export const base = new Airtable({
  // FIXME: for some reason apiKey is not being read from .env.local
  // tried using the NEXT_PUBLIC_ prefix, with no luck.
  apiKey: process.env.AIRTABLE_API_KEY, // hard-coded apiKey
}).base(process.env.AIRTABLE_SITES_BASE_ID);
