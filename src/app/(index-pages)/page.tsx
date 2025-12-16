import OthersService from "./_components/OthersService/OthersService";
import PopularRoutes from "./_components/PopularRoutes/PopularRoutes";
import { QuestionBox } from "./_components/QuestionBox/QuestionBox";
import SeoContent from "./_components/SeoContent/SeoContent";
import ServicesCard from "./_components/ServicesCard/ServicesCard";

export default function Home() {
  return (
    <>
      <OthersService />
      <PopularRoutes />
      <ServicesCard />
      <QuestionBox />
      <SeoContent />
    </>
  );
}
