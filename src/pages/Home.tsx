
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SimpleNav from '@/components/SimpleNav';

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <SimpleNav />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <h1 className="text-3xl font-bold mb-4">Code Challenge</h1>
          <p className="mb-8 text-muted-foreground">
            Solve a coding problem and get instant feedback on your solution.
          </p>
          <button
            onClick={() => navigate('/challenge')}
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Start Challenge
          </button>
        </motion.div>
      </main>
      
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        Simple Code Assessment System
      </footer>
    </div>
  );
};

export default Home;
