import { Hero } from '../Hero';
import { render } from '@test/test-utils';

describe('Hero', () => {
  it('should render the Hero with default title', () => {
    const { getByText } = render(<Hero />);

    expect(getByText('Search GitHub Repositories')).toBeInTheDocument();
  });

  it('should render the Hero with custom title', () => {
    const { getByText } = render(<Hero title="Hello, World" />);

    expect(getByText('Hello, World')).toBeInTheDocument();
  });
});
