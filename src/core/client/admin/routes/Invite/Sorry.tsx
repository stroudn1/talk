import { Typography } from 'coral-ui/components';
import { CallOut, HorizontalGutter } from 'coral-ui/components/v2';
import React from 'react';

import { Localized } from '@fluent/react/compat';

interface Props {
  reason: React.ReactNode;
}

const Sorry: React.FunctionComponent<Props> = ({ reason }) => {
  return (
    <HorizontalGutter size="double" data-testid="invite-complete-sorry">
      <Localized id="invite-oopsSorry">
        <Typography variant="heading1">Oops Sorry!</Typography>
      </Localized>
      <CallOut color="error" fullWidth>
        {reason ? (
          reason
        ) : (
          <Localized id="invite-tokenNotFound">
            <span data-testid="invalid-link">
              The specified link is invalid, check to see if it was copied
              correctly.
            </span>
          </Localized>
        )}
      </CallOut>
    </HorizontalGutter>
  );
};

export default Sorry;
