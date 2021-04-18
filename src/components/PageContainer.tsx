import * as React from "react";
import { Box } from "@chakra-ui/react";
import { SkipNavContent } from "@chakra-ui/skip-nav";

import Container from "src/components/Container";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import SEO from "src/components/SEO";
import PageTransition from "src/components/PageTransition";

interface PageContainerProps {
  frontmatter: {
    title: string;
    description: string;
  };
  children: React.ReactNode;
  sidebar?: any;
}

const PageContainer = (props: PageContainerProps) => {
  const { frontmatter, children, sidebar } = props;

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
            </Box>
            <Footer />
          </div>
        </Box>
      </Container>
    </>
  );
};

export default PageContainer;
