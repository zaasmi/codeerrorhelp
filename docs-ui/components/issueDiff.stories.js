import React from 'react';
import {storiesOf} from '@storybook/react';
import {withInfo} from '@storybook/addon-info';
// import {action} from '@storybook/addon-actions';

import IssueDiff from 'sentry-ui/issueDiff';

storiesOf('IssueDiff', module).add(
  'default',
  withInfo('Description')(() => <IssueDiff />)
);
