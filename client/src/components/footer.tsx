import { Link } from "wouter";
import { Leaf, Mail, Phone, Globe, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-200 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/" className="text-2xl font-bold text-white flex items-center mb-4">
              <Leaf className="mr-2 h-6 w-6" />
              <span>NutriFitness</span>
            </Link>
            <p className="mb-6">Customized nutrition plans to help you achieve your health and fitness goals with expert guidance.</p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="/#about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="/#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="/#plans" className="hover:text-primary transition-colors">Pricing Plans</a></li>
              <li><a href="/#testimonials" className="hover:text-primary transition-colors">Testimonials</a></li>
              <li><a href="/#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-white">Services</h4>
            <ul className="space-y-3">
              <li><a href="/#plans" className="hover:text-primary transition-colors">Personalized Diet Plans</a></li>
              <li><a href="/#plans" className="hover:text-primary transition-colors">Sports Nutrition</a></li>
              <li><a href="/#plans" className="hover:text-primary transition-colors">Weight Management</a></li>
              <li><a href="/#booking" className="hover:text-primary transition-colors">Nutrition Consultation</a></li>
              <li><a href="/#bmi" className="hover:text-primary transition-colors">BMI Calculator</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-white">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mt-1 mr-3 text-primary" />
                <span>eshitapareek97@gmail.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mt-1 mr-3 text-primary" />
                <span>+91 98247 76980</span>
              </li>
              <li className="flex items-start">
                <Globe className="h-5 w-5 mt-1 mr-3 text-primary" />
                <span>nutrifitness.in.net</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-8 text-center text-sm text-neutral-400">
          <p>&copy; {new Date().getFullYear()} NutriFitness. All Rights Reserved. Created by Eshita Pareek.</p>
        </div>
      </div>
    </footer>
  );
}
