import { notFound } from 'next/navigation';
import data from '@/data/data.json';
import Link from 'next/link';

export default function ProductPage({ 
  params 
}: { 
  params: { brand: string; product: string } 
}) {
  const brand = data[params.brand as keyof typeof data];
  
  if (!brand) {
    notFound();
  }

  const product = brand.products[parseInt(params.product)];
  
  if (!product) {
    notFound();
  }

  return (
    <div className="container">
      <Link href={`/${params.brand}`} className="back-link">
        ← Back to {brand.name}
      </Link>
      
      <h1>{product.name}</h1>
      <div className="product-content">
        <p>{product.intruduction}</p>
        
        {product.photo && (
          <div className="product-images">
            {product.photo.map((image: string, index: number) => (
              <img 
                key={index} 
                src={image.startsWith('/') ? image : `/${image}`}
                alt={`${product.name} - Image ${index + 1}`}
                className="product-image"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const params : { brand: string; product: string }[] = [];
  
  for (const brand in data) {
    const brandData = data[brand as keyof typeof data];
    brandData.products.forEach((_: any, index: number) => {
      params.push({
        brand,
        product: index.toString(),
      });
    });
  }

  return params;
}
