import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductCard, { Product } from "@/components/ProductCard";
import Cart, { CartItem } from "@/components/Cart";

// Import product images
import applesImage from "@/assets/apples.jpg";
import bananasImage from "@/assets/bananas.jpg";
import broccoliImage from "@/assets/broccoli.jpg";
import milkImage from "@/assets/milk.jpg";
import breadImage from "@/assets/bread.jpg";
import orangeJuiceImage from "@/assets/orange-juice.jpg";

// Sample products data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Red Apples',
    price: 3.99,
    originalPrice: 4.99,
    image: applesImage,
    category: 'fruits',
    unit: 'per lb',
    organic: true,
  },
  {
    id: '2',
    name: 'Organic Bananas',
    price: 2.49,
    image: bananasImage,
    category: 'fruits',
    unit: 'per bunch',
    organic: true,
  },
  {
    id: '3',
    name: 'Fresh Broccoli',
    price: 2.99,
    image: broccoliImage,
    category: 'vegetables',
    unit: 'per head',
    organic: true,
  },
  {
    id: '4',
    name: 'Whole Milk',
    price: 4.29,
    image: milkImage,
    category: 'dairy',
    unit: '1 gallon',
  },
  {
    id: '5',
    name: 'Artisan Bread',
    price: 3.49,
    originalPrice: 3.99,
    image: breadImage,
    category: 'bakery',
    unit: 'per loaf',
  },
  {
    id: '6',
    name: 'Fresh Orange Juice',
    price: 5.99,
    image: orangeJuiceImage,
    category: 'beverages',
    unit: '64 fl oz',
  },
];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { toast } = useToast();

  // Filter products based on search and category
  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Cart functionality
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart.`,
        });
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prev.filter(item => item.product.id !== productId);
      }
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeCartItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeCartItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const getProductQuantity = (productId: string) => {
    const cartItem = cartItems.find(item => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section */}
      <Hero />

      {/* Categories */}
      <Categories
        selectedCategory={selectedCategory}
        onCategorySelect={(category) => 
          setSelectedCategory(category === selectedCategory ? '' : category)
        }
      />

      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` : 'Featured Products'}
            </h2>
            <p className="text-muted-foreground">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                No products found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or browse our categories
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={getProductQuantity(product.id)}
                  onAddToCart={addToCart}
                  onRemoveFromCart={removeFromCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cart */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeCartItem}
      />

      {/* Footer */}
      <footer className="bg-muted/50 border-t py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-fresh rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">🥬</span>
              </div>
              <h3 className="text-xl font-bold text-primary">FreshMart</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Your trusted partner for fresh, quality groceries delivered to your door
            </p>
            <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">About Us</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              © 2024 FreshMart. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;