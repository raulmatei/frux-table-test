import React from 'react';

const Root = (props) => {
  return (
    <div>{props.children}</div>
  );
};

Root.displayName = 'Root';

export default Root;