import dirTree from "directory-tree";
import { join } from "path";

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
  const shortSlug = slug.slice(1, splitted.length);
  const categories = slug.slice(1, slug.length - 1);
  const name = slug[slug.length - 1];
  const parsedName = mapDashStringToPascalCase(name);
  const parsedCategories = mapDashStringToPascalCase(categories);
  const description =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when";

  return {
    categories: parsedCategories,
    slug,
    shortSlug,
    name: parsedName,
    description,
  };
};
const createListOfPages = (readmeFilePaths: any[]) => {
  return readmeFilePaths.map(({ path }) => {
    const {
      slug,
      shortSlug,
      categories,
      name,
      description,
    } = createSlugFromPath(path);

    return {
      shortSlug,
      path,
      slug,
      categories,
      name,
      description,
    };
  });
};

const createDirectoryTree = () => {
  const path = join(process.cwd(), "public", "data", "src");
  const readmeFilePaths: string | any[] = [];

  dirTree(path, { extensions: /\.md/ }, (_item, path) =>
    fileCb(path, readmeFilePaths),
  );

  return createListOfPages(readmeFilePaths);
};

export const getPathsByMainPrefix = (
  prefix: "algorithms" | "data-structures",
) => {
  const tree = createDirectoryTree();
  return tree.filter((el) => el.slug.includes(prefix));
};
