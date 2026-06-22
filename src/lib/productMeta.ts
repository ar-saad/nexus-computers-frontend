import { TbFlame, TbSparkles, TbTag, TbBolt } from "react-icons/tb";
import type {
  Product,
  ProductBadge,
  ProductCategory,
} from "../types/product";

/**
 * Presentation metadata derived from product data. Kept in one place so the
 * listing grid, home highlights, and filters never drift from one another.
 */

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

export const BADGE_META: Record<
  ProductBadge,
  { label: string; Icon: IconComponent }
> = {
  new: { label: "New", Icon: TbSparkles },
  bestseller: { label: "Best Seller", Icon: TbFlame },
  deal: { label: "Hot Deal", Icon: TbTag },
  limited: { label: "Limited", Icon: TbBolt },
  sale: { label: "On Sale", Icon: TbTag },
};

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  cpu: "Processors",
  gpu: "Graphics Cards",
  ram: "Memory",
  motherboard: "Motherboards",
  storage: "Storage",
  laptop: "Laptops",
};

export const formatPrice = (n: number) => "$" + n.toLocaleString("en-US");

export const savingsPct = (price: number, original?: number) =>
  original ? Math.round((1 - price / original) * 100) : null;

/** A single headline spec line, pulled straight from the typed specs. */
export const headlineSpec = (product: Product): string => {
  switch (product.category) {
    case "cpu":
      return `${product.specs.cores} Cores · ${product.specs.boostClock} Boost`;
    case "gpu":
      return `${product.specs.vram} · ${product.specs.boostClock} Boost`;
    case "ram":
      return `${product.specs.capacity} ${product.specs.type} · ${product.specs.speed}`;
    case "motherboard":
      return `${product.specs.chipset} · ${product.specs.socket} Socket`;
    case "storage":
      return `${product.specs.capacity} ${product.specs.type} · ${product.specs.readSpeed} Read`;
    case "laptop":
      return `${product.specs.cpu} · ${product.specs.gpu}`;
  }
};
