import type { Product, ProductCategory } from "../types/product";

export const products: Product[] = [
  // ── CPUs ────────────────────────────────────────────────────────────────────
  {
    id: "cpu-amd-ryzen9-9950x",
    category: "cpu",
    brand: "AMD",
    name: "Ryzen 9 9950X",
    price: 549,
    originalPrice: 799,
    images: [
      "https://c1.neweggimages.com/productimage/nb1280/C3U3S2601070HCQ8Z0C.jpg",
    ],
    badge: "bestseller",
    description: "16-core flagship for content creation and high-end gaming.",
    inStock: true,
    rating: 4.9,
    reviewCount: 312,
    specs: {
      cores: 16,
      threads: 32,
      baseClock: "4.3 GHz",
      boostClock: "5.7 GHz",
      tdp: 170,
      socket: "AM5",
      architecture: "Zen 5",
    },
  },
  {
    id: "cpu-intel-i9-14900k",
    category: "cpu",
    brand: "Intel",
    name: "Core i9-14900K",
    price: 399,
    images: [
      "https://c1.neweggimages.com/productimage/nb1280/AFYUD24032214C3XP8A.jpg",
    ],
    badge: "deal",
    description: "24-core hybrid architecture for extreme multitasking.",
    inStock: true,
    rating: 4.7,
    reviewCount: 214,
    specs: {
      cores: 24,
      threads: 32,
      baseClock: "3.2 GHz",
      boostClock: "6.0 GHz",
      tdp: 125,
      socket: "LGA1700",
      architecture: "Raptor Lake Refresh",
    },
  },

  // ── GPUs ────────────────────────────────────────────────────────────────────
  {
    id: "gpu-nvidia-rtx5090",
    category: "gpu",
    brand: "NVIDIA",
    name: "GeForce RTX 5090",
    price: 1999,
    images: [
      "https://c1.neweggimages.com/productimage/nb1280/B9ZZS250616104P0YAB.jpg",
      "https://c1.neweggimages.com/productimage/nb1280/B9ZZS250616104PFOAD.jpg",
      "https://c1.neweggimages.com/productimage/nb1280/B4VJS2504290IEZVH32.jpg",
      "https://c1.neweggimages.com/productimage/nb1280/B9ZZS250616104PIIB7.jpg",
    ],
    badge: "new",
    description:
      "The most powerful consumer GPU ever built, built for 8K and AI.",
    inStock: true,
    rating: 5.0,
    reviewCount: 87,
    specs: {
      vram: "32 GB GDDR7",
      boostClock: "2.91 GHz",
      tdp: 575,
      pciSlot: "PCIe 5.0 x16",
      outputs: ["3× DisplayPort 2.1b", "1× HDMI 2.1a"],
      cudaCores: 21760,
    },
  },
  {
    id: "gpu-amd-rx9070xt",
    category: "gpu",
    brand: "AMD",
    name: "Radeon RX 9070 XT",
    price: 599,
    images: [
      "https://c1.neweggimages.com/productimage/nb1280/14-202-450-01.png",
      "https://c1.neweggimages.com/productimage/nb1280/14-202-450-02.png",
      "https://c1.neweggimages.com/productimage/nb1280/14-202-450-03.png",
      "https://c1.neweggimages.com/productimage/nb1280/14-202-450-04.png",
    ],
    badge: "new",
    description: "RDNA 4 architecture for 1440p and entry 4K gaming.",
    inStock: true,
    rating: 4.8,
    reviewCount: 153,
    specs: {
      vram: "16 GB GDDR6",
      boostClock: "3.0 GHz",
      tdp: 304,
      pciSlot: "PCIe 5.0 x16",
      outputs: ["2× DisplayPort 2.1", "1× HDMI 2.1"],
      streamProcessors: 4096,
    },
  },

  // ── RAM ─────────────────────────────────────────────────────────────────────
  {
    id: "ram-gskill-tridentz5-32gb",
    category: "ram",
    brand: "G.Skill",
    name: "Trident Z5 RGB 32 GB",
    price: 109,
    images: [
      "https://c1.neweggimages.com/productimage/nb1280/20-374-429-10.png",
      "https://c1.neweggimages.com/productimage/nb1280/20-374-429-11.png",
    ],
    description:
      "High-frequency DDR5 kit optimised for Ryzen 7000/9000 platforms.",
    inStock: true,
    rating: 4.8,
    reviewCount: 428,
    specs: {
      capacity: "32 GB",
      type: "DDR5",
      speed: "6000 MHz",
      latency: "CL30",
      modules: "2× 16 GB",
    },
  },
  {
    id: "ram-corsair-vengeance-64gb",
    category: "ram",
    brand: "Corsair",
    name: "Vengeance DDR5 64 GB",
    price: 189,
    images: [
      "https://c1.neweggimages.com/productimage/nb1280/20-236-879-03.jpg",
      "https://c1.neweggimages.com/productimage/nb1280/20-236-888-01.jpg",
    ],
    badge: "deal",
    description: "64 GB kit for workstations, VMs, and heavy multitasking.",
    inStock: true,
    rating: 4.7,
    reviewCount: 196,
    specs: {
      capacity: "64 GB",
      type: "DDR5",
      speed: "5600 MHz",
      latency: "CL40",
      modules: "2× 32 GB",
    },
  },

  // ── Motherboards ─────────────────────────────────────────────────────────────
  {
    id: "mobo-asus-rog-crosshair-x870e",
    category: "motherboard",
    brand: "ASUS",
    name: "ROG Crosshair X870E Hero",
    price: 499,
    images: [
      "https://c1.neweggimages.com/productimage/nb1280/13-119-681-01.jpg",
      "https://c1.neweggimages.com/productimage/nb1280/13-119-681-02.png",
      "https://c1.neweggimages.com/productimage/nb1280/13-119-681-03.png",
      "https://c1.neweggimages.com/productimage/nb1280/13-119-681-04.png",
    ],
    badge: "new",
    description: "Flagship X870E board with 20+2 power stages for Ryzen 9000.",
    inStock: true,
    rating: 4.9,
    reviewCount: 74,
    specs: {
      socket: "AM5",
      chipset: "X870E",
      formFactor: "ATX",
      memorySlots: 4,
      maxMemory: "256 GB",
      m2Slots: 5,
      pciSlots: ["1× PCIe 5.0 x16", "1× PCIe 4.0 x16", "1× PCIe 3.0 x1"],
    },
  },
  {
    id: "mobo-msi-mag-b650-tomahawk",
    category: "motherboard",
    brand: "MSI",
    name: "MAG B650 Tomahawk WiFi",
    price: 219,
    images: [
      "https://c1.neweggimages.com/productimage/nb1280/13-144-557-08.jpg",
      "https://c1.neweggimages.com/productimage/nb1280/13-144-557-02.jpg",
      "https://c1.neweggimages.com/productimage/nb1280/13-144-557-03.jpg",
      "https://c1.neweggimages.com/productimage/nb1280/13-144-557-07.jpg",
    ],
    badge: "bestseller",
    description: "Mid-range AM5 board with solid VRMs and Wi-Fi 6E.",
    inStock: true,
    rating: 4.7,
    reviewCount: 512,
    specs: {
      socket: "AM5",
      chipset: "B650",
      formFactor: "ATX",
      memorySlots: 4,
      maxMemory: "128 GB",
      m2Slots: 3,
      pciSlots: ["1× PCIe 5.0 x16", "1× PCIe 3.0 x1"],
    },
  },

  // ── Storage ──────────────────────────────────────────────────────────────────
  {
    id: "storage-samsung-990-pro-2tb",
    category: "storage",
    brand: "Samsung",
    name: "990 Pro 2 TB NVMe SSD",
    price: 149,
    originalPrice: 249,
    images: [
      "https://c1.neweggimages.com/productimage/nb1280/20-147-861-01.jpg",
      "https://c1.neweggimages.com/productimage/nb1280/20-147-861-03.jpg",
    ],
    badge: "sale",
    description:
      "PCIe 4.0 SSD with consistent sustained performance for gaming.",
    inStock: true,
    rating: 4.9,
    reviewCount: 1840,
    specs: {
      capacity: "2 TB",
      type: "NVMe SSD",
      interface: "PCIe 4.0 x4",
      readSpeed: "7,450 MB/s",
      writeSpeed: "6,900 MB/s",
      formFactor: "M.2 2280",
    },
  },

  // ── Laptops ──────────────────────────────────────────────────────────────────
  {
    id: "laptop-asus-rog-zephyrus-g16",
    category: "laptop",
    brand: "ASUS",
    name: "ROG Zephyrus G16 (2025)",
    price: 1899,
    images: [
      "https://dlcdnwebimgs.asus.com/gain/E4E1A4CD-1261-43D1-A18D-C91711A989AD/w1000/h732",
      "https://dlcdnwebimgs.asus.com/gain/3C491D4E-3561-4B5D-9B07-F12F790D7B00/w1000/h732",
      "https://dlcdnwebimgs.asus.com/gain/E6A7F6BE-7130-493A-A342-718435A3AAF8/w1000/h732",
      "https://dlcdnwebimgs.asus.com/gain/FA372829-A543-407B-943C-B4691AAE21A2/w1000/h732",
    ],
    badge: "limited",
    description: "Slim gaming powerhouse with RTX 5080 and 240 Hz OLED panel.",
    inStock: true,
    rating: 4.9,
    reviewCount: 231,
    specs: {
      display: '16" 240 Hz QHD+ OLED',
      cpu: "Intel Core Ultra 9 285H",
      gpu: "NVIDIA GeForce RTX 5080 Laptop",
      ram: "32 GB LPDDR5X",
      storage: "1 TB PCIe 4.0 NVMe",
      battery: "90 Wh",
      weight: "1.85 kg",
      os: "Windows 11 Home",
    },
  },
  {
    id: "laptop-lenovo-legion-7i",
    category: "laptop",
    brand: "Lenovo",
    name: "Legion 7i Gen 9",
    price: 1499,
    images: [
      "https://p2-ofp.static.pub//fes/cms/2024/09/13/g4xtpizd3epy99ubdix3oaiy0xx2ii069099.png?width=1200&height=1200",
      "https://p4-ofp.static.pub//fes/cms/2024/09/13/c5r9zhgxrb5l5uyki1m6cb5p4gbp6f321646.png?width=1200&height=1200&width=1200&height=1200",
      "https://p2-ofp.static.pub//fes/cms/2024/09/13/ulu0z4whidjpsr6jxtmqdvcbo3ulut342324.png?width=1200&height=1200&width=1200&height=1200",
      "https://p1-ofp.static.pub//fes/cms/2024/09/13/839kg3hb8wd73rifhhsn5ui3mzm5lr934508.png?width=1200&height=1200&width=1200&height=1200",
    ],
    badge: "deal",
    description: "Performance-per-dollar champion with a Mini LED display.",
    inStock: true,
    rating: 4.7,
    reviewCount: 387,
    specs: {
      display: '16" 165 Hz QHD+ Mini LED',
      cpu: "Intel Core i9-14900HX",
      gpu: "NVIDIA GeForce RTX 4070 Laptop",
      ram: "32 GB DDR5",
      storage: "1 TB PCIe 4.0 NVMe",
      battery: "99.9 Wh",
      weight: "2.4 kg",
      os: "Windows 11 Home",
    },
  },
];

export const getByCategory = (category: Product["category"]) =>
  products.filter((p) => p.category === category);

// ── Filtering & sorting ───────────────────────────────────────────────────────

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "name-asc";

export interface ProductFilterState {
  categories: ProductCategory[];
  brands: string[];
  minPrice?: number;
  maxPrice?: number;
  inStockOnly: boolean;
  sort: SortOption;
}

export const DEFAULT_FILTERS: ProductFilterState = {
  categories: [],
  brands: [],
  inStockOnly: false,
  sort: "featured",
};

/**
 * Distinct brands in the catalogue, alphabetised. Scoping to a set of
 * categories lets the brand facet shrink to only what's relevant once a
 * shopper has narrowed by category.
 */
export const getBrands = (categories: ProductCategory[] = []): string[] => {
  const pool = categories.length
    ? products.filter((p) => categories.includes(p.category))
    : products;
  return [...new Set(pool.map((p) => p.brand))].sort((a, b) =>
    a.localeCompare(b),
  );
};

/** The cheapest and most expensive prices across the whole catalogue. */
export const getPriceBounds = (): { min: number; max: number } => {
  const prices = products.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
};

const SORTERS: Record<SortOption, (a: Product, b: Product) => number> = {
  featured: () => 0,
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "rating-desc": (a, b) => b.rating - a.rating,
  "name-asc": (a, b) => a.name.localeCompare(b.name),
};

/** Pure: apply every active filter, then sort. Original order is preserved
 *  for "featured" since Array.prototype.sort is stable. */
export const filterAndSort = (state: ProductFilterState): Product[] => {
  const filtered = products.filter((p) => {
    if (state.categories.length && !state.categories.includes(p.category))
      return false;
    if (state.brands.length && !state.brands.includes(p.brand)) return false;
    if (state.minPrice != null && p.price < state.minPrice) return false;
    if (state.maxPrice != null && p.price > state.maxPrice) return false;
    if (state.inStockOnly && !p.inStock) return false;
    return true;
  });
  return filtered.sort(SORTERS[state.sort]);
};
