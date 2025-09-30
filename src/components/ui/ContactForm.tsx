import { useState } from 'react';
import { motion } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  userType: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    userType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '', userType: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const whatsappMessage = encodeURIComponent(
    `Bonjour Issa, je vous contacte depuis votre portfolio.\n\nNom: ${formData.name}\nEmail: ${formData.email}\nType de visiteur: ${formData.userType}\nSujet: ${formData.subject}\n\nMessage:\n${formData.message}`
  );

  return (
    <div className="glass-panel p-6 rounded-2xl">
      <h4 className="font-semibold text-foreground mb-6 flex items-center gap-2">
        <span>✉️</span>
        Envoyez-moi un message
      </h4>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Nom complet *
            </label>
            <input 
              type="text" 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Votre nom"
              className="w-full p-3 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email *
            </label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="votre@email.com"
              className="w-full p-3 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="userType" className="block text-sm font-medium text-foreground mb-2">
            Type de visiteur *
          </label>
          <select 
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-background border border-border text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition"
          >
            <option value="">Sélectionnez votre profil</option>
            <option value="recruteur">Recruteur</option>
            <option value="chercheur-prestataire">Chercheur de prestataire</option>
            <option value="chercheur-collaborateur">Chercheur de collaborateur</option>
            <option value="visiteur-admirateur">Visiteur admirateur</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
            Sujet *
          </label>
          <input 
            type="text" 
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Ex: Projet web, Collaboration, etc."
            className="w-full p-3 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
            Message *
          </label>
          <textarea 
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Décrivez votre projet ou vos besoins..."
            rows={5}
            className="w-full p-3 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
          ></textarea>
        </div>

        <div className="w-full">
          <motion.a
            href={`https://wa.me/221776828441?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full block py-3 px-6 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 transition-all text-center"
          >
            📱 Envoyer via WhatsApp
          </motion.a>
        </div>
      </form>

      {/* Success message */}
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg text-green-800 dark:text-green-200 text-sm"
        >
          ✅ Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.
        </motion.div>
      )}

      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Vous préférez un contact direct ? Appelez-moi au{' '}
          <a href="tel:+221776828441" className="text-primary hover:underline">
            +221 77 682 8441
          </a>
        </p>
      </div>
    </div>
  );
}