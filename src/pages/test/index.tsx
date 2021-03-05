import {
  Link as ChakraLink,
  Heading,
  Code,
  List,
  ListIcon,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import ReactMarkdown from "react-markdown";

import { Container } from "src/components/Container";
import { Main } from "src/components/Main";
import { DarkModeSwitch } from "src/components/DarkModeSwitch";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import md from "./README.md";

const Index = () => (
  <Container>
    <Main>
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
        {md}
      </ReactMarkdown>
      <List spacing={3} my={0}>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink
            isExternal
            href="https://chakra-ui.com"
            flexGrow={1}
            mr={2}
          >
            Chakra UI <LinkIcon />
          </ChakraLink>
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink isExternal href="https://nextjs.org" flexGrow={1} mr={2}>
            Next.js <LinkIcon />
          </ChakraLink>
        </ListItem>
      </List>
    </Main>

    <DarkModeSwitch />
  </Container>
);

export default Index;
