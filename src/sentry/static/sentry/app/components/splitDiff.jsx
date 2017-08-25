import React, {PropTypes} from 'react';
import classNames from 'classnames';
import {diffChars, diffWords, diffLines} from 'diff';

import '../../less/components/splitDiff.less';

const diffFnMap = {
  chars: diffChars,
  words: diffWords,
  lines: diffLines
};

const SplitDiff = React.createClass({
  propTypes: {
    base: PropTypes.string,
    target: PropTypes.string,
    type: PropTypes.oneOf(['lines', 'words', 'chars'])
  },

  getDefaultProps() {
    return {
      type: 'lines'
    };
  },

  getInitialState() {
    return {};
  },

  render() {
    let {className, type, base, target} = this.props;
    let cx = classNames('split-diff', className);
    let diffFn = diffFnMap[type];

    if (typeof diffFn !== 'function') return null;

    let baseByLines = base.split('\n');
    let targetByLines = target.split('\n');
    let [largerArray] = baseByLines.length > targetByLines.length
      ? [baseByLines, targetByLines]
      : [targetByLines, baseByLines];
    let results = largerArray.map((line, index) =>
      diffFn(baseByLines[index] || '', targetByLines[index] || '', {newlineIsToken: true})
    );

    return (
      <table className={cx}>
        <tbody>
          {results.map((line, j) => {
            let highlightAdded = line.find(result => result.added);
            let highlightRemoved = line.find(result => result.removed);

            return (
              <tr key={j}>

                <td
                  className={classNames('split-view-cell', {
                    'removed-row': highlightRemoved
                  })}>
                  <div className="split-diff-row">
                    {line.filter(result => !result.added).map((result, i) => {
                      return (
                        <span
                          key={i}
                          className={classNames('split-view-word', {
                            removed: result.removed
                          })}>
                          {result.value}
                        </span>
                      );
                    })}
                  </div>
                </td>

                <td style={{width: 20}} />

                <td
                  className={classNames('split-view-cell', {
                    'added-row': highlightAdded
                  })}>
                  <div className="split-diff-row">
                    {line.filter(result => !result.removed).map((result, i) => {
                      return (
                        <span
                          key={i}
                          className={classNames('split-view-word', {
                            added: result.added
                          })}>
                          {result.value}
                        </span>
                      );
                    })}
                  </div>
                </td>
              </tr>
            );
          })}

        </tbody>

      </table>
    );
  }
});

export default SplitDiff;
