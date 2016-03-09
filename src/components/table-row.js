import React, { Component } from 'react';

class TableRow extends Component {
  static displayName = 'TableRow';

  shouldComponentUpdate(nextProps) {
    return nextProps.isSelected !== this.props.isSelected;
  }

  render() {
    const { id, children, onClick, style } = this.props;

    return (
      <tr id={id} onClick={onClick} style={style}>
        {children}
      </tr>
    );
  }
}

export default TableRow;
