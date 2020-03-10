import { RestClient } from "../lib/rest";

const API_KEY = "EgJAPAsmbnPxG1W3Qhf3PLi4GelcjQWZ";

export interface GifSearchResultImage {
  url: string;
  width: number;
  height: number;
}

export interface GifSearchResult {
  type: string;
  id: string;
  slug: string;
  url: string;
  title: string;
  images: {
    fixed_width_small: GifSearchResultImage;
    downsized_medium: GifSearchResultImage;
    fixed_width_small_still: GifSearchResultImage;
  };
}

interface GifSearchPagination {
  offset: number;
  total_count: number;
  count: number;
}

interface GifSearchMeta {
  msg: string;
  status: number;
  response_id: string;
}

interface GifSearchResponse {
  data: GifSearchResult[];
  pagination: GifSearchPagination;
  meta: GifSearchMeta;
}

export default function gifSearch(q: string): Promise<GifSearchResponse> {
  const gifSearchClient = new RestClient("https://api.giphy.com/v1/gifs");
  const params = new URLSearchParams({
    api_key: API_KEY,
    q,
    rating: "g",
    lang: "en",
  });
  return gifSearchClient.fetch<GifSearchResponse>(
    "/search?" + params.toString(),
    {
      method: "GET",
    },
    true
  );
}
