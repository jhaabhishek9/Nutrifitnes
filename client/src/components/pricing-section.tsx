import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface PricingPlan {
  name: string;
  description: string;
  priceINR: number;
  priceUSD: number;
  features: string[];
  popular: boolean;
}

export default function PricingSection() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const { toast } = useToast();
  
  const { data: plans, isLoading } = useQuery<PricingPlan[]>({
    queryKey: ["/api/diet-plans"],
  });

  // Set default currency based on user's location
  useEffect(() => {
    // Just as a simple example, we could extend this with actual geolocation API
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const isIndianRegion = userTimeZone.includes("Asia/Kolkata");
    setCurrency(isIndianRegion ? "INR" : "USD");
  }, []);

  const handlePlanSelection = (plan: PricingPlan) => {
    toast({
      title: "Plan Selected",
      description: `You've selected the ${plan.name}. Please login to continue.`,
    });
  };

  const formatPrice = (price: number, currency: "INR" | "USD") => {
    if (currency === "INR") {
      return `₹${price.toLocaleString("en-IN")}`;
    } else {
      return `$${price}`;
    }
  };

  return (
    <section id="plans" className="py-16 md:py-24 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-medium">Pricing Plans</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl mt-2 mb-4 text-neutral-900">Nutrition Plans That Fit Your Goals</h2>
          <p className="text-neutral-700 max-w-3xl mx-auto" id="pricing-intro">
            Our customized nutrition plans are designed to help you achieve your specific health and fitness goals.
          </p>
          <div className="inline-flex items-center mt-4 bg-white rounded-full p-1 shadow-sm">
            <button
              className={`py-2 px-4 rounded-full ${
                currency === "INR" ? "bg-primary text-white" : "text-neutral-700"
              } font-medium transition-colors`}
              onClick={() => setCurrency("INR")}
            >
              ₹ INR
            </button>
            <button
              className={`py-2 px-4 rounded-full ${
                currency === "USD" ? "bg-primary text-white" : "text-neutral-700"
              } font-medium transition-colors`}
              onClick={() => setCurrency("USD")}
            >
              $ USD
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
            <p className="mt-4 text-neutral-700">Loading pricing plans...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans?.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow transform hover:-translate-y-1 ${
                  plan.popular ? "relative" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-white px-3 py-1 rounded-bl-lg font-medium text-sm">
                    Most Popular
                  </div>
                )}
                <div className={`p-6 ${
                  index === 0 ? "bg-neutral-800" :
                  index === 1 ? "bg-primary" :
                  "bg-secondary"
                } text-white`}>
                  <h3 className="font-heading font-bold text-xl mb-2">{plan.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">
                      {currency === "INR" 
                        ? formatPrice(plan.priceINR, "INR") 
                        : formatPrice(plan.priceUSD, "USD")
                      }
                    </span>
                    <span className="ml-1 text-neutral-300">/month</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Check className="text-primary mr-3 h-5 w-5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    
                    {/* Disabled features for basic plan */}
                    {index === 0 && (
                      <>
                        <li className="flex items-center text-neutral-400">
                          <X className="text-neutral-400 mr-3 h-5 w-5" />
                          <span>1-on-1 Consultation</span>
                        </li>
                        <li className="flex items-center text-neutral-400">
                          <X className="text-neutral-400 mr-3 h-5 w-5" />
                          <span>Workout Recommendations</span>
                        </li>
                      </>
                    )}
                  </ul>
                  
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => handlePlanSelection(plan)}
                  >
                    Choose Plan
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <p className="text-neutral-600 mb-4">Need a more specialized plan? Get in touch for a custom quote.</p>
          <a href="#contact">
            <Button variant="outline" className="border-2 border-neutral-300 hover:border-primary hover:text-primary text-neutral-700">
              Contact for Custom Plans
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
