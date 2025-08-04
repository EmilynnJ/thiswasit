"use client";

import { useEffect, useState } from 'react';
import { PageContainer } from "@/components/page-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShopItemCard } from "@/components/shop-item-card";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  author?: string;
  product_type: 'SERVICE' | 'PHYSICAL' | 'DIGITAL';
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filterProducts = (type: Product['product_type']) => products.filter(p => p.product_type === type);

  return (
    <PageContainer>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-alex-brush text-pink-400 heading-glow">The Mystical Marketplace</h1>
        <p className="text-lg text-gray-300 font-playfair mt-2">Discover tools and services to aid your spiritual journey.</p>
      </div>

      <Tabs defaultValue="digital" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-black/30">
          <TabsTrigger value="digital">Digital Products</TabsTrigger>
          <TabsTrigger value="physical">Physical Goods</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="digital">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {isLoading ? Array.from({ length: 3 }).map((_, i) => <ShopItemCard key={i} />) :
                filterProducts('DIGITAL').map(product => <ShopItemCard key={product.id} product={product} />)}
            </div>
        </TabsContent>
        <TabsContent value="physical">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {isLoading ? Array.from({ length: 3 }).map((_, i) => <ShopItemCard key={i} />) :
                filterProducts('PHYSICAL').map(product => <ShopItemCard key={product.id} product={product} />)}
            </div>
        </TabsContent>
        <TabsContent value="services">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {isLoading ? Array.from({ length: 3 }).map((_, i) => <ShopItemCard key={i} />) :
                filterProducts('SERVICE').map(product => <ShopItemCard key={product.id} product={product} />)}
            </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
