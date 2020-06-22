import { searchGithubRepos } from '../utils/api';

export const fetchRepositoriesService = ctx => {
  const query = {
    q: ctx.keyword,
    page: ctx.page + 1
  };

  return searchGithubRepos(query);
};
