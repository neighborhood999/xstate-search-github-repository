import { Machine } from 'xstate';

import { fsm } from './fsm';
import * as actions from './actions';

export const machine = Machine(fsm, { actions });
