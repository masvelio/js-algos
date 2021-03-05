import { join } from "path";
import glob from "glob-promise";
// import dirTree from "directory-tree";
// import getConfig from "next/config";
// const { serverRuntimeConfig } = getConfig();

const getPostsPaths = async () => {
  // console.log("dirTree", JSON.stringify(dirTree("./public/"), null, 2));
  // console.log("dirTree1", JSON.stringify(dirTree("./src/data"), null, 2));
  console.log(
    "dirTree1",
    JSON.stringify(await glob("public/**/README.md"), null, 2),
  );
  // console.log("dirTree2", JSON.stringify(dirTree("./public"), null, 2));
  // console.log(
  //   "dirTree3",
  //   JSON.stringify(dirTree(process.cwd() + "/public"), null, 2),
  // );
  // console.log(
  //   "dirTree4",
  //   JSON.stringify(dirTree(join(process.cwd(), "/public")), null, 2),
  // );
  // console.log(
  //   "dirTree5",
  //   JSON.stringify(dirTree(resolve(process.cwd(), "/public")), null, 2),
  // );
  // console.log(
  //   "dirTree6",
  //   JSON.stringify(
  //     dirTree(serverRuntimeConfig.PROJECT_ROOT + "/public"),
  //     null,
  //     2,
  //   ),
  // );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const algorithmsDir = join(process.cwd(), "public", "data", "algorithms");
  const dataStructuresDir = join(
    process.cwd(),
    "public",
    "data",
    "data-structures",
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const ddddd = join(serverRuntimeConfig.PROJECT_ROOT);
  // const ddddd2 = join(
  //   serverRuntimeConfig.PROJECT_ROOT,
  //   "./public/data/algorithms/",
  // );

  // console.log("ddddd", ddddd);
  // console.log("ddddd2", ddddd2);

  // const asd = resolve("./public", "data", "algorithms");
  // console.log("??????????? ", asd);

  // console.log("@@@ algorithmsDir", algorithmsDir);
  // console.log("@@@ dataStructuresDir", dataStructuresDir);

  // const tree = dirTree(asd, { extensions: /\.md/ });
  // const tree2 = dirTree(ddddd2, { extensions: /\.md/ });

  // console.log("????? tree", JSON.stringify(tree, null, 2));
  // console.log("????? tree2", JSON.stringify(tree2, null, 2));

  const algorithmsReadmeFiles = await glob(
    "public/data/algorithms/**/README.md",
  );
  // const algorithmsReadmeFiles2 = await glob(ddddd2 + "/**/README.md");
  // console.log("@@@ algorithmsReadmeFiles", algorithmsReadmeFiles);
  // console.log("@@@ algorithmsReadmeFiles2", algorithmsReadmeFiles2);
  const dataStructuresReadmeFiles = await glob(
    dataStructuresDir + "/**/README.md",
  );
  // console.log("@@@ dataStructuresReadmeFiles", algorithmsReadmeFiles);

  const mappedAlgorithmsReadmeFiles = algorithmsReadmeFiles.map((fullPath) => {
    // console.log("@@@ fullPath", fullPath);
    const index = fullPath.indexOf("algorithms");
    const short = fullPath.slice(index);
    const splitted = short.split("/");
    const slug = splitted.slice(0, splitted.length - 1);
    // console.log("@@@ slug", slug);

    return { params: { slug } };
  });

  // console.log("@@@ mappedAlgorithmsReadmeFiles", mappedAlgorithmsReadmeFiles);

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
