import Banner from "./_components/Banner";
import Footer from "./_components/Footer/Footer";
import SearchForm from "./_components/SearchForm/SearchForm";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mx-auto">
      <Banner />
      <div className="mx-auto max-w-[1200px]">
        <SearchForm />
        {children}
      </div>
      <Footer />
    </main>
  );
}
