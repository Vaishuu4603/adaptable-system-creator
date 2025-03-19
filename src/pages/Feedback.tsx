
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedTransition from '@/components/AnimatedTransition';
import Navbar from '@/components/Navbar';
import FeedbackCard from '@/components/FeedbackCard';
import CodeEditor from '@/components/CodeEditor';
import { motion } from 'framer-motion';

interface Evaluation {
  code: string;
  challenge: any;
  result: {
    correctness: number;
    efficiency: number;
    quality: number;
    feedback: string;
    passed: boolean;
  };
  timestamp: string;
}

const Feedback = () => {
  const navigate = useNavigate();
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Get the evaluation data from session storage
    const storedEvaluation = sessionStorage.getItem('lastEvaluation');
    
    if (storedEvaluation) {
      try {
        setEvaluation(JSON.parse(storedEvaluation));
      } catch (error) {
        console.error("Error parsing evaluation data:", error);
        navigate('/code-submission');
      }
    } else {
      // No evaluation data found
      navigate('/code-submission');
    }
  }, [navigate]);
  
  const handleNewSubmission = () => {
    navigate('/code-submission');
  };
  
  const handleTryAgain = () => {
    navigate(evaluation?.challenge 
      ? `/code-submission?challenge=${evaluation.challenge.id}` 
      : '/code-submission');
  };
  
  if (!evaluation) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-primary/20 mb-4"></div>
          <div className="h-6 w-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }
  
  return (
    <AnimatedTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <section className="pt-32 pb-20 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center mb-2">
                <h1 className="text-3xl font-bold tracking-tight mr-3">
                  Assessment Results
                </h1>
                
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                  ${evaluation.result.passed 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}
                >
                  {evaluation.result.passed ? 'Passed' : 'Needs Improvement'}
                </span>
              </div>
              
              {evaluation.challenge && (
                <div className="text-lg font-medium text-muted-foreground mb-1">
                  Challenge: {evaluation.challenge.title}
                </div>
              )}
              
              <div className="text-sm text-muted-foreground">
                Submitted {new Date(evaluation.timestamp).toLocaleString()}
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-2 space-y-8"
              >
                <div>
                  <h2 className="text-xl font-medium mb-4">Your Code</h2>
                  <CodeEditor 
                    language="python"
                    defaultValue={evaluation.code}
                    readonly={true}
                    height="400px"
                  />
                </div>
                
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleTryAgain}
                    className="flex-1 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
                  >
                    Try Again
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNewSubmission}
                    className="flex-1 px-6 py-3 rounded-lg bg-background border border-border text-foreground font-medium hover:bg-muted/50 transition-all duration-300"
                  >
                    New Submission
                  </motion.button>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <FeedbackCard 
                  correctness={evaluation.result.correctness}
                  efficiency={evaluation.result.efficiency}
                  quality={evaluation.result.quality}
                  feedback={evaluation.result.feedback}
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="mt-auto py-8 px-6 border-t">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                CA
              </div>
              <span className="text-sm font-semibold">CodeAssess</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              &copy; 2023 CodeAssess. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </AnimatedTransition>
  );
};

export default Feedback;
