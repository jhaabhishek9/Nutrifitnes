import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ClipboardList, Calculator, Star, StarHalf } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="hero" className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-neutral-50 to-green-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
            <span className="bg-primary/20 text-primary-dark px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">
              Gold Medalist Sports Nutritionist
            </span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6 text-neutral-900">
              Transform Your Health With <span className="text-primary">Personalized</span> Nutrition Plans
            </h1>
            <p className="text-lg text-neutral-700 mb-8">
              Expert-crafted diet plans tailored to your unique needs by Eshita Pareek, a certified sports nutritionist with 3+ years of experience helping clients achieve their fitness goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/#plans">
                <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                  <ClipboardList className="mr-2 h-4 w-4" /> Explore Diet Plans
                </Button>
              </Link>
              <Link href="/#bmi">
                <Button variant="secondary" className="w-full sm:w-auto">
                  <Calculator className="mr-2 h-4 w-4" /> Calculate BMI
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex items-center">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs">
                  JP
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs">
                  RS
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs">
                  AK
                </div>
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <StarHalf className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="ml-2 text-sm font-bold text-neutral-700">4.8/5</span>
                </div>
                <p className="text-sm text-neutral-700">Based on 200+ happy clients</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 bg-primary-light bg-opacity-30 rounded-full h-36 w-36 md:h-48 md:w-48"></div>
              <div className="absolute -bottom-6 -right-6 bg-secondary-light bg-opacity-30 rounded-full h-32 w-32 md:h-40 md:w-40"></div>
              <div className="flex flex-col rounded-lg shadow-xl relative z-10 bg-white">
                <img
                  src="/images/eshita-gold-medal.jpg"
                  alt="Eshita Pareek - Gold Medalist Sports Nutritionist"
                  className="w-full h-auto rounded-t-lg"
                />
                <div className="p-4 bg-primary/10 rounded-b-lg">
                  <a 
                    href="https://youtube.com/shorts/EoxqbECrLN0?si=yUNNaHU9RXwjVKyY" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-primary-dark font-medium hover:underline"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    Watch Gold Medal Ceremony Video
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
