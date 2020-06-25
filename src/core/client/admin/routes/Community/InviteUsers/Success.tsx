import { Button } from 'coral-ui/components';
import { Box, Flex, CheckIcon } from 'coral-ui/components/v2';
import React, { FunctionComponent } from 'react';

import { Localized } from '@fluent/react/compat';

import * as styles from './Success.css';

interface Props {
  onClose: () => void;
  lastFocusableRef: React.Ref<HTMLButtonElement>;
}

const Success: FunctionComponent<Props> = ({ lastFocusableRef, onClose }) => (
  <div>
    <Flex justifyContent="center" direction="column" alignItems="flex-end">
      <Flex
        justifyContent="center"
        direction="column"
        alignItems="center"
        className={styles.box}
      >
        <Box marginTop={7} marginBottom={5}>
          <CheckIcon />
        </Box>
        <Box marginBottom={7}>
          <Localized id="community-invite-invitationsSent">
            <h2 className={styles.title}>Your invitations have been sent!</h2>
          </Localized>
        </Box>
      </Flex>
      <Localized id="community-invite-close">
        <Button
          variant="filled"
          color="primary"
          onClick={onClose}
          ref={lastFocusableRef}
        >
          Close
        </Button>
      </Localized>
    </Flex>
  </div>
);

export default Success;
