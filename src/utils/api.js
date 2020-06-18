import fetch from 'isomorphic-unfetch';

const API = 'https://api.github.com/search/repositories';

export const PER_PAGE = 12;

export async function searchGithubRepos(query = {}) {
  if (!query.q) return;

  const {
    q,
    page = 1,
    per_page = PER_PAGE,
    sort = 'stars',
    order = 'desc'
  } = query;

  const api = `${API}?q=${q}&page=${page}&per_page=${per_page}&sort=${sort}&order=${order}`;

  const data = await fetch(api).then(res => res.json());

  return data;
}

export function handleResponse(data) {
  return data.items.map(item => ({
    id: item.id,
    name: item.name,
    htmlURL: item.html_url,
    stars: item.stargazers_count,
    language: item.language,
    description: item.description,
    forksCount: item.forks_count
  }));
}
