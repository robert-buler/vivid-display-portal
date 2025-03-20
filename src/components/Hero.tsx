
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Modern SaaS Platform powered by .NET 8
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                Enterprise-grade applications with secure authentication, powerful features, and seamless OIDC integration.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="gap-1.5">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                View Documentation
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-sm font-medium">
              <div className="flex items-center space-x-1.5">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>OpenID Connect Ready</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span>.NET 8 Powered</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-full md:h-[420px] lg:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-2xl opacity-90">
                <div className="h-full w-full bg-white/10 backdrop-blur-sm rounded-xl p-8 flex items-center justify-center">
                  <div className="flex flex-col space-y-4 bg-black/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="h-3 w-3 rounded-full bg-red-400"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                        <div className="h-3 w-3 rounded-full bg-green-400"></div>
                      </div>
                      <span className="text-xs text-white/70">NetSaas Login</span>
                    </div>
                    <div className="space-y-3 text-white">
                      <div className="text-xs font-mono">&lt;OpenIdConnect&gt;</div>
                      <div className="text-xs font-mono pl-4">Authority="https://identity.netsaas.com"</div>
                      <div className="text-xs font-mono pl-4">ClientId="your-app"</div>
                      <div className="text-xs font-mono pl-4">ResponseType="code"</div>
                      <div className="text-xs font-mono">&lt;/OpenIdConnect&gt;</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
