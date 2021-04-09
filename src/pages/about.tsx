import * as React from "react";

import PageContainer from "../components/PageContainer";
import Sidebar from "../components/sidebar/Sidebar";
import { Main } from "../components/Main";
import { Heading, Text, Stack } from "@chakra-ui/react";

function About() {
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
          <Heading size="lg">About</Heading>
          <Text>halo</Text>
        </Stack>
      </Main>
    </PageContainer>
  );
}

export default About;
