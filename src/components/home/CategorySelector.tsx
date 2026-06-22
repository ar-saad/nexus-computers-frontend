import { Link } from "react-router";
import { HiArrowRight } from "react-icons/hi2";
import {
  TbCpu,
  TbDeviceGamepad2,
  TbDeviceSdCard,
  TbServer,
  TbDatabase,
  TbDeviceLaptop,
} from "react-icons/tb";
import { products } from "../../data/products";
import type { ProductCategory } from "../../types/product";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

/**
 * The category cards are merchandising chrome: the label, icon, and blurb are
 * curated here, while the product count for each is derived from the catalogue
 * so the badges never drift out of sync with what's actually in stock.
 */
const CATEGORIES: {
  category: ProductCategory;
  label: string;
  blurb: string;
  Icon: IconComponent;
}[] = [
  {
    category: "cpu",
    label: "Processors",
    blurb: "AMD & Intel CPUs",
    Icon: TbCpu,
  },
  {
    category: "gpu",
    label: "Graphics Cards",
    blurb: "NVIDIA & Radeon GPUs",
    Icon: TbDeviceGamepad2,
  },
  {
    category: "ram",
    label: "Memory",
    blurb: "DDR5 & DDR4 kits",
    Icon: TbDeviceSdCard,
  },
  {
    category: "motherboard",
    label: "Motherboards",
    blurb: "AM5 & LGA boards",
    Icon: TbServer,
  },
  {
    category: "storage",
    label: "Storage",
    blurb: "NVMe SSDs & drives",
    Icon: TbDatabase,
  },
  {
    category: "laptop",
    label: "Laptops",
    blurb: "Gaming & creator rigs",
    Icon: TbDeviceLaptop,
  },
];

const countFor = (category: ProductCategory) =>
  products.filter((p) => p.category === category).length;

const CategorySelector = () => {
  return (
    <section className="w-full px-4 py-10 lg:px-8 lg:py-14">
      <div className="max-w-7xl mx-auto">
        {/* ── Heading ───────────────────────────────────────────────────── */}
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-ink text-2xl lg:text-3xl font-black tracking-tight">
              Shop by Category
            </h2>
            <p className="text-ink-muted text-sm font-medium mt-1.5">
              Hand-picked components to build or upgrade your perfect rig.
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

        {/* ── Category cards ────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map(({ category, label, blurb, Icon }) => (
            <Link
              key={category}
              to={`/category/${category}`}
              className="group flex flex-col items-center text-center gap-3 rounded-2xl bg-white border border-border p-5 hover:border-brand hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <span className="flex items-center justify-center w-14 h-14 rounded-xl bg-surface-2 text-ink-2 group-hover:bg-brand-light group-hover:text-brand transition-colors duration-200">
                <Icon size={26} />
              </span>

              <div>
                <p className="font-bold text-sm text-ink leading-tight">
                  {label}
                </p>
                <p className="text-[11px] text-ink-muted font-medium mt-0.5">
                  {blurb}
                </p>
              </div>

              <span className="mt-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold text-ink-muted bg-surface-2 group-hover:text-brand group-hover:bg-brand-light transition-colors duration-200">
                {countFor(category)} products
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySelector;
