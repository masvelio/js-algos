import {
  Box,
  Button,
  Link as ChakraLink,
  chakra,
  Stack,
  Text,
  Link,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import * as React from "react";
import { DiGithubBadge } from "react-icons/di";
import { FaArrowRight } from "react-icons/fa";
import NextLink from "next/link";

import Container from "src/components/Container";
import { Footer } from "src/components/Footer";
import Header from "src/components/Header";
import SEO from "src/components/SEO";
import { createDirectoryTree } from "../utils/getPostsPaths";
import { GetStaticProps } from "next";
import { Main } from "../components/Main";
import { CheckCircleIcon } from "@chakra-ui/icons";

const HomePage = (props: any) => {
  const paths = props.paths.map((path: { params: { slug: any[] } }) =>
    path.params.slug.join("/"),
  );

  return (
    <>
      <SEO
        title="Algorithms and data structures implemented in JavaScript with explanations and links to further readings."
        description="Simple, Modular and Accessible UI Components for your React Applications. Built with Styled System"
      />
      <Header />

      <Box mb={20}>
        <Box
          as="section"
          pt={{ base: "10rem", md: "12rem" }}
          pb={{ base: "0", md: "5rem" }}
        >
          <Container>
            <Box textAlign="center">
              <chakra.h1
                maxW="16ch"
                mx="auto"
                fontSize={{ base: "2.25rem", sm: "3rem", lg: "4rem" }}
                fontFamily="heading"
                letterSpacing="tighter"
                fontWeight="extrabold"
                mb="16px"
                lineHeight="1.2"
              >
                Learn algorithms & data structures in
                <Box as="span"> </Box>
                <Text
                  as="span"
                  bgGradient="linear(to-l, #FF8008,#FFC837)"
                  bgClip="text"
                  fontSize={["6xl", "8xl"]}
                >
                  {"  "}JavaScript
                </Text>
              </chakra.h1>

              <Text
                maxW="560px"
                mx="auto"
                opacity={0.7}
                fontSize={{ base: "lg", lg: "xl" }}
                mt="6"
              >
                Algorithms and data structures implemented in JavaScript with
                explanations and links to further readings
              </Text>

              <Stack
                mt="10"
                spacing="4"
                justify="center"
                direction={{ base: "column", sm: "row" }}
              >
                <NextLink href="/resources" passHref>
                  <Button
                    h="4rem"
                    px="40px"
                    fontSize="1.2rem"
                    as="a"
                    size="lg"
                    colorScheme="orange"
                    rightIcon={<FaArrowRight fontSize="0.8em" />}
                  >
                    Get Started
                  </Button>
                </NextLink>
                <Button
                  as="a"
                  size="lg"
                  h="4rem"
                  px="40px"
                  fontSize="1.2rem"
                  href="https://github.com/chakra-ui/chakra-ui/"
                  target="__blank"
                  leftIcon={<DiGithubBadge size="1.5em" />}
                >
                  GitHub
                </Button>
              </Stack>
            </Box>
          </Container>

          <Container>
            <Box textAlign="center">
              <Main>
                <List spacing={3} my={0}>
                  {paths.map((p: string) => (
                    <Box key={p}>
                      <NextLink href={`/test/${p}`} passHref>
                        <ListItem as={Link}>
                          <ListIcon as={CheckCircleIcon} color="orange" />
                          <ChakraLink flexGrow={1} mr={2}>
                            {p}
                          </ChakraLink>
                        </ListItem>
                      </NextLink>
                    </Box>
                  ))}
                </List>
              </Main>
            </Box>
          </Container>
        </Box>

        <Footer />
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // const paths = await getPostsPaths();
  const tree = createDirectoryTree();
  const paths3 = tree.map((el) => ({ params: { slug: el.slug } }));

  return {
    props: {
      paths: paths3,
      tree,
    },
  };
};

export default HomePage;
