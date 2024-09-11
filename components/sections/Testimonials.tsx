import React from 'react';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';

export function Testimonials() {
  const testimonialItems = [
    {
      quote: "DocuManage has transformed the way we handle documents. It's intuitive, secure, and incredibly efficient.",
      name: "Sarah Johnson",
      title: "CEO of TechStart"
    },
    {
      quote: "The collaboration features are top-notch. Our team's productivity has skyrocketed since we started using DocuManage.",
      name: "Michael Chen",
      title: "Project Manager at InnovaCorp"
    },
    {
      quote: "DocuManage has saved us so much time and money. The user interface is fantastic and easy to use.",
      name: "Emily Davis",
      title: "Operations Manager at FinTech Group"
    },
    {
      quote: "The best document management solution we've ever used. Highly recommend it to any business looking to streamline their processes.",
      name: "James Wilson",
      title: "CTO at InnovateX"
    }
    // Add more testimonials as needed
  ];

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 flex justify-center items-center">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          What Our Customers Say
        </h2>
        <InfiniteMovingCards
          items={testimonialItems}
          direction="left"  // You can set this to "right" if you prefer
          speed="normal"    // Adjust speed: "fast", "normal", or "slow"
          pauseOnHover={true} // Pauses animation when the user hovers over the cards
          className="mt-6"
        />
      </div>
    </section>
  );
}
