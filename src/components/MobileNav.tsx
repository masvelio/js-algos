import * as React from "react";
import {
  Box,
  Center,
  CloseButton,
  Flex,
  HStack,
  VStack,
  IconButton,
  IconButtonProps,
  useBreakpointValue,
  useColorModeValue,
  useUpdateEffect,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { AiOutlineMenu } from "react-icons/ai";
import { RemoveScroll } from "react-remove-scroll";

import Logo from "./Logo";
import BuyBurgerBtn from "./BuyBurgerBtn";
import useRouteChanged from "src/hooks/useRouteChanged";

const NavLink: React.FC<{ href: string }> = ({ href, children }) => {
  const { pathname } = useRouter();
  const [, group] = href.split("/");
  const isActive = pathname.includes(group);

  return (
    <NextLink href={href}>
      <Center
        flex="1"
        minH="40px"
        as="button"
        rounded="md"
        transition="0.2s all"
        fontWeight={isActive ? "semibold" : "medium"}
        bg={isActive ? "brand" : undefined}
        borderWidth={isActive ? undefined : "1px"}
        color={isActive ? "white" : undefined}
        px={2}
        _hover={{
          bg: isActive
            ? "brand"
            : useColorModeValue("gray.100", "whiteAlpha.100"),
        }}
      >
        {children}
      </Center>
    </NextLink>
  );
};

interface MobileNavContentProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const MobileNavContent = (props: MobileNavContentProps) => {
  const { isOpen, onClose } = props;
  const closeBtnRef = React.useRef<HTMLButtonElement>();

  useRouteChanged(onClose);

  const showOnBreakpoint = useBreakpointValue({ base: true, lg: false });

  React.useEffect(() => {
    if (showOnBreakpoint == false) {
      if (onClose) {
        onClose();
      }
    }
  }, [showOnBreakpoint]);

  useUpdateEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus();
      });
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <RemoveScroll forwardProps>
          <motion.div
            transition={{ duration: 0.08 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Flex
              direction="column"
              w="100%"
              bg={useColorModeValue("white", "gray.800")}
              h="100vh"
              overflow="auto"
              pos="absolute"
              top="0"
              left="0"
              zIndex={20}
              pb="8"
            >
              <Box>
                <Flex justify="space-between" px="6" pt="5" pb="4">
                  <Logo />
                  <HStack spacing="5">
                    <BuyBurgerBtn display="flex" />
                    {/*@ts-ignore*/}
                    <CloseButton ref={closeBtnRef} onClick={onClose} />
                  </HStack>
                </Flex>
                <VStack align="stretch" px={5} mt={10}>
                  <NavLink href="/algorithms">Algorithms</NavLink>
                  <NavLink href="/data-structures">Data Structures</NavLink>
                  <NavLink href="/articles">Articles</NavLink>
                  <NavLink href="/courses">Courses</NavLink>
                </VStack>
              </Box>
            </Flex>
          </motion.div>
        </RemoveScroll>
      )}
    </AnimatePresence>
  );
};

export const MobileNavButton = React.forwardRef(
  (props: IconButtonProps, ref: React.Ref<any>) => {
    return (
      <IconButton
        ref={ref}
        display={{ base: "flex", md: "none" }}
        fontSize="20px"
        color={useColorModeValue("gray.800", "inherit")}
        variant="ghost"
        icon={<AiOutlineMenu />}
        {...props}
      />
    );
  },
);
