import glob from "glob-promise";

/**
 * @param {"algorithms" | "data-structures"} category
 * @param {string} fullPath eg. public/data/src/data-structures/tree/red-black-tree/README.md
 * @return {{ params: { slug: string[] }} eg. {params: { slug: [ 'data-structures', 'tree', 'red-black-tree' ]}}
 * */

type ParamWithSlug = {
  params: { slug: string[] };
};

const getSlugFromPath = (
  category: "algorithms" | "data-structures",
  fullPath: string,
): ParamWithSlug => {
  const index = fullPath.indexOf(category);
  const short = fullPath.slice(index);
  const splitted = short.split("/");
  const slug = splitted.slice(0, splitted.length - 1);

  return { params: { slug } };
};

const getPostsPaths = async (): Promise<Array<ParamWithSlug>> => {
  const algorithmsReadmeFiles = await glob(
    "public/data/src/algorithms/**/README.md",
  );

  const dataStructuresReadmeFiles = await glob(
    "public/data/src/data-structures/**/README.md",
  );

  const mappedAlgorithmsReadmeFiles = algorithmsReadmeFiles.map((fullPath) =>
    getSlugFromPath("algorithms", fullPath),
  );

  const mappedDataStructuresReadmeFiles = dataStructuresReadmeFiles.map(
    (fullPath) => getSlugFromPath("data-structures", fullPath),
  );

  return [...mappedAlgorithmsReadmeFiles, ...mappedDataStructuresReadmeFiles];
};

export default getPostsPaths;
