import React, { PropTypes } from 'react';
import { evaluate } from 'frux';
import { getters } from '../main';

const highlightedStyle = {
  backgroundColor: '#cf9'
};

export default ({ label }) => {
  const result = [];
  const term = evaluate(getters.content.term);
  const delimiter = new RegExp(`(${term})`, 'gi');

  if (!term) {
    return (
      <span>{label}</span>
    );
  }

  if (delimiter.test(label)) {
    label.toString().split(delimiter).forEach((item, index) => {
      if (delimiter.test(item)) {
        result.push(
          <span
            key={`highlight-${index}`}
            style={highlightedStyle}
          >
            {item}
          </span>
        );
      } else {
        result.push(item);
      }
    });
  } else {
    result.push(label);
  }

  return (
    <span>{result}</span>
  );
}
