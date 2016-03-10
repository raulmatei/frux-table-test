import { Immutable, toImmutable } from 'nuclear-js';
import * as ActionTypes from './action-types';

function handleLoadData(currentState, payload) {
  return currentState.set('data', toImmutable(payload.data));
}

function handleToggleSelectAll(currentState, payload) {
  let selectedSet = Immutable.Set([]);

  if (!payload.selected) {
    return currentState.set('selectedItems', selectedSet);
  }

  currentState.get('data').map((item) => {
    selectedSet = selectedSet.add(item.get('id'));
  });

  return currentState.set('selectedItems', selectedSet);
}

function handleToggleSelect(currentState, payload) {
  let selectedSet = currentState.get('selectedItems');

  if (!payload.selected && selectedSet.contains(payload.id)) {
    selectedSet = selectedSet.remove(payload.id);
  } else {
    selectedSet = selectedSet.add(payload.id);
  }

  return currentState.set('selectedItems', selectedSet);
}

function handleFilterResults(currentState, payload) {
  const { term } = payload;

  let filtered = currentState.get('data').filter((item) => {
    const id = item.get('id').toString().toLowerCase();
    const name = item.get('name').toLowerCase();
    const owner = item.get('owner').toLowerCase();
    const type = item.get('type').toLowerCase();
    const createdDate = item.get('created_date').toLowerCase();
    const modifiedDate = item.get('modified_date').toLowerCase();
    const str = term.toLowerCase();

    return (
      id.includes(str) || name.includes(str) ||
      owner.includes(str) || type.includes(str) ||
      createdDate.includes(str) || modifiedDate.includes(str)
    );
  });

  return currentState.withMutations((state) => {
    return state
      .set('filteredResults', filtered)
      .set('term', term)
  });
}


export default {
  [ActionTypes.LOAD_DATA]: handleLoadData,
  [ActionTypes.TOGGLE_SELECT]: handleToggleSelect,
  [ActionTypes.TOGGLE_SELECT_ALL]: handleToggleSelectAll,
  [ActionTypes.FILTER_RESULTS]: handleFilterResults
};