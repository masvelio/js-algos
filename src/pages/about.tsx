import * as React from "react";
import { Heading, Text, Link, LinkProps, useToken } from "@chakra-ui/react";

import PageContainer from "src/components/PageContainer";
import Sidebar from "src/components/Sidebar";
import Main from "src/components/Main";

const StyledLink = (props: LinkProps) => {
  const [brand] = useToken("colors", ["brand"]);
  return (
    <Link
      isExternal
      style={{
        textDecoration: "underline",
        textDecorationColor: brand,
      }}
      _hover={{ color: "brand" }}
      {...props}
    >
      {props.children}
    </Link>
  );
};

const About = () => {
  return (
    <PageContainer
      sidebar={<Sidebar routes={[]} />}
      frontmatter={{
        title: "About",
        description: "What this website is about?",
      }}
    >
      <Main>
        <Heading size="lg">About</Heading>
        <Text>
          Hi. I&apos;m Masvel, I&apos;m a Fullstack Javascript Developer. This
          site was created to firstly learn Next.js, and secondly to fulfill my
          goal of releasing my first product. Get to know me a little better{" "}
          <StyledLink href={"https://masvel.io/about"}>here</StyledLink>.
        </Text>
        <Text>
          The idea for this site came when I was browsing the repositories on
          Github with the most stars. Then I came across the
          <StyledLink
            href={"https://github.com/trekhleb/javascript-algorithms"}
          >
            {" "}
            javascript-algorithms
          </StyledLink>{" "}
          repository by trekhleb (
          <StyledLink href={"https://twitter.com/Trekhleb"}>
            Oleksii Trekhleb
          </StyledLink>
          ). I was delighted to see such valuable content that Oleksii and the
          community had gathered. So I thought that I could give this project a
          breath of fresh air.
        </Text>
        <Text>
          This site uses the javascript-algorithms repository as a git
          submodule, which is pulled and parsed when the application is built so
          that the algorithms and data structures can be displayed as a list and
          dedicated subpages. Besides it uses{" "}
          <StyledLink href={"https://nextjs.org/"}>Next.js</StyledLink> with
          Typescript as a main framework and{" "}
          <StyledLink href={"https://chakra-ui.com/"}>Chakra UI</StyledLink> for
          component library.
        </Text>
        <Text>
          Feel free to add some Articles or Courses by doing Pull Request{" "}
          <StyledLink href={"https://github.com/masvelio/js-algos"}>
            here
          </StyledLink>
          . Also feel free to drop me an email or message on any platform. If
          you like the content and want to keep an eye on my projects consider{" "}
          <StyledLink href={"https://www.buymeacoffee.com/masvelio"}>
            buying me a burger
          </StyledLink>{" "}
          and{" "}
          <StyledLink href={"https://masvel.io/subscribe"}>
            subscribing to my newsletter
          </StyledLink>
          .
        </Text>
      </Main>
    </PageContainer>
  );
};

export default About;
