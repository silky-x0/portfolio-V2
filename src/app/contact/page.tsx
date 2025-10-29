'use client';

import GridDistortion from '@/components/GridDistortion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
});

export default function Contact() {
  const { theme } = useTheme();
  const [imageSrc, setImageSrc] = useState('/img/contactBGLight.jpg');
  const [messageLength, setMessageLength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setImageSrc(theme === 'dark' ? '/img/contactBGDark.jpg' : '/img/contactBGLight.jpg');
  }, [theme]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await validationSchema.validate(data, { abortEarly: false });
      // Simulate a network request
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Message sent successfully!');
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        error.inner.forEach(err => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageLength(e.target.value.length);
  };

  return (
    <div className="relative w-full h-screen bg-background">
      <div className="absolute inset-0 z-0">
        <GridDistortion imageSrc={imageSrc} grid={10} mouse={0.1} strength={0.15} />
      </div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="max-w-md w-full p-8 bg-background/50 backdrop-blur-md rounded-2xl border border-border">
          <h1 className="text-4xl font-bold text-foreground text-center mb-8 font-migae">Contact Me</h1>
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full bg-secondary/50 border border-border rounded-md py-3 px-4 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition"
                placeholder="Your Name"
                disabled={isSubmitting}
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full bg-secondary/50 border border-border rounded-md py-3 px-4 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition"
                placeholder="your.email@example.com"
                disabled={isSubmitting}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-muted-foreground">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 block w-full bg-secondary/50 border border-border rounded-md py-3 px-4 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition"
                placeholder="Your message..."
                onChange={handleMessageChange}
                maxLength={500}
                disabled={isSubmitting}
              ></textarea>
              <div className="flex justify-between items-center">
                {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
                <p className="text-sm text-muted-foreground text-right">{messageLength} / 500</p>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
