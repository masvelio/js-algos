import {
  Badge,
  Box,
  Heading,
  Link,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import * as React from "react";
import styled from "@emotion/styled";
import NextLink from "next/link";
import ReactMarkdown from "react-markdown";
import { Route } from "./Sidebar";

const StyledHeading = styled(Link)`
  text-transform: capitalize;
`;

const ResourceCard = ({ data }: { data: Route }) => {
  const { description, categories, name, shortSlug } = data;
  return (
    <NextLink href={`${shortSlug?.join("/")}`}>
      <Box
        maxW="360px"
        borderWidth="1px"
        borderRadius="lg"
        p={6}
        boxShadow="md"
      >
        <Wrap spacing="3" mb="2" align="center">
          {categories?.map((category: string, index: number) => (
            <WrapItem key={index}>
              <Badge
                as="a"
                rel="tag"
                color="brand"
                textTransform="uppercase"
                fontSize="xs"
                fontWeight="bold"
              >
                {category}
              </Badge>
            </WrapItem>
          ))}
        </Wrap>
        <Heading as="h3" size="sm">
          <StyledHeading className="content">{name}</StyledHeading>
        </Heading>

        <Box py={2}>
          <Text lineHeight="tall" py={0} opacity={0.8} noOfLines={5}>
            <ReactMarkdown
              renderers={{
                strong: ({ children }) => children,
              }}
            >
              {description}
            </ReactMarkdown>
          </Text>
        </Box>
      </Box>
    </NextLink>
  );
};

export default ResourceCard;
