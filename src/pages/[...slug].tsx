import {
  Heading,
  Code,
  UnorderedList,
  ListItem,
  Breadcrumb,
  Badge,
  BreadcrumbItem,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import fs from "fs-extra";
import { join } from "path";
import gfm from "remark-gfm";

import { Container } from "src/components/Container";
import { Main } from "src/components/Main";
import { DarkModeSwitch } from "src/components/DarkModeSwitch";
import { createDirectoryTree } from "src/utils/getPostsPaths";
import styled from "@emotion/styled";

const StyledCode = styled(Code)`
  white-space: pre-wrap;
`;

const Slug = (props: any) => {
  const router = useRouter();
  const slug = (router.query.slug || []) as string[];

  return (
    <Container>
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
          {props.fileContent}
        </ReactMarkdown>
      </Main>

      <DarkModeSwitch />
    </Container>
  );
};

export default Slug;

export async function getStaticPaths() {
  const paths2 = await createDirectoryTree();
  const paths3 = paths2.map((el) => ({ params: { slug: el.slug } }));

  return {
    paths: paths3,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug as string[];

  const path = join(
    process.cwd(),
    "public",
    "data",
    "src",
    ...slug,
    "README.md",
  );

  const fileContent = await fs.readFile(path, "utf-8");

  return {
    props: {
      fileContent,
    },
  };
};
