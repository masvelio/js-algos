import * as React from "react";
import {
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Code,
  Heading,
  ListItem,
  SimpleGrid,
  Stack,
  UnorderedList,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { join } from "path";
import fs from "fs-extra";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import PageContainer from "src/components/PageContainer";
import ResourceCard, { Resource } from "src/components/ResourceCard";
import Sidebar from "src/components/sidebar/Sidebar";
import { getPathsByMainPrefix } from "src/utils/getPostsPaths";
import { Main } from "src/components/Main";

const StyledCode = styled(Code)`
  white-space: pre-wrap;
`;

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
function Index({ algoPaths, filteredAlgoPaths, fileContent }) {
  const router = useRouter();
  const slug = (router.query.slug || []) as string[];
  return (
    <PageContainer
      sidebar={<Sidebar routes={algoPaths} prefix="algorithms" />}
      frontmatter={{
        title: "Community Resources",
        description:
          "A rich compilation of technical descriptions and detailed information of how Chakra UI works.",
      }}
    >
      {fileContent ? (
        <Main>
          <Breadcrumb separator="👉">
            {slug.map((el) => (
              <BreadcrumbItem key={el}>
                <Badge>{el}</Badge>
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
          <ReactMarkdown
            renderers={{
              heading: (props) => {
                if (props.level === 1) {
                  return <Heading as="h1">{props.children}</Heading>;
                }
                if (props.level === 2) {
                  return <Heading>{props.children}</Heading>;
                }
                return <p>{props.children}</p>;
              },
              text: ({ value }) => <span>{value}</span>,
              link: (props) => (
                <a href={props.href} style={{ background: "orange" }}>
                  {props.node.children[0].value}
                </a>
              ),
              code: ({ value }) => <StyledCode>{value}</StyledCode>,
              inlineCode: ({ value }) => <Code>{value}</Code>,
              list: (props) => {
                return (
                  <UnorderedList>
                    <ListItem>{props.children}</ListItem>
                  </UnorderedList>
                );
              },
            }}
            plugins={[gfm]}
          >
            {fileContent}
          </ReactMarkdown>
        </Main>
      ) : (
        <Main>
          <Stack spacing="12">
            <ResourceSection resources={filteredAlgoPaths} />
          </Stack>
        </Main>
      )}
    </PageContainer>
  );
}

export default Index;

export async function getStaticPaths() {
  const algorithmsReadmePaths = getPathsByMainPrefix("algorithms");
  const categories = algorithmsReadmePaths.map((el) => ({
    params: { slug: el.categories },
  }));
  const paths = algorithmsReadmePaths.map((el) => ({
    params: { slug: el.shortSlug },
  }));

  return {
    paths: [{ params: { slug: [""] } }, ...categories, ...paths],
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const algoPaths = getPathsByMainPrefix("algorithms");
  const slug = context?.params?.slug as undefined | string[];
  const filteredAlgoPaths = algoPaths.filter((algo) =>
    slug ? algo.categories.includes(slug[0]) : true,
  );
  const path = join(
    process.cwd(),
    "public",
    "data",
    "src",
    "algorithms",
    ...(slug || []),
    "README.md",
  );

  try {
    const fileContent = await fs.readFile(path, "utf-8");
    return {
      props: {
        algoPaths,
        filteredAlgoPaths,
        fileContent,
      },
    };
  } catch (err) {
    return {
      props: {
        algoPaths,
        filteredAlgoPaths,
      },
    };
  }
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
