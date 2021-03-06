import glob from "glob-promise";

const getSlugFromPath = (
  category: "algorithms" | "data-structures",
  fullPath: string,
) => {
  const index = fullPath.indexOf(category);
  const short = fullPath.slice(index);
  const splitted = short.split("/");
  const slug = splitted.slice(0, splitted.length - 1);

  return { params: { slug } };
};

const getPostsPaths = async () => {
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
