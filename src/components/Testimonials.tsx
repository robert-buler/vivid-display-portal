
import React from 'react';

const testimonials = [
  {
    text: "Integrating our existing OIDC provider with this platform was incredibly straightforward. The .NET 8 backend made our authentication flow secure and reliable.",
    author: "Sarah Johnson",
    title: "CTO, TechSolutions Inc."
  },
  {
    text: "We needed a SaaS platform that could handle our complex identity requirements. This solution exceeded our expectations with its robust .NET 8 implementation.",
    author: "Michael Chen",
    title: "Lead Developer, Enterprise Systems"
  },
  {
    text: "The OIDC integration saved us months of development time. Now we can focus on our core business while providing secure authentication to our users.",
    author: "Emily Rodriguez",
    title: "Product Manager, Innovate Labs"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted by Developers
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            See what our customers are saying about our .NET 8 powered SaaS platform.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col p-6 bg-gray-50 rounded-xl">
              <blockquote className="flex-grow">
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </blockquote>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="font-medium">{testimonial.author}</div>
                <div className="text-sm text-gray-500">{testimonial.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
