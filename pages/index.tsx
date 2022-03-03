import Container from '@components/Container';
import { Hero } from '@components/Hero';
import { List } from '@components/List';
import { Meta } from '@components/Meta';
import { SearchInput } from '@components/SearchInput';

function IndexPage() {
  return (
    <>
      <Meta />

      <Container>
        <Hero />
        <SearchInput />

        <List />
      </Container>
    </>
  );
}

export default IndexPage;
