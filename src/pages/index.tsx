import {
  Link as ChakraLink,
  List,
  Box,
  ListIcon,
  ListItem,
  Link,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { GetStaticProps } from "next";
import NextLink from "next/link";
import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import getPostsPaths from "../utils/getPostsPaths";

const Index = (props: { paths: any[] }) => {
  const paths = props.paths.map((path) => path.params.slug.join("/"));
  return (
    <Container height="100vh">
      <Hero />
      <Main>
        <List spacing={3} my={0}>
          {paths.map((p: string) => (
            <Box key={p}>
              <NextLink href={`/test/${p}`} passHref>
                <ListItem as={Link}>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  <ChakraLink flexGrow={1} mr={2}>
                    {p}
                  </ChakraLink>
                </ListItem>
              </NextLink>
            </Box>
          ))}
        </List>
      </Main>

      <DarkModeSwitch />
    </Container>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const paths = await getPostsPaths();

  return {
    props: {
      paths,
    },
  };
};
