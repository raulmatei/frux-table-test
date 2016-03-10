import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Root from './root';
import NotFound from './not-found';
import TableView from './components/table-view';

export default (
  <Route path='/' component={Root}>
    <IndexRoute component={TableView}/>
    <Route path='show' component={TableView}/>
    <Route path='*' component={NotFound}/>
  </Route>
);