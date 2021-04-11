import { Code, Heading, ListItem, UnorderedList, Link } from "@chakra-ui/react";
import * as React from "react";
import styled from "@emotion/styled";

const StyledCode = styled(Code)`
  white-space: pre-wrap;
`;

const getURL = (filename: string) => {
  return `https://github.com/search?l=&q=filename%3A${filename}+repo%3Atrekhleb%2Fjavascript-algorithms&type=code`;
};

const reactMarkdownRenderer = {
  heading: (props: { level: number; children: {} | null | undefined }) => {
    if (props.level === 1) {
      return <Heading as="h1">{props.children}</Heading>;
    }
    if (props.level === 2) {
      return <Heading>{props.children}</Heading>;
    }
    return <p>{props.children}</p>;
  },
  text: ({ value }: { value: string }) => <span>{value}</span>,
  link: (props: {
    href: string | undefined;
    node: { children: { value: React.ReactNode }[] };
  }) => {
    if (props?.href?.includes(".md")) {
      return "";
    }
    return (
      <Link
        href={props?.href?.includes(".js") ? getURL(props.href) : props.href}
        isExternal
        style={{
          textDecoration: "underline",
          textDecorationColor: "orange",
        }}
        _hover={{ color: "orange" }}
      >
        {props.node.children[0].value}
      </Link>
    );
  },
  code: ({ value }: { value: string }) => <StyledCode>{value}</StyledCode>,
  inlineCode: ({ value }: { value: string }) => <Code>{value}</Code>,
  list: (props: { children: React.ReactNode }) => {
    return (
      <UnorderedList pl="1rem">
        <ListItem>{props.children}</ListItem>
      </UnorderedList>
    );
  },
  blockquote: (props: { children: React.ReactNode }) => {
    return (
      <blockquote style={{ fontWeight: "bold", fontStyle: "italic" }}>
        {props.children}
      </blockquote>
    );
  },
  emphasis: (props: {
    node: { children: { value: string }[] };
    children: any;
  }) => {
    if (props.node.children[0].value === "Read this in other languages:") {
      return "";
    }
    return props.children;
  },
};

export default reactMarkdownRenderer;
