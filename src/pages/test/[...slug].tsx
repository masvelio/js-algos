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
import fs from "fs-extra";
import getConfig from "next/config";
const { serverRuntimeConfig } = getConfig();

import { Container } from "src/components/Container";
import { Main } from "src/components/Main";
import { DarkModeSwitch } from "src/components/DarkModeSwitch";

import { GetStaticProps } from "next";
import { join } from "path";
import getPostsPaths from "../../utils/getPostsPaths";
import glob from "glob-promise";

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
            code: ({ value }) => <Code>{value}</Code>,
            inlineCode: ({ value }) => <Code>{value}</Code>,
            list: (props) => {
              return (
                <UnorderedList>
                  <ListItem>{props.children}</ListItem>
                </UnorderedList>
              );
            },
          }}
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
  const paths = await getPostsPaths();
  // console.log("paths", JSON.stringify(paths, null, 2));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  console.log(
    "dirTree122",
    JSON.stringify(await glob("public/**/README.md"), null, 2),
  );

  const path = join(
    process.cwd(),
    "public",
    "data",
    "src",
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    ...context.params.slug,
    "README.md",
  );
  console.log("$$$$$ path", path);
  console.log("$$$$$ context.params.slug", context?.params?.slug);

  console.log(
    "serverRuntimeConfig.PROJECT_ROOT",
    serverRuntimeConfig.PROJECT_ROOT,
  );

  try {
    const fileContent = await fs.readFile(
      join(
        serverRuntimeConfig.PROJECT_ROOT,
        "./public/data/",
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        ...context.params.slug,
        "README.md",
      ),
      "utf-8",
    );

    console.log("fileContent", fileContent);
    return {
      props: {
        posts: [],
        slug: [],
        fileContent,
      },
    };
  } catch (err) {
    console.log("error", err);
    return {
      props: {
        posts: [],
        slug: [],
        fileContent: "error",
      },
    };
  }

  // const fileContent = fs.readFileSync(path, "utf-8");

  // return {
  //   props: {
  //     posts: [],
  //     slug: [],
  //     fileContent,
  //   },
  // };
};
