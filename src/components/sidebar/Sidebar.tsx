import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import _ from "lodash";
import {
  Badge,
  Box,
  Center,
  chakra,
  Flex,
  List,
  ListItem,
  ListProps,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Routes } from "src/utils/get-route-context";
// import { convertBackticksToInlineCode } from "utils/convert-backticks-to-inline-code";
import SidebarCategory from "./SidebarCategory";
import SidebarLink from "./SidebarLink";
import {
  BiNetworkChart,
  BiLayer,
  BiBookOpen,
  BiVideoRecording,
  BiGlasses,
} from "react-icons/bi";

export type SidebarContentProps = Routes & {
  pathname?: string;
  contentRef?: any;
};

export function SidebarContent(props: SidebarContentProps) {
  const { routes, pathname, contentRef } = props;
  return (
    <>
      {routes.map((lvl1, idx) => {
        return (
          <React.Fragment key={idx}>
            {lvl1.heading && (
              <chakra.h4
                fontSize="sm"
                fontWeight="bold"
                my="1.25rem"
                textTransform="uppercase"
                letterSpacing="wider"
                color={useColorModeValue("gray.700", "inherit")}
              >
                {lvl1.title}
              </chakra.h4>
            )}

            {lvl1?.routes?.map((lvl2, index) => {
              if (!lvl2.routes) {
                return (
                  <SidebarLink ml="-3" mt="2" key={lvl2.path} href={lvl2.path}>
                    {lvl2.title}
                  </SidebarLink>
                );
              }

              const selected = pathname?.startsWith(lvl2.path as string);
              const opened = selected || lvl2.open;

              const sortedRoutes = lvl2.sort
                ? _.sortBy(lvl2.routes, (i) => i.title)
                : lvl2.routes;

              return (
                <SidebarCategory
                  contentRef={contentRef}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                  // @ts-ignore
                  key={lvl2.path + index}
                  title={lvl2.title}
                  selected={selected}
                  opened={opened}
                >
                  <Stack as="ul">
                    {sortedRoutes.map((lvl3) => (
                      <SidebarLink as="li" key={lvl3.path} href={lvl3.path}>
                        <span>{lvl3.title}</span>
                        {lvl3.new && (
                          <Badge
                            ml="2"
                            lineHeight="tall"
                            fontSize="10px"
                            variant="solid"
                            colorScheme="purple"
                          >
                            New
                          </Badge>
                        )}
                      </SidebarLink>
                    ))}
                  </Stack>
                </SidebarCategory>
              );
            })}
          </React.Fragment>
        );
      })}
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const MainNavLink = ({ href, icon, children }) => {
  const { pathname } = useRouter();
  const [, group] = href.split("/");
  const active = pathname.includes(group);
  const linkColor = useColorModeValue("gray.900", "whiteAlpha.900");

  return (
    <NextLink href={href} passHref>
      <Flex
        as="a"
        align="center"
        fontSize="sm"
        fontWeight="semibold"
        transitionProperty="colors"
        transitionDuration="200ms"
        color={active ? linkColor : "gray.500"}
        _hover={{ color: linkColor }}
      >
        <Center w="6" h="6" bg="#FF8008" rounded="base" mr="3">
          {icon}
        </Center>
        {children}
      </Flex>
    </NextLink>
  );
};

const mainNavLinks = [
  {
    icon: <BiNetworkChart color="white" size={18} />,
    href: "/algorithms",
    label: "Algorithms",
  },
  {
    icon: <BiLayer color="white" size={18} />,
    href: "/data-structures",
    label: "Data Structures",
  },
  {
    icon: <BiBookOpen color="white" size={18} />,
    href: "/articles",
    label: "Articles",
  },
  {
    icon: <BiVideoRecording color="white" size={18} />,
    href: "/videos",
    label: "Videos",
  },
  {
    icon: <BiGlasses color="white" size={18} />,
    href: "/courses",
    label: "Courses",
  },
];

const MainNavLinkGroup = (props: ListProps) => {
  return (
    <List spacing="4" styleType="none" {...props}>
      {mainNavLinks.map((item) => (
        <ListItem key={item.label}>
          <MainNavLink icon={item.icon} href={item.href}>
            {item.label}
          </MainNavLink>
        </ListItem>
      ))}
    </List>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const Sidebar = ({ routes }) => {
  const { pathname } = useRouter();
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <Box
      ref={ref}
      as="nav"
      aria-label="Main Navigation"
      pos="sticky"
      sx={{
        overscrollBehavior: "contain",
      }}
      top="6.5rem"
      w="280px"
      h="calc(((100vh - 1.5rem) - 64px) - 42px);"
      pr="8"
      pb="8"
      pl="3"
      pt="8"
      overflowY="auto"
      className="sidebar-content"
      flexShrink={0}
      display={{ base: "none", md: "block" }}
    >
      <MainNavLinkGroup mb="10" />
      <SidebarContent routes={routes} pathname={pathname} contentRef={ref} />
    </Box>
  );
};

export default Sidebar;
