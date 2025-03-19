
import React from 'react';
import { cn } from '@/lib/utils';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

interface FeedbackMetric {
  name: string;
  score: number;
  color: string;
}

interface FeedbackCardProps {
  correctness: number;
  efficiency: number;
  quality: number;
  feedback: string;
  className?: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  correctness,
  efficiency,
  quality,
  feedback,
  className,
}) => {
  // Motion values for interactive gradient
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const background = useMotionTemplate`
    radial-gradient(
      650px circle at ${mouseX.get() * 100}% ${mouseY.get() * 100}%,
      rgba(var(--primary-rgb), 0.08),
      transparent 80%
    )
  `;
  
  const metrics: FeedbackMetric[] = [
    { name: 'Correctness', score: correctness, color: getColorForScore(correctness) },
    { name: 'Efficiency', score: efficiency, color: getColorForScore(efficiency) },
    { name: 'Code Quality', score: quality, color: getColorForScore(quality) },
  ];
  
  const totalScore = ((correctness + efficiency + quality) / 3).toFixed(1);
  
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-card p-6",
        "subtle-shadow transition-all duration-300",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      style={{ background }}
    >
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium">AI Code Assessment</h3>
            <p className="text-sm text-muted-foreground mt-1">Detailed feedback on your submission</p>
          </div>
          
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-xl font-semibold text-primary">{totalScore}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {metrics.map((metric) => (
            <div 
              key={metric.name}
              className="flex flex-col gap-2 bg-background/50 rounded-lg p-3 border border-border transition-all duration-300 hover:border-primary/20"
            >
              <span className="text-xs font-medium text-muted-foreground">{metric.name}</span>
              
              <div className="flex items-end justify-between">
                <span className="text-lg font-semibold">{metric.score.toFixed(1)}</span>
                <span className={cn("text-xs font-medium", metric.color)}>
                  {getScoreLabel(metric.score)}
                </span>
              </div>
              
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-1">
                <motion.div
                  className={cn("h-full rounded-full", getGradientForScore(metric.score))}
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.score * 10}%` }}
                  transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Feedback</h4>
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <div className="text-sm whitespace-pre-line">
              {feedback.split('\n').map((line, index) => (
                <p key={index} className="mb-2 last:mb-0">{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function getColorForScore(score: number): string {
  if (score >= 9) return 'text-green-500';
  if (score >= 7) return 'text-blue-500';
  if (score >= 5) return 'text-yellow-500';
  return 'text-red-500';
}

function getScoreLabel(score: number): string {
  if (score >= 9) return 'Excellent';
  if (score >= 7) return 'Good';
  if (score >= 5) return 'Average';
  if (score >= 3) return 'Needs Work';
  return 'Poor';
}

function getGradientForScore(score: number): string {
  if (score >= 9) return 'bg-gradient-to-r from-green-500 to-emerald-500';
  if (score >= 7) return 'bg-gradient-to-r from-blue-500 to-cyan-500';
  if (score >= 5) return 'bg-gradient-to-r from-yellow-500 to-amber-500';
  if (score >= 3) return 'bg-gradient-to-r from-orange-500 to-red-400';
  return 'bg-gradient-to-r from-red-500 to-red-600';
}

export default FeedbackCard;
