import { Flex, Heading } from "@chakra-ui/react";

export const Hero = ({ title }: { title: string }) => (
  <Flex justifyContent="center" alignItems="center">
    <Heading textAlign="center" maxW="960px" fontSize="5vw">
      {title}
    </Heading>
  </Flex>
);

Hero.defaultProps = {
  title: "JavaScript Algorithms & Data Structures",
};
