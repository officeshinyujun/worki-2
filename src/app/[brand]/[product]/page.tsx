import { notFound } from 'next/navigation';
import data from '@/data/data.json';
import Link from 'next/link';
import Image from 'next/image';

type ProductParams = {
  brand: string;
  product: string;
};

type ProductPageProps = {
  params: ProductParams;
};

export default function ProductPage({ params }: ProductPageProps) {
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
              <div key={index} className="product-image-container">
                <Image 
                  src={image.startsWith('/') ? image : `/${image}`}
                  alt={`${product.name} - Image ${index + 1}`}
                  width={500}
                  height={300}
                  className="product-image"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams(): Promise<ProductParams[]> {
  const params: ProductParams[] = [];
  
  for (const brand in data) {
    const brandData = data[brand as keyof typeof data];
    brandData.products.forEach((_: unknown, index: number) => {
      params.push({
        brand,
        product: index.toString(),
      });
    });
  }
  
  return params;
}
