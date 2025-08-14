// src/types/index.d.ts

export type Product = {
    name: string;
    intruduction: string;  // 주의: 오타가 의도된 것 같아 그대로 유지
    photo: string[];
};
  
export type Brand = {
    name: string;
    description: string;
    tags: string[];
    products: Product[];
};
  
export type BrandKey = 'haed' | 'jae' | 'wxv';

declare module '@/data/data.json' {
    const data: Record<BrandKey, Brand>;
    export default data;
  }