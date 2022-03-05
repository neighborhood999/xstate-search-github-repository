import { Card } from '../Card';
import { render } from '@test/test-utils';
import type { Repository } from '@utils/api';

describe('Card', () => {
  it('should render the Card', () => {
    const repo: Repository = {
      id: 1,
      nodeId: 'abcdefg-123',
      stars: '2',
      forksCount: 1,
      name: 'foo bar bar',
      description: 'foobar',
      language: 'typescript',
      htmlURL: 'https://github.com',
    };

    const { getByText } = render(<Card {...repo} />);

    expect(getByText(repo.name)).toBeInTheDocument();
    expect(getByText(repo.description)).toBeInTheDocument();
    expect(getByText(repo.stars)).toBeInTheDocument();
    expect(getByText(repo.forksCount)).toBeInTheDocument();
  });
});
