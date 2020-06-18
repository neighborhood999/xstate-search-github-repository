import { assign } from 'xstate';

export const fetchSuccess = assign({
  page: ctx => {
    const currentPage = ctx.page + 1;

    return Number(currentPage);
  },
  totalCount: (ctx, event) => {
    return Number(event.totalCount);
  },
  repositories: (ctx, event) => {
    return [...ctx.repositories, ...event.repos];
  }
});

export const updateKeyword = assign({
  keyword: (ctx, event) => {
    return String(event.keyword);
  }
});

export const cleanup = assign({
  page: () => {
    const resetPage = 0;

    return resetPage;
  },
  repositories: () => {
    const repos = [];

    return repos;
  }
});
