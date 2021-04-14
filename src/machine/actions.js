import { assign } from 'xstate';

import { PER_PAGE, handleResponse } from '../utils/api';

export const fetchSuccess = assign({
  page: ctx => {
    const currentPage = ctx.page + 1;

    return Number(currentPage);
  },
  totalCount: (ctx, event) => Number(event.data.total_count),
  repositories: (ctx, event) => {
    const repos = handleResponse(event.data);

    return [...ctx.repositories, ...repos];
  },
  hasMore: (ctx, event) => {
    if (ctx.page * PER_PAGE < Number(event.data.total_count)) {
      return true;
    }

    return false;
  },
});

export const updateKeyword = assign({
  keyword: (ctx, event) => String(event.keyword),
});

export const cleanup = assign({
  page: () => {
    const resetPage = 0;

    return resetPage;
  },
  repositories: () => {
    const repos = [];

    return repos;
  },
});
