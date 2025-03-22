import { CheckCircle, CalendarCheck } from "lucide-react";

export default function BookingSection() {
  return (
    <section id="booking" className="py-16 md:py-24 bg-neutral-800 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
            <span className="text-primary font-medium">Book a Consultation</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mt-2 mb-6">Get Started With a Free Consultation</h2>
            <p className="mb-6">
              Take the first step towards your nutrition goals with a free 30-minute consultation. We'll discuss your current situation, goals, and how I can help you achieve them.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="mr-4 text-primary text-xl mt-1">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-1">Personalized Assessment</h3>
                  <p className="text-neutral-300">Discuss your current health status, goals, and any challenges you're facing.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 text-primary text-xl mt-1">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-1">Plan Recommendation</h3>
                  <p className="text-neutral-300">Get expert advice on which nutrition approach would work best for your specific needs.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 text-primary text-xl mt-1">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-1">Q&A Session</h3>
                  <p className="text-neutral-300">Ask any questions you have about the process, approach, or expected results.</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <CalendarCheck className="text-primary h-6 w-6 mr-4" />
              <p>Sessions available 7 days a week, including evenings.</p>
            </div>
          </div>
          
          <div className="md:w-1/2 bg-white rounded-xl overflow-hidden">
            {/* Calendly inline widget */}
            <div className="calendly-inline-widget" data-url="https://calendly.com/jhaabhishek1998/30min" style={{ minWidth: "320px", height: "700px" }}></div>
            <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
          </div>
        </div>
      </div>
    </section>
  );
}
