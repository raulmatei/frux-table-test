import { Immutable } from 'nuclear-js';
import frux from 'frux';

import contentHandlers from './handlers';
import * as actions from './actions';
import * as getters from './getters';


const initialState = {
  data: [],
  selectedItems: Immutable.Set([]),
  filteredResults: null,
  term: ''
};

const stores = {
  content: frux.createStore(initialState, contentHandlers)
};

export default frux.createModule({ stores, actions, getters });
