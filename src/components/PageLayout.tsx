import PageContainer from "./PageContainer";
import Sidebar from "./sidebar/Sidebar";
import { Main } from "./Main";
import {
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import * as React from "react";
import ResourceCard, { Resource } from "./ResourceCard";
import reactMarkdownRenderer from "src/utils/reactMarkdownRenderer";

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const PageLayout = ({ sidebarRoutes, fileContent, resourcesPaths, slug }) => {
  return (
    <PageContainer
      sidebar={<Sidebar routes={sidebarRoutes} prefix="data-structures" />}
      frontmatter={{
        title: "Community Resources",
        description:
          "A rich compilation of technical descriptions and detailed information of how Chakra UI works.",
      }}
    >
      {fileContent ? (
        <Main>
          <Breadcrumb separator="👉">
            {slug.map((el: string) => (
              <BreadcrumbItem key={el}>
                <Badge>{el}</Badge>
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
          <ReactMarkdown allowDangerousHtml renderers={reactMarkdownRenderer} plugins={[gfm]}>
            {fileContent}
          </ReactMarkdown>
        </Main>
      ) : (
        <Main>
          <Stack spacing="12">
            <ResourceSection resources={resourcesPaths} />
          </Stack>
        </Main>
      )}
    </PageContainer>
  );
};

interface ResourceSectionProps {
  resources: Resource[];
}

function ResourceSection({ resources }: ResourceSectionProps) {
  return (
    <Box as="section">
      <SimpleGrid minChildWidth={300} columns={[1, 2]} spacing={6}>
        {resources.map((item, index) => (
          <ResourceCard key={index} data={item} should={true} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default PageLayout;
