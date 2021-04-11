export const fsm = {
  id: 'search-github-repositories',
  initial: 'idle',
  type: 'parallel',
  context: {
    page: 0,
    totalCount: 0,
    keyword: '',
    repositories: [],
    hasMore: false
  },
  states: {
    search: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            TYPING: {
              target: 'keyword'
            }
          }
        },
        keyword: {
          on: {
            RESET_RESULT: {
              target: 'idle',
              actions: ['cleanup']
            }
          },
          exit: 'updateKeyword'
        }
      }
    },
    fetch: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            FETCH: {
              target: 'pending',
              cond: 'checkHaveKeyword'
            }
          }
        },
        pending: {
          invoke: {
            id: 'fetchRepositoriesService',
            src: 'fetchRepositoriesService',
            onDone: {
              target: 'success',
              actions: ['fetchSuccess']
            },
            onError: {
              target: 'failure'
            }
          }
        },
        success: {
          on: {
            FETCH: {
              target: 'pending'
            }
          }
        },
        failure: {
          on: {
            RETRY: {
              target: 'pending',
              actions: ['cleanup']
            }
          }
        }
      }
    }
  }
};
