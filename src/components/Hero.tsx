import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-grocery.jpg";

const Hero = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Fresh Groceries
          <span className="block text-accent">Delivered Daily</span>
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Get the freshest produce, quality meats, and pantry essentials delivered right to your doorstep
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-gradient-fresh hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6 h-auto font-semibold shadow-medium transition-all duration-300 hover:scale-105"
          >
            Shop Now
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6 h-auto font-semibold transition-all duration-300 hover:scale-105"
          >
            View Categories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;