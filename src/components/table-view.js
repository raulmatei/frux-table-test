import React, { Component } from 'react';
import frux from 'frux';
import { actions } from '../main';
import Highlight from './highlight';
import TableRow from './table-row';
import SelectAll from './select-all';
import Checkbox from './checkbox';

const formControlsStyle = {
  display: 'inline-block',
  marginRight: 10,
  padding: 20,
  fontSize: 16,
  fontWeight: 'bold'
};

const buttonsStyle = {
  ...formControlsStyle,
  backgroundColor: 'transparent',
  border: '1px solid #ccc',
  color: '#aaa',
  outline: 'none'
};

const removeButtonsStyle = {
  ...formControlsStyle,
  backgroundColor: 'transparent',
  backgroundColor: '#F33',
  border: '1px solid #F33',
  color: '#fff',
  outline: 'none'
};

const activeButtonStyle = {
  ...buttonsStyle,
  border: '1px solid #0cc',
  backgroundColor: '#0cc',
  color: '#fff'
};

const styles = {
  border: '1px solid gray',
  borderCollapse: 'collapse',
  padding: 10,
  userSelect: 'none'
};

const tableStyles = {
  ...styles,
  width: '100%',
  cursor: 'default'
};

class TableView extends Component {
  static getDataBindings(getters) {
    return {
      term: getters.content.term,
      content: getters.content.tableData,
      filtered: getters.content.filteredItems,
      selected: getters.content.selectedItems
    };
  }

  delayedFilter(callback) {
    if (this.caller) {
      window.clearTimeout(this.caller);
    }

    this.caller = window.setTimeout(callback, 150);
  }

  handleSelectAll(ev, checkboxState) {
    let selected = checkboxState.checked;

    if (checkboxState.indeterminate) {
      selected = false;
    }

    actions.content.toggleSelectAll({ selected });
  }

  handleSelect(ev) {
    actions.content.toggleSelect({
      selected: ev.target.checked,
      id: Number(ev.target.name)
    });
  }

  handleRowSelect(ev) {
    actions.content.toggleSelect({
      id: Number(ev.currentTarget.id.replace('row-', ''))
    });
  }

  handleFilter(ev) {
    const term = ev.target.value;

    if (term.length > 2 || !isNaN(Number(term))) {
      this.delayedFilter(() => {
        actions.content.filterResults({ term })
      });
    } else {
      actions.content.filterResults({ term: '' })
    }
  }

  resetFilter() {
    this.refs.FilterField.value = '';
    actions.content.filterResults({ term: '' });
  }

  componentDidMount() {
    actions.content.loadData();
  }

  render() {
    const { content, selected, filtered, term } = this.props;
    const loadedCount = content.size;
    let tableData = content;
    let isSelected = false;

    if (filtered && filtered.size > -1) {
      tableData = filtered;
    }

    return (
      <div style={{ position: 'relative', paddingTop: 100 }}>
        <div style={{ position: 'fixed', backgroundColor: '#fff', top: 0, left: 0, right: 0, padding: 10, borderBottom: '1px solid #efefef' }}>
          <div style={{ float: 'left' }}>
            <input
              ref='FilterField'
              placeholder='filter results'
              style={formControlsStyle}
              onChange={this.handleFilter.bind(this)}
              defaultValue={term}
            />

            <button
              type='button'
              style={removeButtonsStyle}
              onClick={this.resetFilter.bind(this)}
              dangerouslySetInnerHTML={{ __html: '&times;' }}
            />
          </div>

          <div style={{ float: 'right' }}>
            {selected && selected.size ? `${selected.size} items selected. ` : ''}
            <button
              type='button'
              style={(loadedCount === 20 ? activeButtonStyle : buttonsStyle)}
              onClick={() => actions.content.loadData(20)}
            >
              {(loadedCount === 20) ? 'Loaded' : 'Load'} 20 rows
            </button>
            <button
              type='button'
              style={(loadedCount === 100 ? activeButtonStyle : buttonsStyle)}
              onClick={() => actions.content.loadData(100)}
            >
              {(loadedCount === 100) ? 'Loaded' : 'Load'} 100 rows
            </button>
            <button
              type='button'
              style={(loadedCount === 250 ? activeButtonStyle : buttonsStyle)}
              onClick={() => actions.content.loadData(250)}
            >
              {(loadedCount === 250) ? 'Loaded' : 'Load'} 250 rows
            </button>
            <button
              type='button'
              style={(loadedCount === 500 ? activeButtonStyle : buttonsStyle)}
              onClick={() => actions.content.loadData(500)}
            >
              {(loadedCount === 500) ? 'Loaded' : 'Load'} 500 rows
            </button>
            <button
              type='button'
              style={(loadedCount === 1000 ? activeButtonStyle : buttonsStyle)}
              onClick={() => actions.content.loadData(1000)}
            >
              {(loadedCount === 1000) ? 'Loaded' : 'Load'} 1000 rows
            </button>
            {
              !loadedCount ? false : (
                <button
                  type='button'
                  style={removeButtonsStyle}
                  onClick={() => actions.content.loadData(0)}
                >
                  Remove rows
                </button>
              )
            }
          </div>
        </div>

        <table style={tableStyles}>
          <tbody>
            <tr style={{ fontWeight: 'bold' }}>
              <td style={{...styles, width: 20 }}>
                <SelectAll
                  onChange={this.handleSelectAll.bind(this)}
                  checked={loadedCount > 0 && selected.size === loadedCount}
                  indeterminate={selected.size > 0 && selected.size < loadedCount}
                />
              </td>
              <td style={{...styles, width: 30 }}>ID</td>
              <td style={styles}>Name</td>
              <td style={styles}>Owner</td>
              <td style={styles}>Type</td>
              <td style={styles}>Created on</td>
              <td style={styles}>Last modified</td>
            </tr>
            {
              tableData.map((row, index) => {
                const id = row.get('id');
                const name = row.get('name');
                const owner = row.get('owner');
                const type = row.get('type');
                const dateCreated = row.get('created_date');
                const dateModified = row.get('modified_date');

                let itemStyle = styles;
                isSelected = selected.contains(row.get('id'));

                if (isSelected) {
                  itemStyle = { ...itemStyle, backgroundColor: '#cff' };
                }

                return (
                  <TableRow
                    id={`row-${id}`}
                    key={`row-${index}`}
                    term={term}
                    isSelected={isSelected}
                    onClick={this.handleRowSelect.bind(this)}
                    style={ index % 2 ? { ...itemStyle, backgroundColor: '#f5f5f5' } : itemStyle }
                  >
                    <td style={itemStyle}>
                      <Checkbox checked={isSelected}/>
                    </td>
                    <td style={itemStyle}>
                      <Highlight label={id}/>
                    </td>
                    <td style={itemStyle}>
                      <Highlight label={name}/>
                    </td>
                    <td style={itemStyle}>
                      <Highlight label={owner}/>
                    </td>
                    <td style={itemStyle}>
                      <Highlight label={type}/>
                    </td>
                    <td style={itemStyle}>
                      <Highlight label={dateCreated}/>
                    </td>
                    <td style={itemStyle}>
                      <Highlight label={dateModified}/>
                    </td>
                  </TableRow>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default frux.connect(TableView);
