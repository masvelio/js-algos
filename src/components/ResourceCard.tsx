import {
  Badge,
  Box,
  BoxProps,
  Heading,
  Link,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import * as React from "react";
import styled from "@emotion/styled";

const StyledHeading = styled.span`
  text-transform: capitalize;
`;

export interface Resource {
  heading: string;
  type: "blog" | "talk" | "video";
  description: string;
  url: string;
  author: string;
  tags?: string[];
}

interface ResourceCardProps extends BoxProps {
  data: Resource;
  should?: boolean;
}

function ResourceCard({ data, should }: ResourceCardProps) {
  if (!should) {
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { description, url, categories, slug, name } = data;
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [prefix, ...newSlug] = slug;

  return (
    <Box maxW="360px">
      <Wrap className="algolia-exclude" spacing="3" mb="2" align="center">
        {categories?.map((category: string, index: number) => (
          <WrapItem key={index}>
            <Badge
              as="a"
              rel="tag"
              color={useColorModeValue("#FF8008", "#FF8008")}
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
        <Link href={newSlug?.join("/")}>
          <StyledHeading className="content">{name}</StyledHeading>
        </Link>
      </Heading>
      <Text lineHeight="tall" py={2} opacity={0.8}>
        {description}
      </Text>
    </Box>
  );
}

export default ResourceCard;
