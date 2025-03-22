import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    achievement: "Lost 15 kg in 6 months",
    rating: 5,
    testimonial: "Eshita's personalized approach to nutrition completely changed my relationship with food. Her plan was easy to follow and fit perfectly with my busy lifestyle. The results speak for themselves!"
  },
  {
    name: "Rahul Patel",
    achievement: "Fitness enthusiast",
    rating: 4.5,
    testimonial: "As an amateur athlete, I needed a nutrition plan that would fuel my workouts while helping me build lean muscle. Eshita's sports nutrition expertise was exactly what I needed. My performance has improved dramatically!"
  },
  {
    name: "Anita Desai",
    achievement: "Working professional",
    rating: 5,
    testimonial: "I was struggling with low energy and digestive issues for years. Eshita identified my food sensitivities and created a plan that transformed my health. I feel better than I have in decades!"
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-medium">Testimonials</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl mt-2 mb-4 text-neutral-900">What Our Clients Say</h2>
          <p className="text-neutral-700 max-w-3xl mx-auto">Real stories from people who have transformed their health with our nutrition plans.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-neutral-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <img 
                  src={`/images/eshita-${index === 0 ? 'profile' : index === 1 ? 'portrait' : 'gold-medal'}.jpg`} 
                  alt={`${testimonial.name} - Client Testimonial`}
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-primary/20"
                />
                <div>
                  <h4 className="font-heading font-semibold text-neutral-900">{testimonial.name}</h4>
                  <p className="text-sm text-neutral-600">{testimonial.achievement}</p>
                </div>
              </div>
              
              <div className="flex text-yellow-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(testimonial.rating) ? 'fill-yellow-500' : i < testimonial.rating ? 'fill-yellow-500 stroke-yellow-500' : ''}`} 
                  />
                ))}
              </div>
              
              <p className="text-neutral-700">
                "{testimonial.testimonial}"
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button className="bg-primary hover:bg-primary/90">
            Start Your Transformation
          </Button>
        </div>
      </div>
    </section>
  );
}
