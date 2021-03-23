import * as React from "react";
// import _ from "lodash";
import { FaMicrophone } from "react-icons/fa";

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
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import PageContainer from "src/components/PageContainer";
import ResourceCard, { Resource } from "src/components/ResourceCard";
import Sidebar from "src/components/sidebar/Sidebar";
import resourcesSidebar from "src/guides-sidebar.json";
import { GetStaticProps } from "next";
import { getPathsByMainSlug } from "src/utils/getPostsPaths";
import { join } from "path";
import fs from "fs-extra";
import { Main } from "../../components/Main";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
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

const StyledCode = styled(Code)`
  white-space: pre-wrap;
`;

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
function Index({ algoPaths, fileContent }) {
  const router = useRouter();
  const slug = (router.query.slug || []) as string[];
  return (
    <PageContainer
      sidebar={<Sidebar routes={algoPaths} />}
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
        <>
          <Text mt="2">Algorithms!</Text>
          <Stack spacing="12">
            <ResourceSection
              title="Talks"
              resources={algoPaths}
              icon={FaMicrophone}
            />
          </Stack>
        </>
      )}
    </PageContainer>
  );
}

export default Index;

export async function getStaticPaths() {
  const algoPaths = getPathsByMainSlug("algorithms");
  const categories = algoPaths.map((el) => ({
    params: { slug: el.categories },
  }));
  const paths = algoPaths.map((el) => {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [prefix, ...rest] = el.slug;
    return { params: { slug: rest } };
  });

  return {
    paths: [...categories, ...paths],
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const algoPaths = getPathsByMainSlug("algorithms");
  const slug = context?.params?.slug as string[];
  const path = join(
    process.cwd(),
    "public",
    "data",
    "src",
    "algorithms",
    ...slug,
    "README.md",
  );

  try {
    const fileContent = await fs.readFile(path, "utf-8");
    return {
      props: {
        algoPaths,
        fileContent,
      },
    };
  } catch (err) {
    return {
      props: {
        algoPaths,
      },
    };
  }
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
