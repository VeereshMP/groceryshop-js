import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Product } from "./ProductCard";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartProps) => {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            Shopping Cart
            {itemCount > 0 && (
              <Badge className="bg-primary text-primary-foreground">
                {itemCount} item{itemCount !== 1 ? 's' : ''}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  Your cart is empty
                </h3>
                <p className="text-muted-foreground">
                  Add some fresh groceries to get started!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.product.unit}</p>
                      <p className="font-semibold text-primary">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if (item.quantity === 1) {
                            onRemoveItem(item.product.id);
                          } else {
                            onUpdateQuantity(item.product.id, item.quantity - 1);
                          }
                        }}
                        className="w-8 h-8 p-0"
                      >
                        {item.quantity === 1 ? (
                          <Trash2 className="w-4 h-4" />
                        ) : (
                          <Minus className="w-4 h-4" />
                        )}
                      </Button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 p-0 bg-gradient-fresh hover:bg-primary"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkout Section */}
          {items.length > 0 && (
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
              <Button 
                className="w-full bg-gradient-fresh hover:bg-primary text-primary-foreground font-semibold py-6 text-lg transition-all duration-200 hover:scale-105"
                size="lg"
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;