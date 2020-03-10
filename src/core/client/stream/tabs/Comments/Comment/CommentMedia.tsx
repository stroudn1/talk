import React, { FunctionComponent } from "react";

import {} from "coral-ui/components/v2";

// import styles from "./CommentMedia.css";

interface Props {
  url: string;
  alt: string;
  width: number;
  height: number;
}

const CommentMedia: FunctionComponent<Props> = ({
  url,
  alt,
  width,
  height,
}) => {
  return (
    <div>
      <img src={url} alt={alt} width={width} height={height} />
    </div>
  );
};

export default CommentMedia;
