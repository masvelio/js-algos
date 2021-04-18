import * as React from "react";

import { GetStaticProps } from "next";
import { join } from "path";
import fs from "fs-extra";
import { useRouter } from "next/router";

import { getPathsByMainPrefix } from "src/utils/getPostsPaths";
import PageLayout from "src/components/PageLayout";
import { prefixes } from "../../utils/constants";
import { Route } from "../../components/Sidebar";

interface DataStructuresIndexProps {
  dataStructuresPaths: Route[];
  filteredDataStructuresPaths: Route[];
  fileContent: string | undefined;
}

const Index = ({
  dataStructuresPaths,
  filteredDataStructuresPaths,
  fileContent,
}: DataStructuresIndexProps) => {
  const router = useRouter();
  const slug = (router.query.slug || []) as string[];

  return (
    <PageLayout
      fileContent={fileContent}
      resourcesPaths={filteredDataStructuresPaths}
      sidebarRoutes={dataStructuresPaths}
      slug={slug}
      prefix={prefixes.DATA_STRUCTURES}
      title="Data Structures"
    />
  );
};

export default Index;

export async function getStaticPaths() {
  const dataStructuresReadmePaths = await getPathsByMainPrefix(
    prefixes.DATA_STRUCTURES,
  );
  const categories = dataStructuresReadmePaths.map((el) => ({
    params: { slug: el.categories },
  }));
  const paths = dataStructuresReadmePaths.map((el) => ({
    params: { slug: el.shortSlug },
  }));

  return {
    paths: [{ params: { slug: [""] } }, ...categories, ...paths],
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const dataStructuresPaths = await getPathsByMainPrefix(
    prefixes.DATA_STRUCTURES,
  );
  const slug = context?.params?.slug as undefined | string[];
  const filteredDataStructuresPaths = dataStructuresPaths.filter(
    (dataStructure) =>
      slug ? dataStructure.categories.includes(slug[0]) : true,
  );
  const path = join(
    process.cwd(),
    "public",
    "data",
    "src",
    "data-structures",
    ...(slug || []),
    "README.md",
  );

  try {
    const fileContent = await fs.readFile(path, "utf-8");
    return {
      props: {
        dataStructuresPaths,
        filteredDataStructuresPaths,
        fileContent,
      },
    };
  } catch (err) {
    return {
      props: {
        dataStructuresPaths,
        filteredDataStructuresPaths,
      },
    };
  }
};
