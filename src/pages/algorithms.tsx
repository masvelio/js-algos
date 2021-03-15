import * as React from "react";
// import _ from "lodash";
import { FaMicrophone } from "react-icons/fa";

import { Box, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import PageContainer from "src/components/PageContainer";
import ResourceCard, { Resource } from "src/components/ResourceCard";
import Sidebar from "src/components/sidebar/Sidebar";
// import resources from "src/resources.json";
import resourcesSidebar from "src/guides-sidebar.json";
import { GetStaticProps } from "next";
import { getPathsByMainSlug } from "../utils/getPostsPaths";

export function getRoutes(slug: string) {
  const configMap = {
    "/resources": resourcesSidebar,
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const [_, sidebar] =
    Object.entries(configMap).find(([path, _sidebar]) =>
      slug.startsWith(path),
    ) ?? [];

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return sidebar?.routes ?? [];
}

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
function Algorithms({ algoPaths }) {
  /**
   * Re-use the docs sidebar so it's easier for a visitors
   * to reference components mentioned in the resource blog/video.
   */
  const routes = getRoutes("/resources");
  // const data = resources.data as Resource[];
  // const groups = _.groupBy(data, "type");

  return (
    <PageContainer
      sidebar={<Sidebar routes={routes} />}
      frontmatter={{
        title: "Community Resources",
        description:
          "A rich compilation of technical descriptions and detailed information of how Chakra UI works.",
      }}
    >
      <Text mt="2">Algorithms!</Text>

      <Stack spacing="12">
        <ResourceSection
          title="Talks"
          resources={algoPaths}
          // resources={groups.talk}
          icon={FaMicrophone}
        />
      </Stack>
    </PageContainer>
  );
}

export default Algorithms;

export const getStaticProps: GetStaticProps = async () => {
  const algoPaths = getPathsByMainSlug("algorithms");

  return {
    props: {
      algoPaths,
    },
  };
};

interface ResourceSectionProps {
  title: string;
  icon: React.ElementType;
  resources: Resource[];
}

function ResourceSection({ resources }: ResourceSectionProps) {
  return (
    <Box as="section" mt="12">
      <SimpleGrid mt={8} columns={[1, 2]} spacing={8}>
        {resources.map((item, index) => (
          <ResourceCard key={index} data={item} should={true} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
