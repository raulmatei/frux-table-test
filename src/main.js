import frux from 'frux';
import content from './modules/content';
import { browserHistory } from 'react-router';
import { initializeRouter } from './router';

export const { actions, getters } = frux.initialize({
  options: { debug: true },
  content
});

export function initialize(options) { 
  const history = browserHistory;
  const router = initializeRouter({ history });

  frux.mount(router);
};
