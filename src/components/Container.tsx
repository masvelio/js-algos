import { Box, BoxProps } from "@chakra-ui/react";

const Container = (props: BoxProps) => (
  <Box
    w="full"
    pb="12"
    pt="3"
    maxW={{ base: "xl", md: "7xl" }}
    mx="auto"
    px={{ base: "6", md: "8" }}
    mt={12}
    {...props}
  />
);

export default Container;
