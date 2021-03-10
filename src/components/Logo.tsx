import React from "react";
import Image from "next/image";
import { useColorMode } from "@chakra-ui/react";

export const Logo = () => {
  const { colorMode } = useColorMode();

  return (
    <Image
      src={colorMode === "light" ? "/logo.svg" : "/logo-dark.svg"}
      alt="JS Algos logo"
      width={50}
      height={50}
    />
  );
};

export default Logo;
