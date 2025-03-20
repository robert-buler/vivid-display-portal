
import React from 'react';
import { Shield, Zap, Key, Server, Database, Layers } from 'lucide-react';

const features = [
  {
    icon: <Shield className="h-10 w-10 text-blue-500" />,
    title: "OIDC Authentication",
    description: "Seamless OpenID Connect integration with .NET 8's robust authentication system."
  },
  {
    icon: <Zap className="h-10 w-10 text-yellow-500" />,
    title: "High Performance",
    description: ".NET 8's performance improvements deliver blazing fast response times."
  },
  {
    icon: <Key className="h-10 w-10 text-green-500" />,
    title: "Identity Management",
    description: "Complete user management with role-based access control built on ASP.NET Core Identity."
  },
  {
    icon: <Server className="h-10 w-10 text-purple-500" />,
    title: ".NET 8 Backend",
    description: "Leverage the latest features of .NET 8 including minimal APIs and improved performance."
  },
  {
    icon: <Database className="h-10 w-10 text-red-500" />,
    title: "Data Protection",
    description: "Built-in data protection API ensures your sensitive information stays secure."
  },
  {
    icon: <Layers className="h-10 w-10 text-indigo-500" />,
    title: "Multi-tenant Architecture",
    description: "Designed from the ground up to support multiple organizations with data isolation."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Enterprise-Ready Features
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
            Built with modern .NET 8 technology and designed for seamless integration with your identity infrastructure.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-200">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
