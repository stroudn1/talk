import React, { FunctionComponent } from "react";

import { graphql, withFragmentContainer } from "coral-framework/lib/relay";

import { CommentMediaContainer_comment as CommentData } from "coral-stream/__generated__/CommentMediaContainer_comment.graphql";
import {} from "coral-ui/components/v2";
import CommentMedia from "./CommentMedia";

interface Props {
  comment: CommentData;
}

const CommentMediaContainer: FunctionComponent<Props> = ({ comment }) => {
  if (!comment.media) {
    return null;
  }
  return (
    <>
      {comment.media.map(media => (
        <CommentMedia
          key={media.remote_id}
          url={media.url}
          width={media.width}
          height={media.height}
          alt={media.alt}
        />
      ))}
    </>
  );
};

const enhanced = withFragmentContainer<Props>({
  comment: graphql`
    fragment CommentMediaContainer_comment on Comment {
      media {
        remote_id
        url
        width
        height
        alt
        mimetype
      }
    }
  `,
})(CommentMediaContainer);

export default enhanced;
