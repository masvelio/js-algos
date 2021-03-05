import { join } from "path";
import glob from "glob-promise";
import dirTree from "directory-tree";

const getPostsPaths = async () => {
  const algorithmsDir = join(process.cwd(), "src", "data", "algorithms");
  const dataStructuresDir = join(
    process.cwd(),
    "src",
    "data",
    "data-structures",
  );

  console.log("@@@ algorithmsDir", algorithmsDir);
  console.log("@@@ dataStructuresDir", dataStructuresDir);

  const tree = dirTree(algorithmsDir, { extensions: /\.md/ });

  console.log("????? tree", JSON.stringify(tree, null, 2));

  const algorithmsReadmeFiles = await glob(algorithmsDir + "/**/README.md");
  console.log("@@@ algorithmsReadmeFiles", algorithmsReadmeFiles);
  const dataStructuresReadmeFiles = await glob(
    dataStructuresDir + "/**/README.md",
  );
  console.log("@@@ dataStructuresReadmeFiles", algorithmsReadmeFiles);

  const mappedAlgorithmsReadmeFiles = algorithmsReadmeFiles.map((fullPath) => {
    console.log("@@@ fullPath", fullPath);
    const index = fullPath.indexOf("algorithms");
    const short = fullPath.slice(index);
    const splitted = short.split("/");
    const slug = splitted.slice(0, splitted.length - 1);
    console.log("@@@ slug", slug);

    return { params: { slug } };
  });

  console.log("@@@ mappedAlgorithmsReadmeFiles", mappedAlgorithmsReadmeFiles);

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
