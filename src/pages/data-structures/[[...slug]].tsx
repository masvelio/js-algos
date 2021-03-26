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
function Index({
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  dataStructuresPaths,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  filteredDataStructuresPaths,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  fileContent,
}) {
  const router = useRouter();
  const slug = (router.query.slug || []) as string[];
  return (
    <PageContainer
      sidebar={
        <Sidebar routes={dataStructuresPaths} prefix="data-structures" />
      }
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
          <Stack spacing="12">
            <ResourceSection
              title="Talks"
              resources={filteredDataStructuresPaths}
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
  const dataStructuresReadmePaths = getPathsByMainPrefix("data-structures");
  const categories = dataStructuresReadmePaths.map((el) => ({
    params: { slug: el.categories },
  }));
  const paths = dataStructuresReadmePaths.map((el) => ({
    params: { slug: el.shortSlug },
  }));

  return {
    paths: [{ params: { slug: [""] } }, ...categories, ...paths],
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const dataStructuresPaths = getPathsByMainPrefix("data-structures");
  const slug = context?.params?.slug as undefined | string[];
  const filteredDataStructuresPaths = dataStructuresPaths.filter(
    (dataStructure) =>
      slug ? dataStructure.categories.includes(slug[0]) : true,
  );
  const path = join(
    process.cwd(),
    "public",
    "data",
    "src",
    "data-structures",
    ...(slug || []),
    "README.md",
  );

  try {
    const fileContent = await fs.readFile(path, "utf-8");
    return {
      props: {
        dataStructuresPaths,
        filteredDataStructuresPaths,
        fileContent,
      },
    };
  } catch (err) {
    return {
      props: {
        dataStructuresPaths,
        filteredDataStructuresPaths,
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
