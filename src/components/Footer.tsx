import React from "react";
import { Box, Icon, Text, Stack, Link } from "@chakra-ui/react";
import { IoLogoTwitter, IoLogoLinkedin } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { DiGithubBadge } from "react-icons/di";

type FooterLinkProps = {
  icon?: React.ElementType;
  href?: string;
  label?: string;
};

const FooterLink: React.FC<FooterLinkProps> = ({ icon, href, label }) => (
  <Link display="inline-block" href={href} aria-label={label} isExternal>
    <Icon as={icon} fontSize="xl" color="gray.400" />
  </Link>
);

const links = [
  {
    icon: DiGithubBadge,
    label: "GitHub",
    href: "https://github.com/masvelio/js-algos",
  },
  {
    icon: IoLogoTwitter,
    label: "Twitter",
    href: "https://twitter.com/maslankam92",
  },
  {
    icon: IoLogoLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/maslankamarcin/",
  },
  {
    icon: MdEmail,
    label: "Email",
    href: "mailto:me@masvel.io",
  },
];

export const Footer = () => (
  <Box as="footer" mt={12} textAlign="center">
    <Text fontSize="sm">
      <span>Proudly made in 🇵🇱</span>
    </Text>
    <Stack mt={4} direction="row" spacing="12px" justify="center">
      {links.map((link) => (
        <FooterLink key={link.href} {...link} />
      ))}
    </Stack>
  </Box>
);

export default Footer;
