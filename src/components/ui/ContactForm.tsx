import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabaseClient';

interface FormData {
  full_name: string;
  email: string;
  phone: string;
  visitor_type: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    phone: '',
    visitor_type: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // 1. Send data to Supabase
    const { error } = await supabase.from('contacts').insert([formData]);

    if (error) {
      console.error('Error submitting to Supabase:', error);
      setSubmitStatus('error');
      setIsSubmitting(false);
    } else {
      setSubmitStatus('success');
      setIsSubmitting(false);
      
      // 2. Prepare and open WhatsApp chat
      const whatsappNumber = "221776828441";
      const messageBody = `*Nouveau contact depuis votre portfolio :*\n\n*Prénom & Nom :* ${formData.full_name}\n*Email :* ${formData.email}\n*Téléphone :* ${formData.phone}\n*Profil Visiteur :* ${formData.visitor_type}\n*Sujet :* ${formData.subject}\n\n*Message :*\n${formData.message}`;
      
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageBody)}`;
      window.open(whatsappUrl, '_blank');

      // 3. Reset form
      setFormData({ full_name: '', email: '', phone: '', visitor_type: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl">
       <h4 className="font-semibold text-foreground mb-6 flex items-center gap-3">
        <span className="text-xl">✉️</span>
        Envoyez-moi un message
      </h4>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
           <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            placeholder="Prénom & Nom *"
            className="w-full p-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary transition"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email *"
            className="w-full p-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary transition"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Téléphone (+Indicatif)"
            className="w-full p-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary transition"
          />
          <select
            name="visitor_type"
            value={formData.visitor_type}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary transition"
          >
            <option value="">Vous êtes... *</option>
            <option value="recruteur">Un recruteur</option>
            <option value="client-potentiel">Un client potentiel</option>
            <option value="collaborateur-potentiel">Un collaborateur potentiel</option>
            <option value="visiteur">Un simple visiteur</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          placeholder="Sujet de votre message *"
          className="w-full p-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary transition"
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Votre message... *"
          rows={5}
          className="w-full p-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary transition resize-none"
        ></textarea>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-6 rounded-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer et Contacter sur WhatsApp'}
        </motion.button>
      </form>

      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg text-center text-sm"
        >
          ✅ Message enregistré ! Vous allez être redirigé vers WhatsApp.
        </motion.div>
      )}
      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-center text-sm"
        >
          ❌ Une erreur est survenue. L\'enregistrement a échoué.
        </motion.div>
      )}
    </div>
  );
}