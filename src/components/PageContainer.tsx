import { useRouter } from "next/router";
import * as React from "react";
import { Box } from "@chakra-ui/react";
import { SkipNavContent } from "@chakra-ui/skip-nav";
import Container from "src/components/Container";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import SEO from "src/components/SEO";
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

  const { title, description } = frontmatter;

  return (
    <>
      <SEO title={title} description={description} />
      <Header />
      <Container as="main">
        <Box display={{ base: "block", md: "flex" }}>
          {sidebar || null}
          <div style={{ flex: 1 }}>
            <SkipNavContent />
            <Box
              id="content"
              pt={3}
              px={[0, 5]}
              mt="4.5rem"
              mx="auto"
              maxW="48rem"
              minH="76vh"
            >
              <PageTransition>{children}</PageTransition>
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
