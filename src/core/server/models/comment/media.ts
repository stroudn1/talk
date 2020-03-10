import { GQLCOMMENT_MEDIA_PROVIDER } from "coral-server/graph/schema/__generated__/types";

/**
 * CommentMedia is used to represent a given Tag added to a Comment.
 */
export interface CommentMedia {
  provider: GQLCOMMENT_MEDIA_PROVIDER;
  url: string;
  width: number;
  height: number;
  mimetype: string;
  remote_id: string;
}
