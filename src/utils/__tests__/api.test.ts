import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { searchGithubRepos } from '../api';

const server = setupServer(
  rest.get('https://api.github.com/search/repositories', (req, res, ctx) => {
    return res(
      ctx.json({
        total_count: 2,
        incomplete_results: false,
        items: [
          {
            id: 1,
            forks_count: 1,
            node_id: 'node_id',
            name: 'react',
            html_url: 'html_url',
            stargazers_count: 1,
            language: 'JavaScript',
            description:
              'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
          },
          {
            id: 2,
            forks_count: 1,
            node_id: 'node_id',
            name: 'TypeScript',
            html_url: 'html_url',
            stargazers_count: 1,
            language: 'TypeScript',
            description:
              'TypeScript is a superset of JavaScript that compiles to clean JavaScript output. ',
          },
        ],
      }),
    );
  }),
);

describe('SearchGithubRepos', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should get the query result from mock API', async () => {
    const query = {
      q: 'javascript',
    };

    const { repositories } = await searchGithubRepos(query);
    expect(repositories).toHaveLength(2);
  });

  it('should get empty result when query is empty', async () => {
    const query = {
      q: '',
    };

    const { repositories } = await searchGithubRepos(query);
    expect(repositories).toHaveLength(0);
  });
});
