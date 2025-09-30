import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { Card } from './card';

interface Message {
  id: string;
  text: string;
  type: 'assistant' | 'user';
  timestamp: Date;
}

interface AvatarAssistantProps {
  currentSection?: string;
}

type UserType = 'unknown' | 'visitor' | 'recruiter';

interface UserProfile {
  type: UserType;
  name?: string;
  company?: string;
  interests?: string[];
}

const sectionMessages = {
  home: "Bienvenue ! Je vais vous présenter le portfolio d'Issa KAMARA, développeur passionné et entrepreneur créatif.",
  projects: "Découvrez les projets innovants d'Issa : du e-commerce à la santé numérique, chaque réalisation démontre son expertise technique.",
  skills: "Les compétences d'Issa allient technique et créativité : développement web, design, et une approche unique enrichie par son parcours artistique.",
  about: "Le parcours d'Issa est fascinant : artiste peintre, entrepreneur dans le café, aujourd'hui développeur web qui révolutionne l'expérience digitale.",
  contact: "Prêt à collaborer avec Issa ? Je peux vous mettre en contact et vous orienter selon vos besoins professionnels."
};

const welcomeMessage = "Bonjour ! Je suis Ndeye Fatou Sow, Assistante virtuelle de Chackor Organisation et conseillère technique d'Issa KAMARA. Je suis là pour vous guider dans votre visite et vous aider à découvrir le travail exceptionnel d'Issa. Permettez-moi de personnaliser votre expérience !";

export default function AvatarAssistant({ currentSection = 'home' }: AvatarAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({ type: 'unknown' });
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, type: 'assistant' | 'user') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      type,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const speakText = async (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.9;
      utterance.pitch = 1.2; // Voix plus aiguë pour une femme
      
      // Préférer une voix féminine si disponible
      const voices = speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.lang.includes('fr') && 
        (voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('femme'))
      );
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      speechSynthesis.speak(utterance);
    }
  };

  // Fonction de bienvenue initiale
  const handleWelcome = () => {
    if (!hasWelcomed) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage(welcomeMessage, 'assistant');
        speakText(welcomeMessage);
        setHasWelcomed(true);
        // Proposer le formulaire de profil après la présentation
        setTimeout(() => {
          setShowProfileForm(true);
        }, 2000);
      }, 1000);
    }
  };

  const handleSectionPresentation = () => {
    const baseMessage = sectionMessages[currentSection as keyof typeof sectionMessages] || sectionMessages.home;
    let contextualMessage = baseMessage;
    
    // Adapter le message selon le profil utilisateur
    if (userProfile.type === 'recruiter') {
      contextualMessage += " En tant que recruteur, je vous recommande de consulter le CV complet et les détails professionnels d'Issa dans la section contact.";
    } else if (userProfile.type === 'visitor') {
      contextualMessage += " Prenez votre temps pour explorer et n'hésitez pas à me poser des questions !";
    }
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(contextualMessage, 'assistant');
      speakText(contextualMessage);
    }, 1000);
  };

  const handleUserTypeSelection = (type: UserType) => {
    setUserProfile({ ...userProfile, type });
    setShowProfileForm(false);
    
    let response = "";
    if (type === 'recruiter') {
      response = "Excellent ! En tant que recruteur, je vais vous orienter vers les informations professionnelles d'Issa. Vous trouverez son CV complet, ses expériences détaillées et ses réalisations dans la section Portfolio. Je peux aussi vous présenter ses projets les plus pertinents pour vos besoins de recrutement.";
    } else {
      response = "Parfait ! Je vais personnaliser votre visite pour que vous découvriez le meilleur du travail d'Issa. Laissez-moi vous guider à travers son portfolio et ses créations remarquables.";
    }
    
    addMessage(response, 'assistant');
    speakText(response);
  };

  const handleQuickAction = (action: string) => {
    let response = "";
    
    switch (action) {
      case 'projects':
        if (userProfile.type === 'recruiter') {
          response = "Pour un recruteur, je recommande particulièrement le projet Chackor Shop (e-commerce full-stack) et Kou Ayé (app mobile pour pharmacies). Ces projets démontrent parfaitement les compétences techniques d'Issa en développement web moderne.";
        } else {
          response = "Découvrez les créations d'Issa : l'e-commerce Chackor Shop, l'application Kou Ayé pour les pharmacies de garde, et son outil WiFi QR Scanner. Chaque projet raconte une histoire d'innovation !";
        }
        break;
      case 'skills':
        if (userProfile.type === 'recruiter') {
          response = "Issa maîtrise React, JavaScript, Python, TypeScript et les technologies modernes. Son profil unique combine développement technique, design UX/UI et gestion de projet. Son background artistique apporte une valeur ajoutée rare sur le marché.";
        } else {
          response = "Les compétences d'Issa sont fascinantes : développement web moderne, design créatif, et une approche unique enrichie par 10 ans d'art et 6 ans d'entrepreneuriat.";
        }
        break;
      case 'contact':
        if (userProfile.type === 'recruiter') {
          response = "Issa est disponible pour des opportunités professionnelles. Contactez-le directement : issakamara958@gmail.com ou +221 77 682 8441. Son portfolio complet avec CV est accessible dans la section dédiée.";
        } else {
          response = "Vous pouvez contacter Issa via email, WhatsApp, ou découvrir son travail sur GitHub. Il est toujours ouvert aux collaborations créatives !";
        }
        break;
      case 'background':
        response = "Le parcours d'Issa est extraordinaire : 10 ans comme artiste peintre, 6 ans d'entrepreneuriat dans le café, maintenant développeur web passionné. Cette richesse d'expériences nourrit sa créativité digitale !";
        break;
      case 'portfolio':
        response = "Je vous oriente vers le portfolio professionnel complet d'Issa où vous trouverez CV, certifications, et détails de ses expériences. C'est l'endroit idéal pour les recruteurs !";
        break;
      default:
        response = "Comment puis-je personnaliser votre découverte du travail d'Issa ? Je m'adapte à vos besoins spécifiques !";
    }
    
    addMessage(response, 'assistant');
    speakText(response);
  };

  return (
    <>
      {/* Avatar Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg relative overflow-hidden"
        >
          <motion.div
            animate={{
              scale: isSpeaking ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 0.5,
              repeat: isSpeaking ? Infinity : 0,
            }}
            className="text-2xl"
          >
            👩‍💻
          </motion.div>
          
          {/* Pulse effect when speaking */}
          {isSpeaking && (
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/30"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
          )}
        </Button>
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-40 w-80 sm:w-96"
          >
            <Card className="glass-panel border-0 shadow-2xl">
              {/* Header */}
              <div className="p-4 border-b border-border/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center text-lg">
                    👩‍💻
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Ndeye Fatou Sow</h3>
                    <p className="text-xs text-muted-foreground">Assistante virtuelle - Chackor Organisation</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="ml-auto"
                  >
                    ✕
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="h-64 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 && !showProfileForm && (
                  <div className="text-center text-muted-foreground text-sm">
                    <p>Bonjour ! Je suis Ndeye Fatou Sow.</p>
                    <p>Cliquez sur "Me rencontrer" pour commencer votre visite personnalisée !</p>
                  </div>
                )}
                
                {/* Formulaire de profil utilisateur */}
                {showProfileForm && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-secondary/50 p-4 rounded-lg space-y-3"
                  >
                    <h4 className="font-semibold text-sm text-foreground">Pour mieux vous servir :</h4>
                    <p className="text-xs text-muted-foreground">Quel est votre profil ?</p>
                    <div className="space-y-2">
                      <Button
                        onClick={() => handleUserTypeSelection('visitor')}
                        variant="outline"
                        size="sm"
                        className="w-full text-xs justify-start"
                      >
                        🎯 Simple visiteur - Je découvre le portfolio
                      </Button>
                      <Button
                        onClick={() => handleUserTypeSelection('recruiter')}
                        variant="outline"
                        size="sm"
                        className="w-full text-xs justify-start"
                      >
                        💼 Recruteur - J'évalue un profil professionnel
                      </Button>
                    </div>
                  </motion.div>
                )}
                
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-secondary text-secondary-foreground p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Actions */}
              <div className="p-4 border-t border-border/20">
                <div className="space-y-2">
                  {!hasWelcomed ? (
                    <Button
                      onClick={handleWelcome}
                      size="sm"
                      className="w-full"
                      disabled={isTyping}
                    >
                      👋 Me rencontrer
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={handleSectionPresentation}
                        size="sm"
                        className="w-full"
                        disabled={isTyping}
                      >
                        🎯 Présenter cette section
                      </Button>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickAction('projects')}
                          className="text-xs"
                        >
                          📁 Projets
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickAction('skills')}
                          className="text-xs"
                        >
                          ⚡ Compétences
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickAction('background')}
                          className="text-xs"
                        >
                          🎨 Parcours
                        </Button>
                        {userProfile.type === 'recruiter' ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickAction('portfolio')}
                            className="text-xs"
                          >
                            💼 Portfolio Pro
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickAction('contact')}
                            className="text-xs"
                          >
                            📞 Contact
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}