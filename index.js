import frux from 'frux';
import * as main from './src/main';

const App = {
  actions: main.actions,
  initialize: main.initialize
};

if (process.env.NODE_ENV === 'development') {
  App.serialize = frux.serialize;
}

global.app = App;
