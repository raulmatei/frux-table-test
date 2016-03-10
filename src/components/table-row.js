import React, { Component } from 'react';

class TableRow extends Component {
  static displayName = 'TableRow';

  shouldComponentUpdate(nextProps) {
    const isNewTermDiff = nextProps.term !== this.props.term;
    const isSelectedDiff = nextProps.isSelected !== this.props.isSelected;

    return isSelectedDiff || isNewTermDiff;
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
