import { dispatch, batch } from 'frux';
import {
  LOAD_DATA,
  TOGGLE_SELECT_ALL,
  TOGGLE_SELECT,
  FILTER_RESULTS
} from './action-types';

// TODO: maybe loading data in here is not wise, but it works for this PoC
const data = require('json!../../MOCK_DATA_1000.json');

export function loadData(payload = 20) {
  const output = [];

  for (let i = 0; i < payload; i++) {
    output.push(data[i]);
  }

  window.setTimeout(() => {
    batch(() => {
      dispatch({ type: LOAD_DATA, payload: { data: output }});
      dispatch({ type: FILTER_RESULTS, payload: { term: '' }});
    });
  }, 0);
}

export function toggleSelectAll(payload) {
  dispatch({ type: TOGGLE_SELECT_ALL, payload })
}

export function toggleSelect(payload) {
  dispatch({ type: TOGGLE_SELECT, payload })
}

export function filterResults(term) {
  dispatch({ type: FILTER_RESULTS, payload: term })
}
