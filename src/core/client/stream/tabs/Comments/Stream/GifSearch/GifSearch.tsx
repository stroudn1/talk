import React, {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useState,
} from "react";

import gifSearch, { GifSearchResult } from "coral-framework/rest/gifSearch";
import { Button, TextField } from "coral-ui/components/v2";

// import styles from "./GifSearch.css";

export interface Gif {
  width: number;
  height: number;
  url: string;
  alt: string;
  id: string;
  preview: string;
}

export interface SearchResult {
  type: string;
  id: string;
  slug: string;
  url: string;
  title: string;
}

interface Props {
  show: boolean;
  onSelect: (gif: Gif) => void;
}

const GifSearch: FunctionComponent<Props> = ({ show, onSelect }) => {
  if (!show) {
    return null;
  }
  const [results, setResults] = useState<GifSearchResult[]>([]);
  const onChange = useCallback(async (evt: ChangeEvent<HTMLInputElement>) => {
    const query = evt.target.value;
    const searchResults = await gifSearch(query);
    setResults(searchResults.data);
  }, []);
  const selectGif = useCallback(
    (gif: GifSearchResult) => {
      onSelect({
        url: gif.images.downsized_medium.url,
        width: gif.images.downsized_medium.width,
        height: gif.images.downsized_medium.height,
        alt: gif.title,
        id: gif.id,
        preview: gif.images.fixed_width_small_still.url,
      });
    },
    [onSelect]
  );
  return (
    <div>
      <TextField onChange={onChange} placeholder="search gifs" />
      {results.map(result => (
        <Button
          variant="text"
          key={result.id}
          onClick={() => selectGif(result)}
        >
          <img src={result.images.fixed_width_small.url} alt={result.title} />
        </Button>
      ))}
    </div>
  );
};

export default GifSearch;
