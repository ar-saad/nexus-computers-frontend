export type ProductCategory =
  | "cpu"
  | "gpu"
  | "ram"
  | "motherboard"
  | "storage"
  | "laptop";

export type ProductBadge = "new" | "bestseller" | "deal" | "limited" | "sale";

interface BaseProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  badge?: ProductBadge;
  description: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export interface CpuSpecs {
  cores: number;
  threads: number;
  baseClock: string;
  boostClock: string;
  tdp: number;
  socket: string;
  architecture: string;
  integratedGraphics?: string;
}

export interface GpuSpecs {
  vram: string;
  boostClock: string;
  tdp: number;
  pciSlot: string;
  outputs: string[];
  cudaCores?: number;
  streamProcessors?: number;
}

export interface RamSpecs {
  capacity: string;
  type: string;
  speed: string;
  latency: string;
  modules: string;
}

export interface MotherboardSpecs {
  socket: string;
  chipset: string;
  formFactor: string;
  memorySlots: number;
  maxMemory: string;
  m2Slots: number;
  pciSlots: string[];
}

export interface StorageSpecs {
  capacity: string;
  type: string;
  interface: string;
  readSpeed: string;
  writeSpeed: string;
  formFactor: string;
}

export interface LaptopSpecs {
  display: string;
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  battery: string;
  weight: string;
  os: string;
}

export type Product =
  | (BaseProduct & { category: "cpu"; specs: CpuSpecs })
  | (BaseProduct & { category: "gpu"; specs: GpuSpecs })
  | (BaseProduct & { category: "ram"; specs: RamSpecs })
  | (BaseProduct & { category: "motherboard"; specs: MotherboardSpecs })
  | (BaseProduct & { category: "storage"; specs: StorageSpecs })
  | (BaseProduct & { category: "laptop"; specs: LaptopSpecs });

export type ProductsByCategory = Record<ProductCategory, Product[]>;
