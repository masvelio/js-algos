import dirTree from "directory-tree";
import { join } from "path";
import fs from "fs-extra";

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
  const file = fs.readFileSync(path, { encoding: "utf-8" });
  const lines = file.split(/\r?\n/);
  const filteredLines = lines.filter((l) => !l.match(/^[#|_|\[|!|`|-]/i));
  const description = filteredLines.join(" ");
  const index = path.indexOf("src");
  const short = path.slice(index);
  const splitted = short.split("/");
  const slug = splitted.slice(1, splitted.length - 1);
  const shortSlug = slug.slice(1, splitted.length);
  const categoryArr = slug.slice(1, slug.length - 1);
  const categories = categoryArr.length === 0 ? ["uncategorized"] : categoryArr;
  const name = slug[slug.length - 1];
  const parsedName = mapDashStringToPascalCase(name);

  return {
    categories,
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
