import { Stack, StackProps } from "@chakra-ui/react";

const Main = (props: StackProps) => (
  <Stack
    spacing="1.5rem"
    width="100%"
    maxWidth="48rem"
    px="1rem"
    mx="auto"
    {...props}
  />
);

export default Main;
