import OthersService from "./_components/OthersService/OthersService";
import PopularRoutes from "./_components/PopularRoutes/PopularRoutes";
import { QuestionBox } from "./_components/QuestionBox/QuestionBox";
import SeoContent from "./_components/SeoContent/SeoContent";

export default function Home() {
  return (
    <>
      <OthersService />
      <PopularRoutes />
      <QuestionBox />
      <SeoContent />
    </>
  );
}
