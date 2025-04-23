
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CodeEditor from '@/components/CodeEditor';
import SimpleNav from '@/components/SimpleNav';
import { useToast } from '@/hooks/use-toast';

const DEFAULT_CHALLENGE = {
  title: "Find Maximum Number",
  prompt: `Write a function that finds the largest number in an array of integers.

Function Signature:
def find_max(numbers: list[int]) -> int:
    # Your code here

Example:
Input: [1, 3, 5, 2, 9, 7]
Output: 9

Constraints:
- The array will contain at least one element
- All elements will be integers`
};

const Challenge = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [code, setCode] = useState('# Your solution here\n\ndef find_max(numbers):\n    # Write your solution\n    pass');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = () => {
    if (code.trim() === '# Your solution here' || !code.includes('def find_max')) {
      toast({
        title: "Incomplete solution",
        description: "Please write your solution before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate evaluation delay
    setTimeout(() => {
      // Store submission in session storage
      sessionStorage.setItem('lastSubmission', JSON.stringify({
        code,
        timestamp: new Date().toISOString(),
        // Simple mock evaluation
        result: {
          passed: code.includes('return max(numbers)') || code.includes('return sorted(numbers)[-1]'),
          feedback: "Your solution has been evaluated."
        }
      }));
      
      navigate('/results');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <SimpleNav />
      
      <main className="flex-1 py-8 px-4 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-6">{DEFAULT_CHALLENGE.title}</h1>
        
        <div className="bg-card border rounded-lg p-4 mb-6">
          <pre className="whitespace-pre-wrap text-sm">{DEFAULT_CHALLENGE.prompt}</pre>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Your Solution:</h2>
          <CodeEditor
            language="python"
            defaultValue={code}
            onChange={setCode}
            height="300px"
          />
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Evaluating...' : 'Submit Solution'}
          </button>
        </div>
      </main>
      
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        Simple Code Assessment System
      </footer>
    </div>
  );
};

export default Challenge;
