
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import AnimatedTransition from '@/components/AnimatedTransition';
import Navbar from '@/components/Navbar';
import CodeEditor from '@/components/CodeEditor';
import { getSampleChallenge, evaluateCode } from '@/utils/aiEvaluation';
import { motion } from 'framer-motion';

const CodeSubmission = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryParams = new URLSearchParams(location.search);
  const challengeId = queryParams.get('challenge');
  
  const [code, setCode] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [challenge, setChallenge] = useState<any>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (challengeId) {
      const selectedChallenge = getSampleChallenge(challengeId);
      if (selectedChallenge) {
        setChallenge(selectedChallenge);
        setCode('# Your solution here\n\n');
      } else {
        toast({
          title: "Challenge not found",
          description: "The requested challenge could not be found.",
          variant: "destructive",
        });
        navigate('/challenges');
      }
    }
  }, [challengeId, navigate, toast]);
  
  const handleSubmit = async () => {
    // Basic validation
    if (!code.trim() || code.trim() === '# Your solution here') {
      toast({
        title: "Empty submission",
        description: "Please write some code before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // We'd normally send this to a backend API, but for demo purposes, we'll use the mock evaluation
      const result = await evaluateCode(code, challengeId || undefined);
      
      // Store results in session storage for the feedback page
      sessionStorage.setItem('lastEvaluation', JSON.stringify({
        code,
        challenge,
        result,
        timestamp: new Date().toISOString(),
      }));
      
      // Show success toast
      toast({
        title: "Submission successful",
        description: "Your code has been evaluated successfully.",
      });
      
      // Navigate to the feedback page
      navigate('/feedback');
    } catch (error) {
      console.error("Error evaluating code:", error);
      toast({
        title: "Submission failed",
        description: "There was an error evaluating your code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
              <h1 className="text-3xl font-bold tracking-tight">
                {challenge ? challenge.title : 'Code Submission'}
              </h1>
              <p className="mt-4 text-muted-foreground">
                {challenge 
                  ? 'Solve the challenge below and submit your code for AI evaluation.'
                  : 'Submit your code for AI evaluation and feedback.'}
              </p>
            </motion.div>
            
            {challenge && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-card rounded-xl border border-border p-6 mb-8 subtle-shadow"
              >
                <h2 className="text-xl font-medium mb-4">Challenge Details</h2>
                <div className="space-y-4">
                  <div>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                      ${challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                       challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                       'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                      {challenge.difficulty}
                    </span>
                    
                    {challenge.tags.map((tag: string) => (
                      <span 
                        key={tag}
                        className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4 code-block whitespace-pre-line">
                    {challenge.prompt}
                  </div>
                </div>
              </motion.div>
            )}
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Your Solution</h2>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Language: Python</span>
                </div>
              </div>
              
              <CodeEditor 
                language="python"
                defaultValue={code}
                onChange={setCode}
                height="500px"
                className="mb-6"
              />
              
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 disabled:opacity-70 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Evaluating...
                    </span>
                  ) : 'Submit for Evaluation'}
                </motion.button>
              </div>
            </motion.div>
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

export default CodeSubmission;
