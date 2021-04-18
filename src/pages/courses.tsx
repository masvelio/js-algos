import { courses } from "src/coursesList.json";
import PageLayout from "../components/PageLayout";
import CardBox from "../components/CardBox";

const Courses = () => {
  return (
    <PageLayout
      resourcesPaths={[]}
      sidebarRoutes={[]}
      title="Courses"
      body={() => courses.map((item) => <CardBox key={item.url} item={item} />)}
    />
  );
};

export default Courses;
