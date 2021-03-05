import { join } from "path";
import glob from "glob-promise";

const getPostsPaths = async () => {
  const algorithmsDir = join(process.cwd(), "src", "data", "algorithms");
  const dataStructuresDir = join(
    process.cwd(),
    "src",
    "data",
    "data-structures",
  );

  console.log('algorithmsDir', algorithmsDir);
  console.log('dataStructuresDir', dataStructuresDir);

  const algorithmsReadmeFiles = await glob(algorithmsDir + "/**/README.md");
  const dataStructuresReadmeFiles = await glob(
    dataStructuresDir + "/**/README.md",
  );

  const mappedAlgorithmsReadmeFiles = algorithmsReadmeFiles.map((fullPath) => {
    const index = fullPath.indexOf("algorithms");
    const short = fullPath.slice(index);
    const splitted = short.split("/");
    const slug = splitted.slice(0, splitted.length - 1);
    return { params: { slug } };
  });

  const mappedDataStructuresReadmeFiles = dataStructuresReadmeFiles.map(
    (fullPath) => {
      const index = fullPath.indexOf("data-structures");
      const short = fullPath.slice(index);
      const splitted = short.split("/");
      const slug = splitted.slice(0, splitted.length - 1);
      return { params: { slug } };
    },
  );

  return [...mappedAlgorithmsReadmeFiles, ...mappedDataStructuresReadmeFiles];
};

export default getPostsPaths;
