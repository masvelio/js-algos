import {
  Badge,
  Box,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

interface CardBoxProps {
  additional?: boolean;
  description: string;
  title: string;
  url: string;
  badge?: string[];
}

const CardBox = ({ item }: { item: CardBoxProps }) => (
  <LinkBox key={item.url} style={{ opacity: item.additional ? "0.5" : 1 }}>
    <Box
      maxW={["full", "full", "360px"]}
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      boxShadow="md"
      h={200}
    >
      <Wrap spacing="3" mb="2" align="center">
        <WrapItem>
          {item.badge?.map((el: string) => (
            <Badge
              key={el}
              as="a"
              rel="tag"
              color="brand"
              textTransform="uppercase"
              fontSize="xs"
              fontWeight="bold"
            >
              {el}
            </Badge>
          ))}
        </WrapItem>
      </Wrap>
      <Heading as="h3" size="sm" noOfLines={2} minH="40px">
        {item.title}
      </Heading>

      <Box py={2}>
        <Text lineHeight="tall" py={0} opacity={0.8} noOfLines={3}>
          <LinkOverlay href={item.url} isExternal>
            {item.description}
          </LinkOverlay>
        </Text>
      </Box>
    </Box>
  </LinkBox>
);

export default CardBox;
