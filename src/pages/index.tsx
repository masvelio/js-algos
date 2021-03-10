// import {
//   Link as ChakraLink,
//   List,
//   Box,
//   ListIcon,
//   ListItem,
//   Link,
// } from "@chakra-ui/react";
// import { CheckCircleIcon } from "@chakra-ui/icons";
// import { GetStaticProps } from "next";
// import NextLink from "next/link";
// import { Hero } from "../components/Hero";
// import { Container } from "../components/Container";
// import { Main } from "../components/Main";
// import { DarkModeSwitch } from "../components/DarkModeSwitch";
// import getPostsPaths from "../utils/getPostsPaths";
//
// const Index = (props: { paths: any[] }) => {
//   const paths = props.paths.map((path) => path.params.slug.join("/"));
//   return (
//     <Container height="100vh">
//       <Hero />
//       <Main>
//         <List spacing={3} my={0}>
//           {paths.map((p: string) => (
//             <Box key={p}>
//               <NextLink href={`/test/${p}`} passHref>
//                 <ListItem as={Link}>
//                   <ListIcon as={CheckCircleIcon} color="green.500" />
//                   <ChakraLink flexGrow={1} mr={2}>
//                     {p}
//                   </ChakraLink>
//                 </ListItem>
//               </NextLink>
//             </Box>
//           ))}
//         </List>
//       </Main>
//
//       <DarkModeSwitch />
//     </Container>
//   );
// };
//
// export default Index;
//
// export const getStaticProps: GetStaticProps = async () => {
//   const paths = await getPostsPaths();
//
//   return {
//     props: {
//       paths,
//     },
//   };
// };

import {
  Box,
  Button,
  Link as ChakraLink,
  Center,
  chakra,
  Img,
  Stack,
  Text,
  Link,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { DiGithubBadge } from "react-icons/di";
import { FaArrowRight } from "react-icons/fa";
import NextLink from "next/link";

import { DarkModeSwitch } from "src/components/DarkModeSwitch";
import Container from "src/components/Container";
import { Footer } from "src/components/Footer";
import Header from "src/components/Header";
import SEO from "src/components/SEO";
import { createDirectoryTree } from "../utils/getPostsPaths";
import { GetStaticProps } from "next";
import { Main } from "../components/Main";
import { Hero } from "../components/Hero";
import { CheckCircleIcon } from "@chakra-ui/icons";

const HomePage = (props: any) => {
  const paths = props.paths.map((path: { params: { slug: any[] } }) =>
    path.params.slug.join("/"),
  );

  return (
    <>
      <SEO
        title="Chakra UI - A simple, modular and accessible component library that gives you the building blocks you need to build your React applications."
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
                Build accessible React apps
                <Box
                  as="span"
                  color={useColorModeValue("teal.500", "teal.300")}
                >
                  {" "}
                </Box>
                <Text
                  as="span"
                  bgGradient="linear(to-l, #7928CA,#FF0080)"
                  bgClip="text"
                  fontSize="6xl"
                  fontWeight="extrabold"
                >
                  {"  "} with speed
                </Text>
              </chakra.h1>

              <Text
                maxW="560px"
                mx="auto"
                opacity={0.7}
                fontSize={{ base: "lg", lg: "xl" }}
                mt="6"
              >
                Chakra UI is a simple, modular and accessible component library
                that gives you the building blocks you need to build your React
                applications.
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
                    colorScheme="teal"
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

            <Center>
              <Box
                display="inline-block"
                mt="70px"
                rounded="xl"
                bg="green.50"
                shadow="base"
                px="6"
                py="4"
              >
                <Img h="55px" src="/git-nation-badge.png" />
              </Box>
            </Center>
          </Container>

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
