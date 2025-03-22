import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Utensils, Video, Activity, ArrowRight } from "lucide-react";

const services = [
  {
    icon: <Utensils className="text-primary text-xl" />,
    title: "Personalized Diet Plans",
    description: "Custom nutrition plans designed specifically for your body type, goals, and lifestyle. Regular adjustments based on your progress.",
    link: "/#plans"
  },
  {
    icon: <Video className="text-primary text-xl" />,
    title: "1-on-1 Consultations",
    description: "Virtual sessions with Eshita to discuss your nutrition goals, challenges, and create strategies for long-term success.",
    link: "/#booking"
  },
  {
    icon: <Activity className="text-primary text-xl" />,
    title: "Sports Nutrition",
    description: "Specialized nutrition plans for athletes and fitness enthusiasts to enhance performance, recovery, and achieve optimal results.",
    link: "/#plans"
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-medium">Our Services</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl mt-2 mb-4 text-neutral-900">Comprehensive Nutrition Solutions</h2>
          <p className="text-neutral-700 max-w-3xl mx-auto">Our services are tailored to meet your unique health goals, whether you're an athlete looking to optimize performance or someone seeking a healthier lifestyle.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-neutral-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-primary-light bg-opacity-20 rounded-full flex items-center justify-center mb-5">
                {service.icon}
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3 text-neutral-900">{service.title}</h3>
              <p className="text-neutral-700 mb-4">{service.description}</p>
              <Link href={service.link} className="text-primary font-medium inline-flex items-center hover:text-primary-dark transition-colors">
                {service.link.includes("booking") ? "Book now" : "Learn more"} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="default" className="bg-neutral-800 hover:bg-neutral-900">
            View All Services <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
