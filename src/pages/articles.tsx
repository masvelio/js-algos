import * as React from "react";

import PageContainer from "../components/PageContainer";
import Sidebar from "../components/sidebar/Sidebar";
import { Main } from "../components/Main";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  LinkBox,
  LinkOverlay,
  Wrap,
  WrapItem,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";

const resources = [
  {
    title: "A Guide to JavaScript Algorithms",
    description:
      "A Quick Guide to Writing JavaScript Graph and Tree Traversal Algorithms",
    url:
      "https://blog.bitsrc.io/a-guide-to-javascript-algorithms-search-4d653be3dca2",
    author: "Rajat S",
  },
  {
    title: "8 Tips to help you better optimize your JavaScript algorithms.",
    description:
      "Logic accounts as the most significant factor affecting the speed and performance of any given algorithm. ",
    url:
      "https://levelup.gitconnected.com/8-tips-to-help-you-better-optimize-your-javascript-algorithms-c226871193fc",
    author: "Daniel N",
  },
  {
    title: "5 JavaScript Algorithms You Should Know How To Solve",
    description: "5 Beginner JavaScript Algorithms With Examples",
    url:
      "https://levelup.gitconnected.com/8-tips-to-help-you-better-optimize-your-javascript-algorithms-c226871193fc",
    author: "Daniel N",
  },
  {
    title: "Algorithms in JavaScript",
    description: "40 Problems, Solutions, and Explanations",
    url:
      "https://levelup.gitconnected.com/8-tips-to-help-you-better-optimize-your-javascript-algorithms-c226871193fc",
    author: "Daniel N",
  },
  {
    title: "Here Are the Most Common JavaScript Algorithms and Data Structures",
    description:
      "Level up your JavaScript with these algorithms and data structures",
    url:
      "https://betterprogramming.pub/here-are-the-most-common-javascript-algorithms-and-data-structures-ec3729050169",
    author: "Trevor Lasn",
  },
  {
    title: "6 JavaScript data structures you must know",
    description:
      "When solving coding problems, efficiency is paramount – from the number of coding hours to runtime, to the amount of memory devoted to a solution.",
    url: "https://www.educative.io/blog/javascript-data-structures",
    author: "Amanda Fawcett",
  },
  {
    title: "Data Structures in JavaScript",
    description:
      "As business logic moves from the back to the front more and more, expertise in Frontend Engineering becomes ever more crucial. As Frontend Engineers, we depend on view libraries like React to be productive.",
    url:
      "https://medium.com/siliconwat/data-structures-in-javascript-1b9aed0ea17c",
    author: "Thon Ly",
  },
  {
    title: "Add your article!",
    description:
      "Are you an author or maybe you know good resource? Add this article to the list clicking here!",
    // todo change url
    url:
      "https://medium.com/siliconwat/data-structures-in-javascript-1b9aed0ea17c",
    additional: true,
  },
];

function Articles() {
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
        <Heading size="lg">Articles</Heading>
        <Box as="section">
          <SimpleGrid minChildWidth={[200, 300]} columns={[1, 2]} spacing={6}>
            {resources.map((item) => (
              <LinkBox
                key={item.url}
                style={{ opacity: item.additional ? "0.5" : 1 }}
              >
                <Box
                  maxW={["full", "full", "360px"]}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={6}
                  boxShadow="md"
                  h={200}
                >
                  <Wrap spacing="3" mb="2" align="center">
                    <WrapItem>
                      <Badge
                        as="a"
                        rel="tag"
                        color={useColorModeValue("#FF8008", "#FF8008")}
                        textTransform="uppercase"
                        fontSize="xs"
                        fontWeight="bold"
                      >
                        {item.author}
                      </Badge>
                    </WrapItem>
                  </Wrap>
                  <Heading as="h3" size="sm" noOfLines={2} minH="40px">
                    {item.title}
                  </Heading>

                  <Box py={2}>
                    <Text lineHeight="tall" py={0} opacity={0.8} noOfLines={3}>
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
      </Main>
    </PageContainer>
  );
}

export default Articles;
