
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/challenges', label: 'Challenges' },
    { href: '/code-submission', label: 'Submit Code' },
    { href: '/feedback', label: 'Feedback' },
  ];

  return (
    <motion.nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 transition-all duration-300',
        scrolled ? 'glassmorphism card-shadow py-3' : 'bg-transparent'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            CA
          </motion.div>
          <span className="text-lg font-semibold">CodeAssess</span>
        </Link>

        <div className="hidden md:flex space-x-8">
          {links.map((link) => (
            <Link 
              key={link.href} 
              to={link.href} 
              className="relative group"
            >
              <span className={cn(
                "text-sm font-medium transition-colors",
                location.pathname === link.href 
                  ? "text-primary" 
                  : "text-foreground/70 hover:text-foreground"
              )}>
                {link.label}
              </span>
              
              {location.pathname === link.href && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  layoutId="navbar-indicator"
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                />
              )}
            </Link>
          ))}
        </div>

        <motion.button
          className="md:hidden text-foreground"
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
