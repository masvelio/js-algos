import { articles } from "src/articlesList.json";
import PageLayout from "../components/PageLayout";
import CardBox from "../components/CardBox";

const Articles = () => (
  <PageLayout
    resourcesPaths={[]}
    sidebarRoutes={[]}
    title="Articles"
    body={() => articles.map((item) => <CardBox key={item.url} item={item} />)}
  />
);
export default Articles;
