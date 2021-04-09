import * as React from "react";

import PageContainer from "../components/PageContainer";
import Sidebar from "../components/sidebar/Sidebar";
import { Main } from "../components/Main";
import {
  Box,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";

const resources = [
  {
    title: "A Practical Guide to Algorithms with JavaScript",
    description:
      "Bored by the academic approach of most data structures and algorithms courses? This is for you! You'll learn to solve algorithms and analyze space and time complexity in both an interview setting and in your day-to-day development. ",
    url: "https://frontendmasters.com/courses/practical-algorithms/",
  },
  {
    title: "Data Structures and Algorithms in JavaScript",
    description:
      "This course teaches you how to implement your first data structures and algorithms. In the process, you’ll learn some fundamental computer science concepts as well.",
    url:
      "https://egghead.io/courses/data-structures-and-algorithms-in-javascript",
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    description:
      "While HTML and CSS control the content and styling of a page, JavaScript is used to make it interactive. In the JavaScript Algorithm and Data Structures Certification, you'll learn the fundamentals of JavaScript including variables, arrays, objects, loops, and functions.",
    url:
      "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
  },
  {
    title: "JavaScript Algorithms - The Fundamentals",
    description:
      "Learn all the core basics and fundamentals about JavaScript algorithms, dive into tons of examples and get a plan for building and measuring algorithms.",
    url: "https://pro.academind.com/p/javascript-algorithms-the-fundamentals",
  },
  {
    title:
      "Data Structures and Algorithms in JavaScript - Full Course for Beginners",
    description:
      "Learn common data structures and algorithms in this tutorial course. You will learn the theory behind them, as well as how to program them in JavaScript.",
    url:
      "https://www.youtube.com/watch?v=t2CEgPsws3U&ab_channel=freeCodeCamp.org",
  },
  {
    title: "The Ultimate Guide to JavaScript Algorithms Courses",
    description:
      "Over the years, JavaScript has grown tremendously from the fancy client-side language capable of enhancing web pages through stunning interactivity into a reliable language generally adopted for development across multiple platforms.",
    url:
      "https://scotch.io/courses/the-ultimate-guide-to-javascript-algorithms",
  },
];
function Courses() {
  return (
    <PageContainer
      sidebar={<Sidebar routes={[]} />}
      frontmatter={{
        title: "Community Resources",
        description:
          "A rich compilation of technical descriptions and detailed information of how Chakra UI works.",
      }}
    >
      <Main>
        <Stack spacing="12">
          <Heading size="lg">Courses</Heading>
          <Box as="section">
            <SimpleGrid minChildWidth={[200, 300]} columns={[1, 2]} spacing={6}>
              {resources.map((item) => (
                <LinkBox key={item.url}>
                  <Box
                    maxW={["full", "full", "360px"]}
                    borderWidth="1px"
                    borderRadius="lg"
                    p={6}
                    boxShadow="md"
                    h={170}
                  >
                    <Heading as="h3" size="sm" noOfLines={2} minH="40px">
                      {item.title}
                    </Heading>
                    <Box py={2}>
                      <Text
                        lineHeight="tall"
                        py={0}
                        opacity={0.8}
                        noOfLines={3}
                      >
                        <LinkOverlay href={item.url} isExternal>
                          {item.description}
                        </LinkOverlay>
                      </Text>
                    </Box>
                  </Box>
                </LinkBox>
              ))}
            </SimpleGrid>
          </Box>
          s{" "}
        </Stack>
      </Main>
    </PageContainer>
  );
}

export default Courses;
