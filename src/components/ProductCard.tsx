import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  unit: string;
  originalPrice?: number;
  organic?: boolean;
}

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: string) => void;
}

const ProductCard = ({ product, quantity, onAddToCart, onRemoveFromCart }: ProductCardProps) => {
  const isOnSale = product.originalPrice && product.originalPrice > product.price;
  const discount = isOnSale ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) : 0;

  return (
    <Card className="group hover:shadow-product transition-all duration-300 hover:scale-[1.02] bg-gradient-card border-muted/50">
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-t-lg bg-muted/20">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {isOnSale && (
            <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground font-semibold">
              -{discount}%
            </Badge>
          )}
          {product.organic && (
            <Badge className="absolute top-2 right-2 bg-organic-green text-white font-semibold">
              Organic
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-2">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground">{product.unit}</p>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {isOnSale && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice!.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Controls */}
          <div className="flex items-center justify-between">
            {quantity === 0 ? (
              <Button
                onClick={() => onAddToCart(product)}
                className="w-full bg-gradient-fresh hover:bg-primary text-primary-foreground font-semibold transition-all duration-200 hover:scale-105"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            ) : (
              <div className="flex items-center gap-2 w-full">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onRemoveFromCart(product.id)}
                  className="hover:bg-destructive hover:text-destructive-foreground transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="flex-1 text-center font-semibold text-primary">
                  {quantity}
                </span>
                <Button
                  size="sm"
                  onClick={() => onAddToCart(product)}
                  className="bg-gradient-fresh hover:bg-primary text-primary-foreground transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;