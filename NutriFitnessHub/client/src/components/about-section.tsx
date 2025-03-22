import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-5/12">
            <div className="relative">
              <div className="absolute top-0 -left-4 w-24 h-24 bg-primary-light opacity-20 rounded-full"></div>
              <img
                src="/images/eshita-portrait.jpg"
                alt="Eshita Pareek - Gold Medalist Sports Nutritionist"
                className="relative z-10 rounded-lg shadow-lg w-full h-auto object-cover"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary-light opacity-20 rounded-full"></div>
            </div>
          </div>
          
          <div className="md:w-7/12">
            <span className="text-primary font-medium">About Me</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mt-2 mb-6 text-neutral-900">Eshita Pareek</h2>
            <div className="flex items-center mb-6">
              <div className="mr-4 rounded-full bg-primary-light bg-opacity-20 p-2">
                <Medal className="text-primary h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg text-neutral-900">Gold Medalist Sports Nutritionist</h3>
                <p className="text-neutral-700">3+ years of professional experience</p>
              </div>
            </div>
            
            <p className="text-neutral-700 mb-4">
              I'm passionate about empowering individuals to transform their lives through nutrition. With a gold medal in sports nutrition and over 3 years of experience, I've helped hundreds of clients achieve their health and fitness goals.
            </p>
            
            <p className="text-neutral-700 mb-6">
              My approach combines cutting-edge nutritional science with practical, sustainable strategies tailored to your unique body, lifestyle, and goals. I believe that nutrition should enhance your life, not restrict it.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">200+</div>
                <div className="text-sm text-neutral-700">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">3+</div>
                <div className="text-sm text-neutral-700">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">15+</div>
                <div className="text-sm text-neutral-700">Specialized Plans</div>
              </div>
            </div>
            
            <a href="#booking">
              <Button className="bg-primary hover:bg-primary/90">
                Book a Consultation
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
