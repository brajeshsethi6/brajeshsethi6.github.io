import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  MapPin, 
  Mail, 
  Phone, 
  Home, 
  User, 
  Briefcase, 
  GraduationCap, 
  MessageSquare,
  Menu,
  X,
  ChevronRight,
  Code2,
  BrainCircuit,
  Database,
  Cloud,
  Terminal
} from 'lucide-react';

// --- Components ---

const TypingText = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1500);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts]);

  return (
    <span className="text-sky-400 font-bold">
      {`${texts[index].substring(0, subIndex)}`}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const Section = ({ id, title, children, className = "" }: { id: string, title: string, children: React.ReactNode, className?: string }) => (
  <section id={id} className={`py-20 px-6 md:px-12 max-w-6xl mx-auto ${className}`}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="section-heading"
    >
      {title}
    </motion.h2>
    {children}
  </section>
);

const SkillBadge = ({ name }: { name: string }) => (
  <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm border border-slate-700 hover:border-sky-500/50 transition-colors">
    {name}
  </span>
);

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [callRequest, setCallRequest] = useState({ number: '', email: '', status: '' });
  const [showCallForm, setShowCallForm] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'contact', label: 'Contact', icon: MessageSquare },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCallRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const number = formData.get('number') as string;
    
    if (!number) {
      setCallRequest({ ...callRequest, status: 'Please enter a number' });
      return;
    }
    setCallRequest({ ...callRequest, status: 'Request sent! I will call you soon.' });
    setTimeout(() => {
      setShowCallForm(false);
      setCallRequest({ number: '', email: '', status: '' });
    }, 3000);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-950">
      
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src="https://picsum.photos/seed/brajesh/100/100" 
            alt="Profile" 
            className="w-10 h-10 rounded-full border-2 border-sky-500"
            referrerPolicy="no-referrer"
          />
          <h1 className="font-bold text-white tracking-tight">Brajesh Sethi</h1>
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-300 hover:text-white">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-40
        w-full lg:w-80 h-screen
        bg-slate-900 border-r border-slate-800
        transition-transform duration-300 lg:translate-x-0
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col p-8">
          <div className="hidden lg:flex flex-col items-center text-center mb-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative mb-4"
            >
              <div className="absolute inset-0 bg-sky-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <img 
                src="https://picsum.photos/seed/brajesh/200/200" 
                alt="Brajesh Kumar Sethi" 
                className="w-32 h-32 rounded-full border-4 border-slate-800 relative z-10"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <h3 className="text-xl font-bold text-white">Brajesh Kumar Sethi</h3>
            <p className="text-sky-400 text-sm font-medium">Machine Learning Engineer</p>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMenuOpen(false)}
                className={`
                  flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
                  ${activeSection === item.id 
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}
                `}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-slate-800">
            <div className="flex justify-center gap-4">
              {[
                { icon: Facebook, href: "https://www.facebook.com/brajeshkumar.sethi.52" },
                { icon: Twitter, href: "https://twitter.com/BrajeshSethi" },
                { icon: Instagram, href: "https://www.instagram.com/brajesh.py/" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/brajesh-kumar-sethi-9b090b151/" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:bg-sky-500 hover:text-white transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full lg:max-w-none">
        
        {/* Home Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-slate-400 text-xl md:text-2xl mb-2">Hi there...</h3>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
              My Name Is <span className="text-sky-500">Brajesh Kumar Sethi</span>
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold text-slate-200 mb-8">
              I am a <TypingText texts={['Machine Learning Engineer', 'Python Developer', 'Mechanical Engineer', 'AI Researcher']} />
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#contact" className="btn">Hire Me</a>
              <a href="#projects" className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-all">View Projects</a>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <Section id="about" title="About Me">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <User className="text-sky-500" size={20} /> Profile
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Machine Learning Engineer with 3.6+ years of experience building ML solutions, LLM-powered applications, and end-to-end RAG pipelines. Skilled in vector search, semantic retrieval, embeddings, enterprise document intelligence, and scalable ML deployment on Azure.
              </p>
              <div className="flex flex-wrap gap-2">
                <SkillBadge name="Python" />
                <SkillBadge name="NLP" />
                <SkillBadge name="LLMs" />
                <SkillBadge name="Azure AI" />
                <SkillBadge name="PyTorch" />
                <SkillBadge name="LangChain" />
                <SkillBadge name="Vector DBs" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="glass-card">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Briefcase className="text-sky-500" size={20} /> Experience
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sky-400 font-semibold">Machine Learning Engineer</h4>
                    <p className="text-slate-500 text-sm">Version 1 | Bangalore, India | 2023 - Present</p>
                    <ul className="mt-2 text-slate-400 text-sm space-y-1 list-disc list-inside">
                      <li>Designed code intelligence pipeline using LLMs & Neo4j</li>
                      <li>Built enterprise RAG system using Azure AI Search</li>
                      <li>Developed streaming pipeline for real-time topic detection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: BrainCircuit, title: "AI/ML", desc: "Transformers, LLM Finetuning, RAG, Vector Search" },
              { icon: Code2, title: "Development", desc: "Python, SQL, PyTorch, TensorFlow, Scikit-learn" },
              { icon: Cloud, title: "Cloud & MLOps", desc: "Azure, Databricks, MLflow, CI/CD, Azure DevOps" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card text-center"
              >
                <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-sky-500" size={24} />
                </div>
                <h4 className="text-white font-bold mb-2">{item.title}</h4>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Projects Section */}
        <Section id="projects" title="Featured Projects">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                title: "RAG-based Document Intelligence", 
                desc: "Enterprise RAG system using Azure AI Search, OpenAI embeddings, and semantic chunking for intelligent document retrieval.",
                tags: ["Azure", "OpenAI", "LangChain"],
                icon: Database
              },
              { 
                title: "LLM Code Documentation", 
                desc: "Automated code intelligence pipeline using Neo4j and Azure Durable Functions to reduce developer onboarding time.",
                tags: ["LLM", "Neo4j", "Azure"],
                icon: Terminal
              },
              { 
                title: "Topic Detection Pipeline", 
                desc: "Real-time business theme detection using K-Means clustering and anomaly detection on streaming data.",
                tags: ["ML", "Streaming", "Python"],
                icon: BrainCircuit
              },
              { 
                title: "Schema Matching Engine", 
                desc: "Cosine similarity and clustering-based data mapping for automated dataset alignment across enterprise systems.",
                tags: ["NLP", "Clustering", "Data"],
                icon: Code2
              }
            ].map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-card group"
              >
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sky-500 transition-colors">
                  <project.icon className="text-sky-500 group-hover:text-white transition-colors" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-sky-500 bg-sky-500/10 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Education Section */}
        <Section id="education" title="Education">
          <div className="space-y-8">
            {[
              {
                year: "2024 - Present",
                degree: "Master’s degree in Artificial Intelligence",
                school: "Birla Institute of Technology and Science, Pilani",
                desc: "Focusing on Deep Learning, NLP, and Reinforcement Learning."
              },
              {
                year: "2016 - 2020",
                degree: "Bachelor of Technology in Mechanical Engineering",
                school: "Modern Engineering and Management Studies, Odisha",
                desc: "Applied system modeling and automation design."
              }
            ].map((edu, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-8 border-l-2 border-slate-800"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-sky-500 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]"></div>
                <span className="text-sky-500 text-sm font-bold">{edu.year}</span>
                <h3 className="text-xl font-bold text-white mt-1">{edu.degree}</h3>
                <p className="text-slate-400 font-medium">{edu.school}</p>
                <p className="text-slate-500 text-sm mt-2">{edu.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Contact Section */}
        <Section id="contact" title="Get In Touch">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all" />
                  <input type="email" placeholder="Email Address" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all" />
                </div>
                <input type="text" placeholder="Subject" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all" />
                <textarea placeholder="Your Message" rows={5} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all resize-none"></textarea>
                <button type="submit" className="btn w-full">Send Message</button>
              </form>
            </motion.div>

            <div className="space-y-8">
              <div className="glass-card">
                <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-sky-500/10 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="text-sky-500" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Location</h4>
                      <p className="text-slate-500 text-sm">South Ex-II, New Delhi, India 110016</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-sky-500/10 rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="text-sky-500" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Email</h4>
                      <p className="text-slate-500 text-sm">brajeshsethi6@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-sky-500/10 rounded-lg flex items-center justify-center shrink-0">
                      <Phone className="text-sky-500" size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">Phone</h4>
                      {!showCallForm ? (
                        <button 
                          onClick={() => setShowCallForm(true)}
                          className="text-sky-500 text-sm hover:underline flex items-center gap-1"
                        >
                          Request a call <ChevronRight size={14} />
                        </button>
                      ) : (
                        <form onSubmit={handleCallRequest} className="mt-2 space-y-2">
                          <input 
                            name="number"
                            type="tel" 
                            placeholder="Your Phone Number" 
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-sky-500"
                          />
                          <div className="flex gap-2">
                            <button type="submit" className="px-3 py-1.5 bg-sky-500 text-white text-xs font-bold rounded hover:bg-sky-400 transition-colors">Send Request</button>
                            <button type="button" onClick={() => setShowCallForm(false)} className="px-3 py-1.5 bg-slate-700 text-slate-300 text-xs font-bold rounded hover:bg-slate-600 transition-colors">Cancel</button>
                          </div>
                          {callRequest.status && <p className="text-xs text-sky-400 mt-1">{callRequest.status}</p>}
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <footer className="py-12 border-t border-slate-900 text-center">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Brajesh Kumar Sethi. All rights reserved.
          </p>
        </footer>

      </main>
    </div>
  );
}
