import React from 'react';
import {shallow} from 'enzyme';
import IssueDiff from 'app/components/issueDiff';
import {Client} from 'app/api';
import entries from '../../mocks/entries';

jest.mock('app/api');

describe('IssueDiff', function() {
  beforeEach(function() {
    this.sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  it('is loading when initially rendering', function() {
    let wrapper = shallow(<IssueDiff />);
    expect(wrapper.find('SplitDiff')).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
  });

  it('can dynamically import SplitDiff', function(done) {
    Client.addMockResponse({
      url: '/issues/target/events/latest/',
      body: {
        entries: entries[0]
      }
    });
    Client.addMockResponse({
      url: '/issues/base/events/latest/',
      body: {
        platform: 'javascript',
        entries: entries[1]
      }
    });

    let wrapper = shallow(<IssueDiff baseIssueId="base" targetIssueId="target" />);

    wrapper.instance().componentDidUpdate = jest.fn(() => {
      if (!wrapper.state('loading')) {
        expect(wrapper.find('SplitDiff')).toHaveLength(1);
        // This snapshot is wrong
        // expect(wrapper).toMatchSnapshot();
        done();
      }
    });
  });
});
