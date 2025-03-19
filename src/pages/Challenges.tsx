
import { useState, useEffect } from 'react';
import AnimatedTransition from '@/components/AnimatedTransition';
import Navbar from '@/components/Navbar';
import ChallengeCard from '@/components/ChallengeCard';
import { sampleChallenges } from '@/utils/aiEvaluation';
import { motion } from 'framer-motion';

const Challenges = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Get unique tags from all challenges
  const allTags = Array.from(
    new Set(sampleChallenges.flatMap(challenge => challenge.tags))
  );
  
  // Filter challenges based on selected difficulty, tag, and search term
  const filteredChallenges = sampleChallenges.filter(challenge => {
    const difficultyMatch = selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty;
    const tagMatch = selectedTag === 'all' || challenge.tags.includes(selectedTag);
    const searchMatch = searchTerm === '' || 
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return difficultyMatch && tagMatch && searchMatch;
  });
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
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
              className="text-center mb-16"
            >
              <h1 className="text-4xl font-bold tracking-tight">Coding Challenges</h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Browse our collection of coding challenges and test your skills with AI assessment.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-card rounded-xl border border-border p-6 mb-10 subtle-shadow"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-grow">
                  <label htmlFor="search" className="block text-sm font-medium text-muted-foreground mb-2">
                    Search Challenges
                  </label>
                  <div className="relative">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                    <input 
                      type="text"
                      id="search"
                      placeholder="Search by title or description"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full h-10 rounded-md border border-input bg-transparent placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col md:w-48">
                  <label htmlFor="difficulty" className="block text-sm font-medium text-muted-foreground mb-2">
                    Difficulty
                  </label>
                  <select
                    id="difficulty"
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="h-10 rounded-md border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="all">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                
                <div className="flex flex-col md:w-56">
                  <label htmlFor="tag" className="block text-sm font-medium text-muted-foreground mb-2">
                    Topic
                  </label>
                  <select
                    id="tag"
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="h-10 rounded-md border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="all">All Topics</option>
                    {allTags.map((tag) => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
            
            {filteredChallenges.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center py-16"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="mx-auto h-12 w-12 text-muted-foreground mb-4"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
                <h3 className="text-xl font-medium mb-2">No challenges found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search term</p>
              </motion.div>
            ) : (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {filteredChallenges.map((challenge) => (
                  <ChallengeCard 
                    key={challenge.id}
                    id={challenge.id}
                    title={challenge.title}
                    description={challenge.description}
                    difficulty={challenge.difficulty}
                    tags={challenge.tags}
                  />
                ))}
              </motion.div>
            )}
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

export default Challenges;
