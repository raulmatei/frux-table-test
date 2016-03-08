import React, { Component } from 'react';
import Checkbox from './checkbox';

export default (props) => {
  const { onChange, checked, indeterminate } = props;

  return (
    <Checkbox
      checked={checked}
      indeterminate={indeterminate}
      onChange={onChange}
    />
  );
}
