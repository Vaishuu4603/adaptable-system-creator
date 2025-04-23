
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CodeEditor from '@/components/CodeEditor';
import SimpleNav from '@/components/SimpleNav';

const Results = () => {
  const navigate = useNavigate();
  const [submission, setSubmission] = useState<any>(null);
  
  useEffect(() => {
    const stored = sessionStorage.getItem('lastSubmission');
    if (stored) {
      setSubmission(JSON.parse(stored));
    } else {
      navigate('/challenge');
    }
  }, [navigate]);
  
  if (!submission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <SimpleNav />
      
      <main className="flex-1 py-8 px-4 max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Results</h1>
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${submission.result.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {submission.result.passed ? 'Passed' : 'Needs Improvement'}
          </span>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Your Solution:</h2>
          <CodeEditor
            language="python"
            defaultValue={submission.code}
            readonly={true}
            height="300px"
          />
        </div>
        
        <div className="bg-card border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Feedback</h2>
          <p className="text-muted-foreground">
            {submission.result.passed ? 
              "Great job! Your solution correctly finds the maximum number in the array. Your code is concise and effective." : 
              "Your solution needs improvement. Make sure your function returns the largest number in the input array. Consider using built-in functions like max() or sorting the array."}
          </p>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/challenge')}
            className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 rounded-lg border bg-background hover:bg-muted transition-colors"
          >
            Go Home
          </button>
        </div>
      </main>
      
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        Simple Code Assessment System
      </footer>
    </div>
  );
};

export default Results;
