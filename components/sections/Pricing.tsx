import React from 'react';
import Link from 'next/link';
import { CheckIcon, StarIcon } from 'lucide-react';

export function Pricing() {
  const plans = [
    { name: 'Basic', price: '$9', features: ['5GB Storage', '2 Team Members', 'Basic Support'] },
    { name: 'Pro', price: '$29', features: ['50GB Storage', '10 Team Members', '24/7 Support'], popular: true },
    { name: 'Enterprise', price: 'Custom', features: ['Unlimited Storage', 'Unlimited Team Members', 'Dedicated Account Manager'] },
  ];

  return (
    <section id="pricing" className="w-full py-20 md:py-32 lg:py-40">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Transparent Pricing for Every Need</h2>
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative flex flex-col p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${plan.popular ? 'bg-accent/10' : 'bg-card/30'} backdrop-blur-xl border border-accent/20 shadow-lg`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">Most Popular</div>
              )}
              <h3 className="text-2xl font-bold mb-2 text-primary">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6 text-accent">
                {plan.price}<span className="text-xl font-normal text-muted-foreground">/mo</span>
              </p>
              <ul className="mb-8 space-y-4 flex-grow">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-muted-foreground">
                    <CheckIcon className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/signup?plan=${plan.name.toLowerCase()}`}
                className={`mt-auto inline-flex h-12 items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  plan.popular
                    ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                }`}
              >
                Choose {plan.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}