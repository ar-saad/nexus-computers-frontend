import Hero from "../components/home/Hero";
import CategorySelector from "../components/home/CategorySelector";
import HighlightProducts from "../components/home/HighlightProducts";
import Newsletter from "../components/home/Newsletter";

const Home = () => {
  return (
    <div>
      <Hero />
      <CategorySelector />
      <HighlightProducts />
      <Newsletter />
    </div>
  );
};

export default Home;
