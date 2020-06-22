import { Machine } from 'xstate';

import { fsm } from './fsm';
import * as actions from './actions';
import * as guards from './guards';
import * as services from './services';

export const machine = Machine(fsm, { actions, guards, services });
