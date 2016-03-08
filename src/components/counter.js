import React, { Component } from 'react';
import { actions } from '../../main';

const commonStyles = {
  width: 32,
  height: 32,
  marginLeft: 2,
  color: 'white',
  border: '0 none',
  fontSize: 18
};

const btnStyles = {
  increment: {
    ...commonStyles,
    marginLeft: 0,
    backgroundColor: 'green'
  },

  decrement: {
    ...commonStyles,
    backgroundColor: 'red'
  },

  reset: {
    ...commonStyles,
    width: 'auto',
    color: '#ccc',
    backgroundColor: 'transparent'
  }
};

class Counter extends Component {
  static getDataBindings(getters) {
    return {
      count: getters.content.count
    };
  }

  render() {
    const { count } = this.props;
    const shouldDisableDecrement = count === 0;

    return (
      <span>
        <strong>Count: {count} </strong>
        <button
          type='button'
          style={btnStyles.increment}
          onClick={actions.content.increment}
        >
          <strong>+</strong>
        </button>

        <button
          type='button'
          style={btnStyles.decrement}
          disabled={shouldDisableDecrement}
          onClick={actions.content.decrement}
        >
          <strong>-</strong>
        </button>

        <button
          type='button'
          style={btnStyles.reset}
          onClick={actions.content.reset}
        >
          Reset
        </button>
      </span>
    );
  }
}

export default context.connect(Counter);
