import cn from "classnames";
import React, { FunctionComponent } from "react";

import CLASSES from "coral-stream/classes";
import { Button } from "coral-ui/components";
import { Icon, Flex } from "coral-ui/components/v2";

import styles from "./Announcement.css";

interface Props {
  children: string;
  onClose: () => void;
}

const Announcement: FunctionComponent<Props> = (props) => {
  return (
    <div className={cn(styles.root, CLASSES.announcement)}>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex itemGutter="double" alignItems="center">
          <div>
            <Icon size="lg">notifications</Icon>
          </div>
          <span className={styles.text}>{props.children}</span>
        </Flex>
        <div>
          <Button color="light" onClick={props.onClose}>
            <Icon>close</Icon>
          </Button>
        </div>
      </Flex>
    </div>
  );
};

export default Announcement;
