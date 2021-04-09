import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = {
  mono: `'Menlo', monospace`,
  body: "Poppins",
};

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const styles = {
  global: (props: { colorMode: string }) => ({
    body: {
      color: props.colorMode === "dark" ? "white" : "gray.font",
      background: props.colorMode === "dark" ? "purple.1000" : "white",
      gray: {
        font: "#353f4b",
      },
    },
  }),
};

const theme = extendTheme({
  colors: {
    black: "#16161D",
    purple: {
      1000: "#100818",
    },
  },
  fonts,
  breakpoints,
  styles,
});

export default theme;
