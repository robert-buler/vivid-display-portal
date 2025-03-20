
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Starter",
    price: "$49",
    description: "Perfect for small teams and startups",
    features: [
      "Up to 5 users",
      "Basic OIDC integration",
      "Email support",
      "1 project",
      "Basic analytics"
    ],
    popular: false,
    buttonText: "Get Started"
  },
  {
    name: "Professional",
    price: "$99",
    description: "Ideal for growing businesses",
    features: [
      "Up to 20 users",
      "Advanced OIDC & OAuth flows",
      "Priority support",
      "5 projects",
      "Advanced analytics",
      "Custom domains"
    ],
    popular: true,
    buttonText: "Try Pro"
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with specific needs",
    features: [
      "Unlimited users",
      "Custom SSO implementation",
      "24/7 dedicated support",
      "Unlimited projects",
      "Custom reporting",
      "SLA guarantees",
      "Dedicated instance"
    ],
    popular: false,
    buttonText: "Contact Sales"
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Choose the plan that's right for your business. All plans include OIDC integration capabilities.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`flex flex-col p-6 bg-white rounded-xl shadow-md ${plan.popular ? 'ring-2 ring-primary relative' : ''}`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 -mt-2 -mr-2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                  Popular
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="ml-1 text-gray-500">/month</span>}
                </div>
                <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
              </div>
              <ul className="mt-4 space-y-3 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-6 w-full" variant={plan.popular ? "default" : "outline"}>
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center text-sm text-gray-500">
          All plans include a 14-day free trial. No credit card required.
        </div>
      </div>
    </section>
  );
};

export default Pricing;
