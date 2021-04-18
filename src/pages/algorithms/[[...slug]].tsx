import * as React from "react";
import { GetStaticProps } from "next";
import { join } from "path";
import fs from "fs-extra";
import { useRouter } from "next/router";

import { getPathsByMainPrefix } from "src/utils/getPostsPaths";
import PageLayout from "src/components/PageLayout";
import { Route } from "../../components/Sidebar";
import { prefixes } from "../../utils/constants";

interface AlgorithmsIndexProps {
  algoPaths: Route[];
  filteredAlgoPaths: Route[];
  fileContent: string | undefined;
}

const Index = ({
  algoPaths,
  filteredAlgoPaths,
  fileContent,
}: AlgorithmsIndexProps) => {
  const router = useRouter();
  const slug = (router.query.slug || []) as string[];

  return (
    <PageLayout
      fileContent={fileContent}
      resourcesPaths={filteredAlgoPaths}
      sidebarRoutes={algoPaths}
      slug={slug}
      prefix={prefixes.ALGORITHMS}
      title="Algorithms"
      pageDescription="An algorithm is an unambiguous specification of how to solve a class of problems. It is a set of rules that precisely define a sequence of operations."
    />
  );
};

export default Index;

export async function getStaticPaths() {
  const algorithmsReadmePaths = getPathsByMainPrefix(prefixes.ALGORITHMS);
  const categories = algorithmsReadmePaths.map((el) => ({
    params: { slug: el.categories },
  }));
  const paths = algorithmsReadmePaths.map((el) => ({
    params: { slug: el.shortSlug },
  }));

  return {
    paths: [{ params: { slug: [""] } }, ...categories, ...paths],
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const algoPaths = getPathsByMainPrefix(prefixes.ALGORITHMS);
  const slug = context?.params?.slug as undefined | string[];
  const filteredAlgoPaths = algoPaths.filter((algo) =>
    slug ? algo.categories.includes(slug[0]) : true,
  );
  const path = join(
    process.cwd(),
    "public",
    "data",
    "src",
    "algorithms",
    ...(slug || []),
    "README.md",
  );

  try {
    const fileContent = await fs.readFile(path, "utf-8");
    return {
      props: {
        algoPaths,
        filteredAlgoPaths,
        fileContent,
      },
    };
  } catch (err) {
    return {
      props: {
        algoPaths,
        filteredAlgoPaths,
      },
    };
  }
};
