import React from 'react';

export function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Customers Say</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <blockquote className="bg-white p-6 rounded-lg shadow">
            <p className="text-lg mb-4">"DocuManage has transformed the way we handle documents. It's intuitive, secure, and incredibly efficient."</p>
            <cite className="font-medium">- Sarah Johnson, CEO of TechStart</cite>
          </blockquote>
          <blockquote className="bg-white p-6 rounded-lg shadow">
            <p className="text-lg mb-4">"The collaboration features are top-notch. Our team's productivity has skyrocketed since we started using DocuManage."</p>
            <cite className="font-medium">- Michael Chen, Project Manager at InnovaCorp</cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}