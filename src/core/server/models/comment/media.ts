import { GQLCOMMENT_MEDIA_PROVIDER } from "coral-server/graph/schema/__generated__/types";

/**
 * CommentMedia is used to represent a given Tag added to a Comment.
 */
export interface CommentMedia {
  provider: GQLCOMMENT_MEDIA_PROVIDER;
  url: string;
  id: string;
  createdAt: Date;
  width: number;
  height: number;
  mimetype: string;
}
