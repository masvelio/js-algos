import * as React from "react";

import PageContainer from "../components/PageContainer";
import Sidebar from "../components/sidebar/Sidebar";
import { Main } from "../components/Main";
import { Heading, Text, Link } from "@chakra-ui/react";

function About() {
  return (
    <PageContainer
      sidebar={<Sidebar routes={[]} />}
      frontmatter={{
        title: "Community Resources",
        description:
          "A rich compilation of technical descriptions and detailed information of how Chakra UI works.",
      }}
    >
      <Main>
        <Heading size="lg">About</Heading>
        <Text>
          Hi. I&apos;m Masvel, I&apos;m a Fullstack Javascript Developer. This
          site was created to firstly learn Next.js, and secondly to fulfill my
          goal of releasing my first product. Get to know me a little better{" "}
          <Link
            href={"https://masvel.io/about"}
            isExternal
            style={{
              textDecoration: "underline",
              textDecorationColor: "orange",
            }}
            _hover={{ color: "orange" }}
          >
            here
          </Link>
          .
        </Text>
        <Text>
          The idea for this site came when I was browsing the repositories on
          Github with the most stars. Then I came across the
          <Link
            href={"https://github.com/trekhleb/javascript-algorithms"}
            isExternal
            style={{
              textDecoration: "underline",
              textDecorationColor: "orange",
            }}
            _hover={{ color: "orange" }}
          >
            {" "}
            javascript-algorithms
          </Link>{" "}
          repository by trekhleb (
          <Link
            href={"https://twitter.com/Trekhleb"}
            isExternal
            style={{
              textDecoration: "underline",
              textDecorationColor: "orange",
            }}
            _hover={{ color: "orange" }}
          >
            Oleksii Trekhleb
          </Link>
          ). I was delighted to see such valuable content that Oleksii and the
          community had gathered. So I thought that I could give this project a
          breath of fresh air.
        </Text>
        <Text>
          This site uses the javascript-algorithms repository as a git
          submodule, which is pulled and parsed when the application is built so
          that the algorithms and data structures can be displayed as a list and
          dedicated subpages. Besides it uses{" "}
          <Link
            href={"https://nextjs.org/"}
            isExternal
            style={{
              textDecoration: "underline",
              textDecorationColor: "orange",
            }}
            _hover={{ color: "orange" }}
          >
            Next.js
          </Link>{" "}
          with Typescript as a main framework and{" "}
          <Link
            href={"https://chakra-ui.com/"}
            isExternal
            style={{
              textDecoration: "underline",
              textDecorationColor: "orange",
            }}
            _hover={{ color: "orange" }}
          >
            Chakra UI
          </Link>{" "}
          for component library.
        </Text>
        <Text>
          Feel free to add some Articles or Courses by doing Pull Request{" "}
          <Link
            href={"https://github.com/masvelio/js-algos"}
            isExternal
            style={{
              textDecoration: "underline",
              textDecorationColor: "orange",
            }}
            _hover={{ color: "orange" }}
          >
            here
          </Link>
          . Also feel free to drop me an email or message on any platform. If
          you like the content and want to keep an eye on my projects consider{" "}
          <Link
            href={"https://www.buymeacoffee.com/masvelio"}
            isExternal
            style={{
              textDecoration: "underline",
              textDecorationColor: "orange",
            }}
            _hover={{ color: "orange" }}
          >
            buying me a burger
          </Link>{" "}
          and{" "}
          <Link
            href={"https://masvel.io/subscribe"}
            isExternal
            style={{
              textDecoration: "underline",
              textDecorationColor: "orange",
            }}
            _hover={{ color: "orange" }}
          >
            subscribing to my newsletter
          </Link>
          .
        </Text>
      </Main>
    </PageContainer>
  );
}

export default About;
