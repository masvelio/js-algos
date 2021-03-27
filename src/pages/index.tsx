import { Box, Button, chakra, Stack, Text } from "@chakra-ui/react";
import * as React from "react";
import { FaArrowRight } from "react-icons/fa";
import NextLink from "next/link";

import Container from "src/components/Container";
import { Footer } from "src/components/Footer";
import Header from "src/components/Header";
import SEO from "src/components/SEO";

const HomePage = () => {
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
                <NextLink href="/algorithms" passHref>
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
              </Stack>
            </Box>
          </Container>
        </Box>

        <Footer />
      </Box>
    </>
  );
};

export default HomePage;
