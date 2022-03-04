import fetch from 'isomorphic-unfetch';

export interface SearchGithubRepos {
  q: string;
  page?: number;
  perPage?: number;
  sort?: 'starts' | 'forks' | 'updated';
  order?: 'desc' | 'asc';
}

export interface Repository {
  id: number;
  forksCount: number;
  nodeId: string;
  name: string;
  htmlURL: string;
  stars: string;
  language: string;
  description: string;
}

export interface RepositoriesResponse {
  total_count: number;
  incomplte_results: boolean;
  items: Array<{
    id: number;
    forks_count: number;
    node_id: string;
    name: string;
    html_url: string;
    stargazers_count: string;
    language: string;
    description: string;
  }>;
}

export const API = 'https://api.github.com/search/repositories';
export const PER_PAGE = 16;

export function searchGithubRepos(query: SearchGithubRepos) {
  if (!query.q) {
    return;
  }

  const {
    q,
    page = 1,
    perPage = PER_PAGE,
    sort = 'stars',
    order = 'desc',
  } = query;

  const api = `${API}?q=${encodeURIComponent(
    q,
  )}&page=${page}&per_page=${perPage}&sort=${sort}&order=${order}`;

  return fetch(api)
    .then((res) => res.json())
    .then((data: RepositoriesResponse) => ({
      totalCount: data.total_count,
      repositories: data.items.map((item) => ({
        id: item.id,
        name: item.name,
        htmlURL: item.html_url,
        stars: item.stargazers_count,
        language: item.language,
        description: item.description,
        forksCount: item.forks_count,
      })),
    }))
    .catch((error) => {
      console.error(error);
    });
}
