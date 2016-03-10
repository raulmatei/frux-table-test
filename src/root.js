import React, { Children } from 'react';

const Root = ({ children }) => Children.only(children);

Root.displayName = 'Root';
export default Root;