
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface ChallengeCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  className?: string;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  id,
  title,
  description,
  difficulty,
  tags,
  className,
}) => {
  const navigate = useNavigate();
  
  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    Hard: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-card p-6",
        "transition-all duration-300 cursor-pointer subtle-shadow",
        className
      )}
      onClick={() => navigate(`/code-submission?challenge=${id}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
      
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-medium">{title}</h3>
          <span className={cn(
            "px-2.5 py-0.5 rounded-full text-xs font-medium",
            difficultyColors[difficulty]
          )}>
            {difficulty}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ChallengeCard;
