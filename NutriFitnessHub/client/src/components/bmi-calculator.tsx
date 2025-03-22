import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface BMICalculatorProps {
  inDashboard?: boolean;
}

export default function BMICalculator({ inDashboard = false }: BMICalculatorProps) {
  const { toast } = useToast();
  const [heightFeet, setHeightFeet] = useState<string>("");
  const [heightInches, setHeightInches] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [bmiResult, setBmiResult] = useState<{
    bmi: string;
    category: string;
    position: number;
  } | null>(null);

  const calculateBMI = async () => {
    if (!heightFeet || !weight) {
      toast({
        title: "Missing information",
        description: "Please enter your height and weight",
        variant: "destructive",
      });
      return;
    }

    try {
      // Convert inputs to numbers
      const feet = parseFloat(heightFeet);
      const inches = parseFloat(heightInches || "0");
      const weightKg = parseFloat(weight);

      // Calculate BMI
      const heightInchesTotal = (feet * 12) + inches;
      const heightMeters = heightInchesTotal * 0.0254;
      const bmi = weightKg / (heightMeters * heightMeters);
      
      // Determine BMI category and position for the indicator
      let category = '';
      let position = 0;
      
      if (bmi < 18.5) {
        category = 'Underweight';
        position = (bmi / 18.5) * 18; // Position as percentage (0-18%)
      } else if (bmi < 25) {
        category = 'Normal';
        position = 18 + (((bmi - 18.5) / 6.5) * 22); // Position as percentage (18-40%)
      } else if (bmi < 30) {
        category = 'Overweight';
        position = 40 + (((bmi - 25) / 5) * 30); // Position as percentage (40-70%)
      } else {
        category = 'Obese';
        position = 70 + (Math.min(bmi - 30, 10) / 10) * 30; // Position as percentage (70-100%)
      }

      // Save to the server if in the dashboard (authenticated)
      if (inDashboard) {
        try {
          await apiRequest("POST", "/api/calculate-bmi", {
            heightFeet: feet,
            heightInches: inches,
            weight: weightKg
          });
        } catch (error) {
          console.error("Error saving BMI data:", error);
        }
      }

      setBmiResult({
        bmi: bmi.toFixed(1),
        category,
        position
      });
      
      setShowResult(true);
    } catch (error) {
      toast({
        title: "Calculation error",
        description: "There was an error calculating your BMI. Please check your inputs.",
        variant: "destructive",
      });
    }
  };

  const resetCalculator = () => {
    setHeightFeet("");
    setHeightInches("");
    setWeight("");
    setBmiResult(null);
    setShowResult(false);
  };

  if (inDashboard) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height-feet">Height (feet)</Label>
                <Input
                  id="height-feet"
                  type="number"
                  placeholder="Feet"
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height-inches">Height (inches)</Label>
                <Input
                  id="height-inches"
                  type="number"
                  placeholder="Inches"
                  value={heightInches}
                  onChange={(e) => setHeightInches(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weight-kg">Weight (kg)</Label>
              <Input
                id="weight-kg"
                type="number"
                placeholder="Kilograms"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-4">
              <Button 
                onClick={calculateBMI} 
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Calculate BMI
              </Button>
              {showResult && (
                <Button 
                  onClick={resetCalculator} 
                  variant="outline" 
                  className="flex-1"
                >
                  Reset
                </Button>
              )}
            </div>
          </div>
          
          <div>
            {showResult && bmiResult ? (
              <div className="bg-white p-6 rounded-lg border">
                <div className="text-center mb-6">
                  <div className="inline-block p-4 rounded-full bg-primary/20 text-primary font-bold text-3xl mb-4">
                    {bmiResult.bmi}
                  </div>
                  <h3 className="font-heading font-semibold text-xl">
                    Your BMI: <span className="text-primary">{bmiResult.category}</span>
                  </h3>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="h-8 bg-neutral-100 rounded-full overflow-hidden relative">
                    <div className="absolute inset-0 flex">
                      <div className="h-full bg-green-400 flex-grow-0" style={{ width: "18%" }}>
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-white">Underweight</span>
                      </div>
                      <div className="h-full bg-primary flex-grow-0" style={{ width: "22%" }}>
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-white">Normal</span>
                      </div>
                      <div className="h-full bg-yellow-400 flex-grow-0" style={{ width: "30%" }}>
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-white">Overweight</span>
                      </div>
                      <div className="h-full bg-orange-400 flex-grow-0" style={{ width: "30%" }}>
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-white">Obese</span>
                      </div>
                    </div>
                    {/* Position indicator */}
                    <div className="absolute top-0 h-8 w-1 bg-neutral-800" style={{ left: `${bmiResult.position}%` }}></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-neutral-600">
                    <span>16.5</span>
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>40</span>
                  </div>
                </div>
                
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Your Recommendation</h4>
                  <p className="text-sm text-neutral-700">
                    Based on your BMI of {bmiResult.bmi}, we recommend our{' '}
                    <strong>
                      {bmiResult.category === 'Underweight' ? 'Weight Gain' :
                       bmiResult.category === 'Normal' ? 'Balanced Weight Management' :
                       bmiResult.category === 'Overweight' ? 'Weight Management' : 'Weight Loss'}
                    </strong>{' '}
                    plan to help you achieve optimal health.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full border rounded-lg p-6 bg-neutral-50">
                <svg
                  className="w-20 h-20 text-primary/20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium">Track Your BMI</h3>
                <p className="mt-2 text-sm text-center text-neutral-600">
                  Enter your height and weight to calculate your Body Mass Index
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="bmi" className="py-16 md:py-24 bg-gradient-to-br from-secondary-light/10 to-primary-light/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-secondary to-primary text-white">
              <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">BMI Calculator</h2>
              <p className="mb-6">Calculate your Body Mass Index to get a quick assessment of your weight relative to your height. This can be a starting point for your nutrition journey.</p>
              
              <div className="bg-white/20 p-6 rounded-lg">
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium">Height</label>
                  <div className="flex space-x-3 mb-1">
                    <div className="w-1/2">
                      <Input
                        type="number"
                        id="height-feet"
                        placeholder="Feet"
                        className="bg-white text-neutral-800"
                        value={heightFeet}
                        onChange={(e) => setHeightFeet(e.target.value)}
                      />
                    </div>
                    <div className="w-1/2">
                      <Input
                        type="number"
                        id="height-inches"
                        placeholder="Inches"
                        className="bg-white text-neutral-800"
                        value={heightInches}
                        onChange={(e) => setHeightInches(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium">Weight</label>
                  <Input
                    type="number"
                    id="weight-kg"
                    placeholder="Kilograms"
                    className="bg-white text-neutral-800"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                
                <Button 
                  onClick={calculateBMI}
                  className="w-full bg-white text-primary hover:bg-neutral-100"
                >
                  Calculate BMI
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2 p-8 md:p-12">
              {showResult && bmiResult ? (
                <div id="bmi-result">
                  <div className="text-center mb-8">
                    <div className="inline-block p-4 rounded-full bg-primary-light bg-opacity-20 text-primary font-bold text-3xl mb-4">
                      {bmiResult.bmi}
                    </div>
                    <h3 className="font-heading font-semibold text-xl text-neutral-900">
                      Your BMI: <span>{bmiResult.category}</span>
                    </h3>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    <div className="h-8 bg-neutral-100 rounded-full overflow-hidden relative">
                      <div className="absolute inset-0 flex">
                        <div className="h-full bg-green-400 flex-grow-0" style={{ width: "18%" }}>
                          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-white">Underweight</span>
                        </div>
                        <div className="h-full bg-primary flex-grow-0" style={{ width: "22%" }}>
                          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-white">Normal</span>
                        </div>
                        <div className="h-full bg-yellow-400 flex-grow-0" style={{ width: "30%" }}>
                          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-white">Overweight</span>
                        </div>
                        <div className="h-full bg-orange-400 flex-grow-0" style={{ width: "30%" }}>
                          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-white">Obese</span>
                        </div>
                      </div>
                      {/* Position indicator */}
                      <div className="absolute top-0 h-8 w-1 bg-neutral-800" style={{ left: `${bmiResult.position}%` }}></div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-neutral-600">
                      <span>16.5</span>
                      <span>18.5</span>
                      <span>25</span>
                      <span>30</span>
                      <span>40</span>
                    </div>
                  </div>
                  
                  <div className="bg-neutral-50 p-5 rounded-lg mb-6">
                    <h4 className="font-heading font-semibold text-lg mb-2 text-neutral-900">Your Recommendation</h4>
                    <p className="text-neutral-700">
                      Based on your BMI, we recommend our <strong>
                      {bmiResult.category === 'Underweight' ? 'Weight Gain' :
                       bmiResult.category === 'Normal' ? 'Balanced Weight Management' :
                       bmiResult.category === 'Overweight' ? 'Weight Management' : 'Weight Loss'}
                      </strong> plan to help you maintain a healthy weight while optimizing your nutrition.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="#plans" className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md text-center transition-colors flex-1">
                      See Recommended Plans
                    </a>
                    <a href="#booking" className="bg-secondary hover:bg-secondary/90 text-white font-medium px-6 py-3 rounded-md text-center transition-colors flex-1">
                      Book a Consultation
                    </a>
                  </div>
                  
                  <div className="text-center mt-6">
                    <Button variant="link" onClick={resetCalculator}>
                      Calculate Again
                    </Button>
                  </div>
                </div>
              ) : (
                <div id="bmi-initial" className="text-center py-8">
                  <svg
                    className="w-40 h-40 mx-auto mb-6 text-primary/20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <h3 className="font-heading font-semibold text-xl mb-3 text-neutral-900">Discover Your BMI</h3>
                  <p className="text-neutral-700 mb-6">Fill in your height and weight in the calculator to get started on your nutrition journey.</p>
                  <div className="flex items-center justify-center">
                    <span className="block md:hidden text-primary">↑ Complete the form above ↑</span>
                    <div className="hidden md:block text-2xl text-primary animate-pulse">
                      ←
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
