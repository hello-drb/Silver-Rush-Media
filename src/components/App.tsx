/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Camera, 
  Video, 
  Palette, 
  ArrowRight, 
  Instagram, 
  Mail, 
  MapPin, 
  ChevronRight,
  Menu,
  X,
  Linkedin,
  MessageSquare,
  Search,
  Globe,
  Users,
  Sparkles,
  BarChart3
} from "lucide-react";
import { useState, useEffect } from "react";

const IconMap: Record<string, any> = { Search, Camera, Globe, Users, Sparkles, BarChart3 };

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-sr-rust pointer-events-none z-[9999] hidden md:block"
      animate={{ 
        x: position.x - 16, 
        y: position.y - 16,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? 'rgba(189, 34, 16, 0.15)' : 'transparent'
      }}
      transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.5 }}
    />
  );
};

interface AppProps {
  services: any[];
  projects: any[];
}

export default function App({ services, projects }: AppProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      if (response.ok) {
        setFormSubmitted(true);
        form.reset();
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  // Separate the AI card (fullWidth) from the grid cards
  const gridServices = services.filter((s: any) => !s.fullWidth);
  const fullWidthServices = services.filter((s: any) => s.fullWidth);

  return (
    <div className="min-h-screen nyc-grid selection:bg-sr-rust selection:text-white">
      <div className="grain-overlay" />
      <CustomCursor />
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 px-6 py-6 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md border-b border-ink/5 py-4" : "bg-transparent py-8"
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.a 
            href="#hero"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
            id="nav-logo"
          >
            <img 
              src="https://res.cloudinary.com/diduw1fmf/image/upload/v1772089691/sr_clear_fin0va.png" 
              alt="Silver Rush Media" 
              className={`transition-all duration-300 ${scrolled ? "h-10" : "h-14"}`}
              referrerPolicy="no-referrer"
            />
            <span className={`font-display font-black tracking-tighter transition-all duration-300 text-ink ${scrolled ? "text-lg" : "text-xl"}`}>SILVER RUSH MEDIA</span>
          </motion.a>
          
          <div className="hidden md:flex gap-10 text-xs font-bold tracking-[0.2em] uppercase transition-colors text-ink">
            {[
              { name: "What We Do", id: "services" },
              { name: "Our Work", id: "work" },
              { name: "About", id: "about" }
            ].map((item) => (
              <motion.a 
                key={item.id}
                href={`#${item.id}`}
                whileHover={{ y: -2 }}
                className="hover:text-sr-rust transition-colors"
                id={`nav-item-${item.id}`}
              >
                {item.name}
              </motion.a>
            ))}
            <motion.a 
              href="#contact"
              whileHover={{ y: -2 }}
              className="text-sr-rust font-black"
              id="nav-item-cta"
            >
              Let's Talk
            </motion.a>
          </div>

          <button 
            className="md:hidden transition-colors text-ink"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            id="mobile-menu-toggle"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 bg-ink z-40 flex flex-col items-center justify-center gap-8 text-white text-3xl font-display uppercase tracking-widest"
          id="mobile-menu"
        >
          {[
            { name: "What We Do", id: "services" },
            { name: "Our Work", id: "work" },
            { name: "About", id: "about" },
            { name: "Let's Talk", id: "contact" }
          ].map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-sr-rust"
            >
              {item.name}
            </a>
          ))}
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center px-6 md:px-20 overflow-hidden" id="hero">
        <div className="max-w-6xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex flex-wrap gap-4 mb-8">
              <span className="ransom-text text-4xl md:text-8xl">Step</span>
              <span className="ransom-text text-4xl md:text-8xl">Into</span>
              <span className="ransom-text text-4xl md:text-8xl">The</span>
              <span className="ransom-text text-4xl md:text-8xl">Brand</span>
              <span className="ransom-text text-4xl md:text-8xl">You've</span>
              <span className="ransom-text text-4xl md:text-8xl">Been</span>
              <span className="ransom-text text-4xl md:text-8xl">Becoming.</span>
            </div>
            
            <p className="text-lg md:text-2xl max-w-3xl text-ink/80 font-serif italic leading-relaxed mb-12" id="hero-subtitle">
              We bring together strategy, design, photography, and digital presence into one cohesive brand — so the world sees you as clearly as your clients already do.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-sr-rust text-white px-12 py-6 rounded-none flex items-center gap-4 text-sm font-bold uppercase tracking-[0.2em] hover:bg-ink transition-all shadow-xl"
                id="hero-cta"
              >
                Let's Talk <ArrowRight size={20} />
              </motion.a>
              <a href="#setup" className="text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:text-sr-rust transition-colors">
                See what we do <ChevronRight size={16} className="rotate-90" />
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Background Accent */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full bg-sr-teal/5 blur-[150px] rounded-full -z-10" />
      </section>

      {/* Section 2: The Setup */}
      <section className="py-32 px-6 md:px-20 bg-white/30" id="setup">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-12 uppercase tracking-tighter" id="setup-title">
              You've done the hard part. <br />
              <span className="text-sr-rust italic">You built something real.</span>
            </h2>
            <div className="space-y-8 text-xl md:text-2xl text-ink/80 font-serif italic leading-relaxed" id="setup-body">
              <p>You've put in the work — the expertise, the clients, the reputation. People trust you. They refer you. You're in the arena and you're doing the thing.</p>
              <p>Now it's time for the world to see it clearly.</p>
              <p>Whether you're launching something new, leveling up something established, or stepping into a chapter that needs a whole new look — there's a moment when your brand needs to catch up to who you've become. That's the moment we love walking into.</p>
            </div>
            <div className="mt-16 p-8 bg-sr-teal/5 border-l-4 border-sr-teal">
              <p className="text-lg font-bold text-sr-slate uppercase tracking-tight" id="setup-highlight">
                Brand development, visual identity, the details that make someone's work feel as sharp on screen as it does in person — that's our favorite conversation to have.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: What We Do */}
      <section className="py-32 px-6 md:px-20" id="services">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 border-b border-ink/10 pb-12">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter" id="services-title">
                Here's how we help.
              </h2>
              <p className="text-xl text-ink/70 font-serif italic" id="services-desc">
                Some clients come to us for photography and discover they need positioning first. Others start with a website and end up rethinking their entire visual identity. Every engagement looks different — but the work is always specific and always built around what you actually need. What ties it all together is making sure your brand feels like you everywhere it shows up — your website, your social presence, your photography, your pitch deck, all of it.
              </p>
            </div>
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-sr-slate" id="services-label">
              01 / Capabilities
            </div>
          </div>

          {/* 2x2 Grid for first 4 services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {gridServices.map((service: any, idx: number) => {
              const IconComponent = IconMap[service.iconName] || Search;
              return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative p-12 bg-white border border-ink/5 hover:border-sr-rust/30 transition-all group"
                id={service.id}
              >
                <div className={`w-16 h-16 ${service.color} text-white flex items-center justify-center mb-10 group-hover:scale-110 transition-transform`}>
                  <IconComponent size={32} />
                </div>
                <h3 className="text-3xl font-black mb-2 uppercase tracking-tighter">{service.title}</h3>
                <p className="text-sr-rust font-bold mb-6 italic">{service.subtitle}</p>
                <p className="text-ink/60 leading-relaxed mb-8 font-serif">{service.description}</p>
                <div className="pt-6 border-t border-ink/5">
                  <p className="text-xs font-bold text-sr-slate/60 italic leading-relaxed">
                    {service.details}
                  </p>
                </div>
              </motion.div>
            )})}
          </div>

          {/* Full-width AI card */}
          {fullWidthServices.map((service: any) => {
            const IconComponent = IconMap[service.iconName] || Sparkles;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative mt-12 p-12 md:p-16 bg-ink text-white border border-ink hover:border-sr-teal/50 transition-all group"
                id={service.id}
              >
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-start gap-8 md:gap-16 flex-col md:flex-row">
                    <div className="w-20 h-20 bg-sr-teal text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <IconComponent size={40} />
                    </div>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-black mb-2 uppercase tracking-tighter">{service.title}</h3>
                      <p className="text-sr-teal font-bold mb-6 italic text-lg">{service.subtitle}</p>
                      <p className="text-white/70 leading-relaxed mb-8 font-serif text-lg">{service.description}</p>
                      <div className="pt-6 border-t border-white/10">
                        <p className="text-sm font-bold text-white/40 italic leading-relaxed">
                          {service.details}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Section 4: The Difference */}
      <section className="py-32 px-6 md:px-20 bg-ink text-white" id="difference">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-16 uppercase tracking-tighter" id="difference-title">
              Where <span className="text-sr-rust italic">strategy</span> meets <span className="text-sr-teal italic">taste</span>.
            </h2>
            <div className="space-y-10 text-xl md:text-2xl text-white/80 leading-relaxed font-light" id="difference-body">
              <p className="font-serif italic text-2xl md:text-3xl text-white">What makes this different isn't any single deliverable — it's the synthesis.</p>
              <p>It starts with what you know, what you've built, and where you're headed — blended with what the market demands, what the digital landscape rewards, and what genuinely great creative looks like right now. The result is a brand that feels like you AND actually works — because those two things were never at odds.</p>
              <p>That means a website that converts and feels like a real reflection of your work. Photography that's elevated but still looks like you. Messaging that sounds human and still lands with your ideal client. Strategy that's smart without being sterile.</p>
              <p>The work moves fast, uses modern tools — including AI where it genuinely helps — and brings a depth of creative and operational experience that most boutique agencies simply don't have. But the real difference is taste. The details matter here, and the range of influences we bring to the table means we won't let you put something out that doesn't meet the standard.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Pam Hervey — Full Story + Testimonial */}
      <section className="py-32 px-6 md:px-20 bg-paper" id="pam-hervey">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 md:p-16 bg-white border border-ink/5 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
              <div className="w-full md:w-2/5 shrink-0">
                <div className="aspect-[4/5] overflow-hidden border-[12px] border-ink/5 shadow-lg">
                  <img 
                    src="https://res.cloudinary.com/diduw1fmf/image/upload/v1772570220/pamela_hervey_wellness_umol8a.png" 
                    alt="Pamela Hervey Wellness"
                    className="object-cover w-full h-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="w-full md:w-3/5">
                <div className="text-xs font-bold uppercase tracking-[0.3em] text-sr-rust mb-4">Client Story</div>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6">Pamela Hervey Wellness</h3>
                <p className="text-ink/60 leading-relaxed font-serif text-lg mb-10">
                  A wellness coach building her practice from the ground up — and she needed more than a photographer. We scaled up a creative team, bringing in a brand strategist and designer, and worked together to develop her visual identity, build the website, produce social content, an ebook, and a webinar, and launch her into the market with a cohesive brand across every touchpoint.
                </p>
                <div className="pt-8 border-t border-ink/10">
                  <MessageSquare size={32} className="text-sr-rust/30 mb-4" />
                  <blockquote className="text-xl md:text-2xl font-serif italic leading-snug text-ink mb-6">
                    "Drew didn't just build a website for me — he helped shape the visual identity and voice of my brand from the ground up. What I appreciated most was his unique balance of support and creative challenge. He consistently encouraged me to stretch beyond my comfort zone and share my voice and expertise more boldly than I might have on my own. Through that process, he helped me discover new ways of communicating my message and connecting with the women I serve."
                  </blockquote>
                  <p className="text-lg font-black uppercase tracking-tighter text-sr-rust">— Pam Hervey</p>
                  <p className="text-sr-slate font-bold uppercase tracking-widest text-xs mt-1">Founder & Health Coach, Pamela Hervey Wellness</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 6: Work We've Done */}
      <section className="py-32 px-6 md:px-20" id="work">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter" id="work-title">Some stories we've helped shape.</h2>
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-sr-slate" id="work-label">
              02 / Portfolio
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {projects.map((project: any, idx: number) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                id={project.id}
              >
                <div className="relative overflow-hidden aspect-video mb-8 border border-ink/5">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-ink/10 group-hover:bg-ink/30 transition-colors" />
                </div>
                <div className="px-2">
                  <h4 className="text-3xl font-black mb-4 uppercase tracking-tighter group-hover:text-sr-rust transition-colors">{project.title}</h4>
                  <p className="text-ink/60 leading-relaxed font-serif italic text-lg">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: How We Work */}
      <section className="py-32 px-6 md:px-20 bg-sr-slate text-white" id="how-we-work">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-12 uppercase tracking-tighter" id="how-work-title">
              Every project starts the same way.
            </h2>
            <p className="text-2xl font-serif italic leading-relaxed mb-16 text-white/80" id="how-work-body">
              With a conversation. Not a pitch. Not a questionnaire. A real conversation about what you're building, what's working, and what needs to change.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12" id="how-work-steps">
              {[
                { title: "We listen.", desc: "We figure out what's actually going on before we suggest anything." },
                { title: "We plan.", desc: "You see the strategy — positioning, visual direction, scope — before we build anything." },
                { title: "We build.", desc: "Design, photography, websites, content. We move fast, refine as we go, and keep you in the loop without making it a second job." },
                { title: "We set you up.", desc: "Everything we hand over is built to last beyond us. And we're here when you need us again." }
              ].map((step, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-sr-rust">{step.title}</h3>
                  <p className="text-white/60 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 8: About */}
      <section className="py-32 px-6 md:px-20 overflow-hidden relative" id="about">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-24">
          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[3/4] overflow-hidden border-[12px] border-ink/5 hover:border-sr-rust/20 transition-all duration-700">
                <img 
                  src="https://res.cloudinary.com/diduw1fmf/image/upload/v1772570367/IMG_7292_awutou.jpg" 
                  alt="Drew Bordeaux"
                  className="object-cover w-full h-full"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-5xl md:text-8xl font-black mb-12 uppercase tracking-tighter" id="about-title">Hi, I'm Drew.</h2>
            <div className="space-y-8 text-lg md:text-xl text-ink/80 leading-relaxed font-light" id="about-body">
              <p className="font-serif italic text-2xl text-ink">I'm Drew Bordeaux, and I run Silver Rush Media.</p>
              <p>I'm a creative director and brand strategist who helps people build brands that actually reflect the level they're operating at. I come from both sides — I spent nine years as COO of a digital publishing company where I oversaw two divisions, helped launch a data analytics practice that worked with over 100 companies, and traveled the country helping business leaders make smarter decisions with their data. That work shaped how I think about everything we do here.</p>
              <p>Since 2017 I've been running Silver Rush Media and building brands for businesses, founders, and creative professionals. I also direct visuals and creative for musicians through my practice at <a href="https://drewimages.studio" target="_blank" rel="noopener noreferrer" className="text-sr-rust hover:underline">DrewImages.Studio</a>, where I've worked with Grammy-winning artists, bestselling authors, and cultural institutions. I studied social psychology at Harvard. I'm a Recording Academy member. Both show up in how I think about brands more than you might expect.</p>
              <p>I work with a small, trusted team who care about the details as much as I do. When you work with us, you get a real person invested in your outcome, not an agency assembly line.</p>
            </div>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-16 inline-block bg-ink text-white px-12 py-6 rounded-none text-sm font-bold uppercase tracking-[0.2em] hover:bg-sr-rust transition-all shadow-xl"
              id="about-cta"
            >
              Work With Me →
            </motion.a>
          </div>
        </div>
      </section>

      {/* Section 9: Contact */}
      <section className="py-32 px-6 md:px-20 bg-white/30" id="contact">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-12">
            <span className="ransom-text text-5xl md:text-9xl">Let's</span>
            <span className="ransom-text text-5xl md:text-9xl">Talk</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tighter" id="contact-title">Let's start with a conversation.</h2>
          <p className="text-xl text-ink/70 mb-20 max-w-2xl mx-auto font-serif italic" id="contact-subtitle">
            Tell us where you are and what you're building. We'll be in touch within 48 hours.
          </p>
          
          {formSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-12 bg-white border border-ink/5 shadow-2xl max-w-3xl mx-auto"
            >
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Thank you!</h3>
              <p className="text-xl text-ink/70 font-serif italic">We're excited to learn more about your work. We'll be in touch within 48 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleFormSubmit} className="text-left space-y-8 max-w-3xl mx-auto p-12 bg-white border border-ink/5 shadow-2xl" id="contact-form">
              {/* Web3Forms config */}
              <input type="hidden" name="access_key" value="938afffd-b22c-4c83-85e0-55362d14787b" />
              <input type="hidden" name="subject" value="New SRM Inquiry" />
              <input type="hidden" name="from_name" value="Silver Rush Media Website" />
              {/* Honeypot */}
              <input type="checkbox" name="botcheck" className="hidden" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-[0.3em] text-sr-slate">Name</label>
                  <input type="text" name="name" required className="w-full bg-paper/50 border-b-2 border-ink/10 p-4 focus:border-sr-rust outline-none transition-all font-serif" placeholder="Your Name" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-[0.3em] text-sr-slate">Email</label>
                  <input type="email" name="email" required className="w-full bg-paper/50 border-b-2 border-ink/10 p-4 focus:border-sr-rust outline-none transition-all font-serif" placeholder="your@email.com" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-[0.3em] text-sr-slate">Business / Organization</label>
                <input type="text" name="business" className="w-full bg-paper/50 border-b-2 border-ink/10 p-4 focus:border-sr-rust outline-none transition-all font-serif" placeholder="Your Business" />
              </div>
              
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-[0.3em] text-sr-slate">What best describes you?</label>
                <select name="role" className="w-full bg-paper/50 border-b-2 border-ink/10 p-4 focus:border-sr-rust outline-none transition-all font-serif appearance-none">
                  <option value="" disabled selected>Select one</option>
                  <option value="Author or Writer">Author or Writer</option>
                  <option value="Coach or Consultant">Coach or Consultant</option>
                  <option value="Speaker">Speaker</option>
                  <option value="Founder or Business Owner">Founder or Business Owner</option>
                  <option value="Executive">Executive</option>
                  <option value="Creative Professional">Creative Professional</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-[0.3em] text-sr-slate">What can we help you with?</label>
                <textarea name="message" rows={4} required className="w-full bg-paper/50 border-b-2 border-ink/10 p-4 focus:border-sr-rust outline-none transition-all font-serif" placeholder="Tell us what you're working on and what you need..." />
              </div>

              <button type="submit" className="w-full bg-ink text-white py-6 font-black uppercase tracking-[0.4em] hover:bg-sr-rust transition-all shadow-lg">
                Start the Conversation
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 md:px-20 border-t border-ink/5 bg-paper">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="space-y-4">
            <img 
              src="https://res.cloudinary.com/diduw1fmf/image/upload/v1772100799/srm_new2_z643wy.png" 
              alt="Silver Rush Media Logo" 
              className="h-24 w-auto"
              referrerPolicy="no-referrer"
            />
            <p className="text-sr-slate font-bold uppercase tracking-[0.2em] text-xs">Clarity first. Then everything else.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-sr-slate">
            <a href="https://www.linkedin.com/in/andrewbordeaux/" target="_blank" rel="noopener noreferrer" className="hover:text-sr-rust transition-colors flex items-center gap-2">
              <Linkedin size={14} /> LinkedIn
            </a>
            <div>© 2026 SILVER RUSH MEDIA. ALL RIGHTS RESERVED.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
