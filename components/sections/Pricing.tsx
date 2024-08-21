import React from 'react';
import Link from 'next/link';
import { CheckIcon } from 'lucide-react';

export function Pricing() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Simple, Transparent Pricing</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {['Basic', 'Pro', 'Enterprise'].map((plan) => (
            <div key={plan} className="flex flex-col p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">{plan}</h3>
              <p className="text-4xl font-bold mb-6">
                {plan === 'Basic' ? '$9' : plan === 'Pro' ? '$29' : 'Custom'}<span className="text-xl font-normal">/mo</span>
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  {plan === 'Basic' ? '5GB Storage' : plan === 'Pro' ? '50GB Storage' : 'Unlimited Storage'}
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  {plan === 'Basic' ? '2 Team Members' : plan === 'Pro' ? '10 Team Members' : 'Unlimited Team Members'}
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  {plan === 'Basic' ? 'Basic Support' : plan === 'Pro' ? '24/7 Support' : 'Dedicated Account Manager'}
                </li>
              </ul>
              <Link
                href={`/signup?plan=${plan.toLowerCase()}`}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 mt-auto"
              >
                Choose Plan
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}