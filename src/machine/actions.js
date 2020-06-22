import { assign } from 'xstate';

import { handleResponse } from '../utils/api';

export const fetchSuccess = assign({
  page: ctx => {
    const currentPage = ctx.page + 1;

    return Number(currentPage);
  },
  totalCount: (ctx, event) => {
    return Number(event.data.total_count);
  },
  repositories: (ctx, event) => {
    const repos = handleResponse(event.data);

    return [...ctx.repositories, ...repos];
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
