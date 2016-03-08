import React, { Component } from 'react';

const Checkbox = (props) => {
  const { onChange, indeterminate, checked } = props;

  return (
    <span
      style={{
        display: 'inline-block',
        width: 13,
        maxWidth: 13,
        height: 13,
        maxHeight: 13,
        fontSize: 10,
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bolder',
        textAlign: 'center',
        color: '#777',
        lineHeight: '13px',
        border: `1px solid #777`,
        backgroundColor: 'white'
      }}

      dangerouslySetInnerHTML={determineState({ indeterminate, checked })}
      onClick={
        (ev) => onChange(ev, {
          indeterminate: indeterminate,
          checked: !checked
        })
      }
    />
  );
}


Checkbox.defaultProps = {
  checked: false,
  indeterminate: false,
  onChange() {}
};

export default Checkbox;

function determineState(props) {
  const { checked, indeterminate } = props;
  const states = {
    unchecked: '\u200B',
    checked: '\u2713',
    indeterminate: '\u2013'
  };


  let state = states.unchecked;

  if (indeterminate) {
    state = states.indeterminate;
  }

  if (!indeterminate && checked) {
    state = states.checked;
  }

  return {
    __html: state
  };
}
