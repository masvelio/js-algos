import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import _ from "lodash";
import {
  Box,
  Center,
  Flex,
  List,
  ListItem,
  ListProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import SidebarLink from "./SidebarLink";
import { BiNetworkChart, BiLayer, BiBookOpen, BiGlasses } from "react-icons/bi";

import { prefixes } from "src/utils/constants";

export interface Route {
  categories: string[];
  description: string;
  name: string;
  path: string;
  shortSlug: string[];
  slug: string[];
}

export type PrefixType = "data-structures" | "algorithms" | undefined;

export interface SidebarContentProps {
  routes: Array<Route>;
  pathname: string;
  asPath: string;
  prefix: PrefixType;
}

export const SidebarContent = (props: SidebarContentProps) => {
  const { routes, asPath, prefix } = props;
  const groupByKey =
    prefix === prefixes.DATA_STRUCTURES ? "name" : "categories";
  const linkColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const groups = _.groupBy(routes, groupByKey);
  const splittedAsPath = asPath.split("/");
  const checkPath = splittedAsPath[splittedAsPath.length - 1];

  return (
    <>
      {Object.keys(groups).map((key) => {
        const href =
          prefix === prefixes.DATA_STRUCTURES
            ? `/${prefix}/${groups[key][0].shortSlug.join("/")}`
            : `/${prefix}/${key.replace(/ /gi, "-")}`;

        return (
          <SidebarLink ml="-3" mt="2" key={key} href={href}>
            <Text
              transitionProperty="colors"
              transitionDuration="200ms"
              textTransform="capitalize"
              color={decodeURI(checkPath) === key ? linkColor : "gray.500"}
              _hover={{ color: linkColor }}
            >
              {key}
            </Text>
          </SidebarLink>
        );
      })}
    </>
  );
};

interface MainNavLinkProps {
  href: string;
  icon: JSX.Element;
  children: string;
}

const MainNavLink = ({ href, icon, children }: MainNavLinkProps) => {
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
        <Center w="6" h="6" bg="brand" rounded="base" mr="3">
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

const Sidebar = ({
  routes,
  prefix,
}: {
  routes: Route[];
  prefix?: PrefixType;
}) => {
  const { pathname, asPath } = useRouter();
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
      <SidebarContent
        routes={routes}
        pathname={pathname}
        asPath={asPath}
        prefix={prefix}
      />
    </Box>
  );
};

export default Sidebar;
