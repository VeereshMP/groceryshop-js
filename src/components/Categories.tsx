import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { id: 'fruits', name: 'Fruits', emoji: '🍎', color: 'bg-red-100 text-red-700' },
  { id: 'vegetables', name: 'Vegetables', emoji: '🥬', color: 'bg-green-100 text-green-700' },
  { id: 'dairy', name: 'Dairy', emoji: '🥛', color: 'bg-blue-100 text-blue-700' },
  { id: 'bakery', name: 'Bakery', emoji: '🍞', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'beverages', name: 'Beverages', emoji: '🧃', color: 'bg-orange-100 text-orange-700' },
  { id: 'snacks', name: 'Snacks', emoji: '🍿', color: 'bg-purple-100 text-purple-700' },
];

interface CategoriesProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const Categories = ({ selectedCategory, onCategorySelect }: CategoriesProps) => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Shop by Category</h2>
          <p className="text-muted-foreground">Find exactly what you're looking for</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-medium ${
                selectedCategory === category.id 
                  ? 'ring-2 ring-primary bg-primary/5' 
                  : 'hover:bg-muted/50'
              }`}
              onClick={() => onCategorySelect(category.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">{category.emoji}</div>
                <h3 className="font-semibold text-foreground">{category.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;