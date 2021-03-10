import glob from "glob-promise";
import dirTree from "directory-tree";
import { join } from "path";

type ParamWithSlug = {
  params: { slug: string[] };
};

const fileCb = (path: any, readmePaths: any[]) => {
  // README.md means it only takes English version of the file is
  if (path.includes("README.md")) {
    readmePaths.push({ path });
  }
};

const beautifyString = (input: string) => input.split("-").join(" ");

const mapDashStringToPascalCase = (input: string[] | string) => {
  if (typeof input === "string") {
    return beautifyString(input);
  }

  return input.map(beautifyString);
};
const createSlugFromPath = (path: string) => {
  const index = path.indexOf("src");
  const short = path.slice(index);
  const splitted = short.split("/");
  const slug = splitted.slice(1, splitted.length - 1);
  const categories = slug.slice(0, slug.length - 1);
  const name = slug[slug.length - 1];
  const parsedName = mapDashStringToPascalCase(name);
  const parsedCategories = mapDashStringToPascalCase(categories);

  return { categories: parsedCategories, slug, name: parsedName };
};
const createListOfPages = (readmePaths: any[]) => {
  return readmePaths.map(({ path }) => {
    const { slug, categories, name } = createSlugFromPath(path);

    return {
      path,
      slug,
      categories,
      name,
      // description,
    };
  });
};

export const createDirectoryTree = () => {
  const path = join(process.cwd(), "public", "data", "src");
  const readmePaths: string | any[] = [];

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const tree = dirTree(path, { extensions: /\.md/ }, (_item, path) =>
    fileCb(path, readmePaths),
  );

  const obj = createListOfPages(readmePaths);

  return obj;
};

/**
 * @param {"algorithms" | "data-structures"} category
 * @param {string} fullPath eg. public/data/src/data-structures/tree/red-black-tree/README.md
 * @return {{ params: { slug: string[] }} eg. {params: { slug: [ 'data-structures', 'tree', 'red-black-tree' ]}}
 * */
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
