import * as React from "react";

import { GetStaticProps } from "next";
import { join } from "path";
import fs from "fs-extra";
import { useRouter } from "next/router";

import { getPathsByMainPrefix } from "src/utils/getPostsPaths";
import PageLayout from "src/components/PageLayout";

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
function Index({
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  dataStructuresPaths,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  filteredDataStructuresPaths,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  fileContent,
}) {
  const router = useRouter();
  const slug = (router.query.slug || []) as string[];

  return (
    <PageLayout
      fileContent={fileContent}
      resourcesPaths={filteredDataStructuresPaths}
      sidebarRoutes={dataStructuresPaths}
      slug={slug}
      prefix="data-structures"
      title="Data Structures"
    />
  );
}

export default Index;

export async function getStaticPaths() {
  const dataStructuresReadmePaths = await getPathsByMainPrefix(
    "data-structures",
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
  const dataStructuresPaths = await getPathsByMainPrefix("data-structures");
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
