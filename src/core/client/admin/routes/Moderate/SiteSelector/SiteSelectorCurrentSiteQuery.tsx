import {
    SiteSelectorCurrentSiteQuery as QueryTypes
} from 'coral-admin/__generated__/SiteSelectorCurrentSiteQuery.graphql';
import { QueryRenderData, QueryRenderer } from 'coral-framework/lib/relay';
import { Delay, Spinner } from 'coral-ui/components/v2';
import React, { FunctionComponent } from 'react';
import { graphql } from 'react-relay';

interface Props {
  siteID: string;
}

export const render = ({ error, props }: QueryRenderData<QueryTypes>) => {
  if (error) {
    return <div>{error.message}</div>;
  }
  if (props) {
    return <div>{props.site && props.site.name}</div>;
  }
  return (
    <Delay>
      <Spinner />
    </Delay>
  );
};

const enhanced: FunctionComponent<Props> = ({ siteID }) => {
  return (
    <QueryRenderer<QueryTypes>
      query={graphql`
        query SiteSelectorCurrentSiteQuery($siteID: ID!) {
          site(id: $siteID) {
            id
            name
          }
        }
      `}
      variables={{
        siteID,
      }}
      render={render}
    />
  );
};

export default enhanced;
