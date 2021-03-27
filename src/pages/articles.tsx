import * as React from "react";

import { Text } from "@chakra-ui/react";
import PageContainer from "src/components/PageContainer";
import Sidebar from "src/components/sidebar/Sidebar";
import resourcesSidebar from "src/guides-sidebar.json";

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

function Articles() {
  /**
   * Re-use the docs sidebar so it's easier for a visitors
   * to reference components mentioned in the resource blog/video.
   */
  const routes = getRoutes("/resources");

  return (
    <PageContainer
      sidebar={<Sidebar routes={routes} />}
      frontmatter={{
        title: "Community Resources",
        description:
          "A rich compilation of technical descriptions and detailed information of how Chakra UI works.",
      }}
    >
      <Text mt="2">Articles</Text>
      <Text mt="2">Coming soon</Text>
    </PageContainer>
  );
}

export default Articles;
