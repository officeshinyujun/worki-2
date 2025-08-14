import { notFound } from 'next/navigation';
import data from '@/data/data.json';
import Link from 'next/link';

export default function BrandPage({ params }: { params: { brand: string } }) {
  const brand = data[params.brand as keyof typeof data];
  
  if (!brand) {
    notFound();
  }

  return (
    <div className="container">
      <h1>{brand.name}</h1>
      <p>{brand.description}</p>
      
      <div className="tags">
        {brand.tags.map((tag: string, index: number) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>

      <h2>Products</h2>
      <div className="products">
        {brand.products.map((product: {name: string; intruduction: string; photo: string[] }, index: number) => (
          <Link href={`/${params.brand}/${index}`} key={index} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.intruduction}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(data).map(brand => ({
    brand,
  }));
}
