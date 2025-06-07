import React, { useState, FormEvent } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Mail, Send, User, Building2, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

// Use relative URL for production compatibility
const EMAIL_SERVER_URL = '/api/send-email';

const ContactForm: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Get the form data directly from the form element
      const formElement = e.target as HTMLFormElement;
      
      // Extract form values for direct email server
      const formValues = {
        name: (formElement.elements.namedItem('name') as HTMLInputElement).value,
        email: (formElement.elements.namedItem('email') as HTMLInputElement).value,
        company: (formElement.elements.namedItem('company') as HTMLInputElement)?.value || '',
        message: (formElement.elements.namedItem('message') as HTMLInputElement).value
      };
      
      // Log what we're sending
      console.log("Form data being sent:", formValues);
      
      // Send via direct email server
      const response = await fetch(EMAIL_SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
      
      // Get the full response text for better debugging
      const responseText = await response.text();
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse response as JSON:", responseText);
        responseData = { message: "Server returned invalid JSON response" };
      }
      
      if (!response.ok) {
        console.error("Server responded with error:", response.status, responseData);
        throw new Error(responseData.message || `Error ${response.status}: Failed to send message`);
      }
      
      console.log("Email sent successfully:", responseData);
      
      // Show success message
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset the form
      formElement.reset();
    } catch (error) {
      console.error("Failed to send email:", error);
      toast({
        title: "Error sending message",
        description: `${error.message || "Please try again or contact us directly at vikashinnamuri@gmail.com or lohapriyamanthiram@gmail.com"}`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="card-custom bg-quickwink-darkest/70 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="relative">
            <label htmlFor="name" className="block mb-2 text-white/80 font-medium">
              Name
            </label>
            <div className="relative">
              <User className={`absolute left-3 top-3.5 h-5 w-5 transition-colors duration-200 ${focusedField === 'name' ? 'text-quickwink-neon' : 'text-white/50'}`} />
              <input
                type="text"
                id="name" 
                name="name"
                required
                className="w-full bg-quickwink-dark/50 border border-white/10 pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-quickwink-neon focus:border-transparent text-white transition-all duration-200"
                placeholder="Your name"
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
              />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="email" className="block mb-2 text-white/80 font-medium">
              Email
            </label>
            <div className="relative">
              <Mail className={`absolute left-3 top-3.5 h-5 w-5 transition-colors duration-200 ${focusedField === 'email' ? 'text-quickwink-neon' : 'text-white/50'}`} />
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-quickwink-dark/50 border border-white/10 pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-quickwink-neon focus:border-transparent text-white transition-all duration-200"
                placeholder="your@email.com"
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
              />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="company" className="block mb-2 text-white/80 font-medium">
            Company
          </label>
          <div className="relative">
            <Building2 className={`absolute left-3 top-3.5 h-5 w-5 transition-colors duration-200 ${focusedField === 'company' ? 'text-quickwink-neon' : 'text-white/50'}`} />
            <input
              type="text"
              id="company"
              name="company"
              className="w-full bg-quickwink-dark/50 border border-white/10 pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-quickwink-neon focus:border-transparent text-white transition-all duration-200"
              placeholder="Your company (optional)"
              onFocus={() => setFocusedField('company')}
              onBlur={() => setFocusedField(null)}
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block mb-2 text-white/80 font-medium">
            Message
          </label>
          <div className="relative">
            <MessageSquare className={`absolute left-3 top-3.5 h-5 w-5 transition-colors duration-200 ${focusedField === 'message' ? 'text-quickwink-neon' : 'text-white/50'}`} />
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full bg-quickwink-dark/50 border border-white/10 pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-quickwink-neon focus:border-transparent text-white resize-none transition-all duration-200"
              placeholder="How can we help you?"
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
            ></textarea>
          </div>
        </div>
        
        <motion.button 
          type="submit" 
          disabled={isSubmitting}
          className="btn-primary w-full hover:scale-[1.02] transition-all duration-200 flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <>
              <span className="animate-pulse mr-2">Sending</span>
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 bg-black rounded-full animate-bounce"></div>
              </div>
            </>
          ) : (
            <>
              Send Message
              <Send size={16} className="ml-2" />
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
