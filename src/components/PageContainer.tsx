import { useRouter } from "next/router";
import * as React from "react";
import { Badge, Box, chakra } from "@chakra-ui/react";
import { SkipNavContent, SkipNavLink } from "@chakra-ui/skip-nav";
import Container from "src/components/Container";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import SEO from "src/components/SEO";
import { convertBackticksToInlineCode } from "src/utils/convert-backticks-to-inline-code";
import PageTransition from "src/components/PageTransition";

function useHeadingFocusOnRouteChange() {
  const router = useRouter();

  React.useEffect(() => {
    const onRouteChange = () => {
      const [heading] = Array.from(document.getElementsByTagName("h1"));
      heading?.focus();
    };
    router.events.on("routeChangeComplete", onRouteChange);
    return () => {
      router.events.off("routeChangeComplete", onRouteChange);
    };
  }, []);
}

interface PageContainerProps {
  frontmatter: {
    slug?: string;
    title: string;
    description?: string;
    editUrl?: string;
    version?: string;
  };
  children: React.ReactNode;
  sidebar?: any;
  pagination?: any;
}

function PageContainer(props: PageContainerProps) {
  const { frontmatter, children, sidebar, pagination } = props;
  useHeadingFocusOnRouteChange();

  const { title, description, version } = frontmatter;

  return (
    <>
      <SEO title={title} description={description} />
      <SkipNavLink zIndex={20}>Skip to Content</SkipNavLink>
      <Header />
      <Container as="main" className="main-content">
        <Box display={{ base: "block", md: "flex" }}>
          {sidebar || null}
          <div style={{ flex: 1 }}>
            <SkipNavContent />
            <Box
              id="content"
              pt={3}
              px={5}
              mt="4.5rem"
              mx="auto"
              maxW="48rem"
              minH="76vh"
            >
              <PageTransition>
                <chakra.h1 tabIndex={-1} outline={0} apply="mdx.h1">
                  {/*// @ts-ignore*/}
                  {convertBackticksToInlineCode(title)}
                </chakra.h1>
                {version && (
                  <Badge colorScheme="teal" letterSpacing="wider">
                    v{version}
                  </Badge>
                )}
                {children}
              </PageTransition>
              {pagination || null}
            </Box>
            <Footer />
          </div>
        </Box>
      </Container>
    </>
  );
}

export default PageContainer;
