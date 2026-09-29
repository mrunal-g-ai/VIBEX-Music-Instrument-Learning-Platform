/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, MessageCircle, Lightbulb, Focus, HandHeart, PartyPopper, CheckCircle2, ShieldAlert } from 'lucide-react';

export type MentorExpression = 'happy' | 'talking' | 'focused' | 'encouraging' | 'cheerful' | 'calm' | 'celebrating';

interface VibeAvatarProps {
  expression: MentorExpression;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const VibeAvatar: React.FC<VibeAvatarProps> = ({ expression, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const getExpressionDetails = () => {
    switch (expression) {
      case 'happy':
        return { emoji: '😊', icon: <Sparkles className="w-1/2 h-1/2" />, color: 'from-[#8067FF] to-[#6952E6]', shadow: 'shadow-[#8067FF]/40' };
      case 'talking':
        return { emoji: '💬', icon: <MessageCircle className="w-1/2 h-1/2" />, color: 'from-[#54D6C3] to-[#34A895]', shadow: 'shadow-[#54D6C3]/40' };
      case 'focused':
        return { emoji: '🧐', icon: <Focus className="w-1/2 h-1/2" />, color: 'from-[#F4BB55] to-[#D99A3A]', shadow: 'shadow-[#F4BB55]/40' };
      case 'encouraging':
        return { emoji: '✨', icon: <HandHeart className="w-1/2 h-1/2" />, color: 'from-[#FF8066] to-[#E65C40]', shadow: 'shadow-[#FF8066]/40' };
      case 'cheerful':
        return { emoji: '🌟', icon: <CheckCircle2 className="w-1/2 h-1/2" />, color: 'from-[#45D483] to-[#2DA861]', shadow: 'shadow-[#45D483]/40' };
      case 'calm':
        return { emoji: '🧘‍♀️', icon: <ShieldAlert className="w-1/2 h-1/2" />, color: 'from-[#A9A8BA] to-[#7B7A8C]', shadow: 'shadow-[#A9A8BA]/40' };
      case 'celebrating':
        return { emoji: '🎉', icon: <PartyPopper className="w-1/2 h-1/2" />, color: 'from-[#FF5C93] to-[#D93870]', shadow: 'shadow-[#FF5C93]/40' };
      default:
        return { emoji: '😊', icon: <Sparkles className="w-1/2 h-1/2" />, color: 'from-[#8067FF] to-[#6952E6]', shadow: 'shadow-[#8067FF]/40' };
    }
  };

  const details = getExpressionDetails();

  return (
    <div className="relative flex items-center justify-center shrink-0">
      {/* 
        This is a placeholder for the actual image. 
        When image generation works or assets are provided, replace this div with:
        <img src={`/assets/mentor/vibe_${expression}.png`} className={`${sizeClasses[size]} rounded-2xl object-cover shadow-lg ${details.shadow}`} alt={`Vibe ${expression}`} />
      */}
      <div 
        className={`${sizeClasses[size]} rounded-2xl bg-gradient-to-br ${details.color} flex flex-col items-center justify-center text-white shadow-lg ${details.shadow} transition-all duration-300 ease-in-out`}
      >
        <div className="text-xl filter drop-shadow-md">{details.emoji}</div>
      </div>
      
      {/* Decorative expression icon badge */}
      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#151725] border border-[#303348] flex items-center justify-center text-white z-10 shadow-md">
        {React.cloneElement(details.icon as React.ReactElement<any>, { className: 'w-3 h-3' })}
      </div>
    </div>
  );
};
