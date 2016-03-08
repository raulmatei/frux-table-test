import frux from 'frux';
import React from 'react';
import content from './modules/content';
import TableView from './components/table-view';

export const { actions, getters } = frux.initialize({
  options: { debug: true },
  content
});

export function initialize(options) { 
  console.log(options);
  frux.mount(<TableView/>);
};
