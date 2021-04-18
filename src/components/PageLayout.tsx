import * as React from "react";
import {
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import PageContainer from "./PageContainer";
import Sidebar, { PrefixType, Route } from "./Sidebar";
import Main from "./Main";
import ResourceCard from "./ResourceCard";
import reactMarkdownRenderer from "src/utils/reactMarkdownRenderer";

interface PageLayoutProps {
  sidebarRoutes: Route[];
  fileContent?: string;
  resourcesPaths: Route[];
  slug?: string[];
  prefix?: PrefixType;
  title: string;
  body?: () => JSX.Element[];
  pageDescription: string;
}

const PageLayout = ({
  sidebarRoutes,
  fileContent,
  resourcesPaths,
  slug,
  prefix,
  title,
  body,
  pageDescription,
}: PageLayoutProps) => {
  return (
    <PageContainer
      sidebar={<Sidebar routes={sidebarRoutes} prefix={prefix} />}
      frontmatter={{
        title,
        description: pageDescription,
      }}
    >
      {fileContent ? (
        <Main>
          <Breadcrumb separator="👉">
            {slug
              ?.map((el: string) => (
                <BreadcrumbItem key={el}>
                  <Badge>{el}</Badge>
                </BreadcrumbItem>
              ))
              .splice(0, slug.length - 1)}
          </Breadcrumb>
          <ReactMarkdown
            allowDangerousHtml
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            renderers={reactMarkdownRenderer}
            plugins={[gfm]}
          >
            {fileContent}
          </ReactMarkdown>
        </Main>
      ) : (
        <Main>
          <Heading size="lg">{title}</Heading>
          <Box as="section">
            <SimpleGrid minChildWidth={300} columns={[1, 2]} spacing={6}>
              {resourcesPaths.map((item: Route, index: number) => (
                <ResourceCard key={index} data={item} />
              ))}
              {body && body()}
            </SimpleGrid>
          </Box>
        </Main>
      )}
    </PageContainer>
  );
};

export default PageLayout;
