import { assign } from 'xstate';
import { createModel } from 'xstate/lib/model';

import { createXStateContext } from '@utils/createXStateContext';
import { PER_PAGE, searchGithubRepos, Repository } from '@utils/api';

export const globalStateModel = createModel(
  {
    page: 0,
    totalCount: 0,
    keyword: '',
    repositories: [] as Repository[],
    hasMore: false,
  },
  {
    events: {
      TYPING: () => ({}),
      FETCH: () => ({}),
      RETRY: () => ({}),
      RESET_RESULT: (keyword: string) => ({ keyword }),
    },
  },
);

export const globalStateMachine = globalStateModel.createMachine(
  {
    id: 'search-github-repositories',
    initial: 'idle',
    type: 'parallel',
    states: {
      search: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              TYPING: {
                target: 'keyword',
              },
            },
          },
          keyword: {
            on: {
              RESET_RESULT: {
                target: 'idle',
                actions: [
                  assign((ctx, event) => {
                    if (event.type !== 'RESET_RESULT') {
                      return {
                        keyword: ctx.keyword,
                        page: 0,
                        repositories: [],
                      };
                    }

                    return {
                      keyword: String(event.keyword),
                      page: 0,
                      repositories: [],
                    };
                  }),
                ],
              },
            },
          },
        },
      },
      fetch: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              FETCH: {
                target: 'pending',
              },
            },
          },
          pending: {
            invoke: {
              src: 'fetchRepositoriesService',
              onDone: {
                target: 'success',
                actions: [
                  assign({
                    page: (ctx) => {
                      const currentPage = ctx.page + 1;

                      return Number(currentPage);
                    },
                    totalCount: (_, event) => Number(event.data.totalCount),
                    repositories: (ctx, event) => {
                      return [...ctx.repositories, ...event.data.repositories];
                    },
                    hasMore: (ctx, event) => {
                      if (ctx.page * PER_PAGE < Number(event.data.totalCount)) {
                        return true;
                      }

                      return false;
                    },
                  }),
                  (ctx) => console.log(ctx),
                ],
              },
              onError: {
                target: 'failure',
              },
            },
          },
          success: {
            on: {
              FETCH: {
                target: 'pending',
              },
            },
          },
          failure: {
            on: {
              RETRY: {
                target: 'pending',
                actions: ['cleanup'],
              },
            },
          },
        },
      },
    },
  },
  {
    actions: {},
    services: {
      fetchRepositoriesService: (ctx) => {
        const query = {
          q: ctx.keyword,
          page: ctx.page + 1,
        };

        return searchGithubRepos(query);
      },
    },
  },
);

export const [GlobalStateProvider, useGlobalStateService] =
  createXStateContext(globalStateMachine);
