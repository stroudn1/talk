import cn from "classnames";
import { Localized } from "@fluent/react/compat";
import React, { FunctionComponent } from "react";

import CLASSES from "coral-stream/classes";
import { Flex, Message } from "coral-ui/components/v2";
import { Button } from "coral-ui/components/v3";

import styles from "./PostCommentRejectedMessage.css";

export interface PostCommentRejectedProps {
  onDismiss: () => void;
}

const PostCommentRejected: FunctionComponent<PostCommentRejectedProps> = (
  props
) => {
  return (
    <Message color="error" className={CLASSES.createComment.rejected} fullWidth>
      <Flex justifyContent="space-between" alignItems="center" className={styles.flex}>
        <Localized id="comments-submitStatus-submittedAndRejected">
          <div>This comment has been rejected for violating our guidelines</div>
        </Localized>
        <div className={styles.buttonWrapper}>
          <Localized id="comments-submitStatus-dismiss">
            <Button
              className={cn(CLASSES.createComment.dismissButton, styles.button)}
              onClick={props.onDismiss}
              variant="flat"
              color="none"
              underline
            >
              Dismiss
            </Button>
          </Localized>
        </div>
      </Flex>
    </Message>
  );
};

export default PostCommentRejected;
