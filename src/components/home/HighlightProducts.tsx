import { Link } from "react-router";
import { HiArrowRight } from "react-icons/hi2";
import { products } from "../../data/products";
import ProductCard from "../products/ProductCard";

/**
 * Merchandising is the only hand-picked part: a buyer chooses which products
 * headline the grid. The cards themselves are the shared ProductCard, so they
 * stay in lock-step with the catalogue listing.
 */
const HIGHLIGHT_IDS = [
  "gpu-nvidia-rtx5090",
  "cpu-amd-ryzen9-9950x",
  "laptop-asus-rog-zephyrus-g16",
  "storage-samsung-990-pro-2tb",
  "mobo-asus-rog-crosshair-x870e",
  "gpu-amd-rx9070xt",
  "cpu-intel-i9-14900k",
  "ram-gskill-tridentz5-32gb",
  "mobo-msi-mag-b650-tomahawk",
  "laptop-lenovo-legion-7i",
];

const byId = (id: string) => products.find((p) => p.id === id)!;

const HighlightProducts = () => {
  const highlights = HIGHLIGHT_IDS.map(byId);

  return (
    <section className="w-full px-4 py-10 lg:px-8 lg:py-14">
      <div className="max-w-7xl mx-auto">
        {/* ── Heading ───────────────────────────────────────────────────── */}
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-ink text-2xl lg:text-3xl font-black tracking-tight">
              Top Products
            </h2>
            <p className="text-ink-muted text-sm font-medium mt-1.5">
              Our highest-rated gear, picked by the people who build with it.
            </p>
          </div>
          <Link
            to="/products"
            className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-brand hover:gap-2.5 transition-all duration-200 shrink-0"
          >
            View all
            <HiArrowRight size={15} />
          </Link>
        </div>

        {/* ── Product cards ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {highlights.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightProducts;
