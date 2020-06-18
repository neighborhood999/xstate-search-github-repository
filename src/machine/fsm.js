export const fsm = {
  id: 'search-github-repositories',
  initial: 'idle',
  type: 'parallel',
  context: {
    page: 0,
    totalCount: 0,
    keyword: '',
    repositories: []
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
              target: 'pending'
            }
          }
        },
        pending: {
          on: {
            RESOLVE: {
              target: 'success',
              actions: ['fetchSuccess']
            },
            REJECT: {
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
