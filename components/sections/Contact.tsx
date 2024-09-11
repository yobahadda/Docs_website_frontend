"use client"

import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="w-full py-16 md:py-24 lg:py-32 ">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Get in Touch
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-card/30 backdrop-blur-xl border border-accent/20 rounded-2xl overflow-hidden shadow-lg">
            <div className="aspect-video w-full bg-secondary/50 relative p-4">
              <iframe
                title="Our Location"
                className="w-full h-full border-0 rounded-2xl"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-6.88241720199585%2C33.95751631412833%2C-6.878032922744751%2C33.95998373316509&layer=mapnik&marker=33.9587727804912%2C-6.880225557953438"
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-primary mb-4">Contact Information</h3>
              <div className="space-y-3">
                <p className="flex items-center text-muted-foreground">
                  <MapPin className="mr-2 h-5 w-5" />
                  54 Av. Kamal Zebdi, Rabat                </p>
                <p className="flex items-center text-muted-foreground">
                  <Phone className="mr-2 h-5 w-5" />
                  0537712531                </p>
                <p className="flex items-center text-muted-foreground">
                  <Mail className="mr-2 h-5 w-5" />
                  bahaddaayoub123@gmail.com
                </p>
              </div>
            </div>
          </div>
          <div className="bg-card/30 backdrop-blur-xl border border-accent/20 rounded-2xl overflow-hidden shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-primary mb-4">Send us a Message</h3>
            {isSubmitted ? (
              <Alert>
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                  Your message has been sent. We'll get back to you soon.
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-accent/20 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-accent/20 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-accent/20 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}