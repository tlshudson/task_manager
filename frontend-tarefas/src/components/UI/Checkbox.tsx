import { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label className={`flex items-center space-x-3 cursor-pointer group ${className}`}>
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          className="peer sr-only"
          {...props}
        />
        <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded 
                      peer-checked:bg-blue-600 peer-checked:border-blue-600
                      transition-all duration-200 group-hover:border-blue-500"></div>
        <svg 
          className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth="3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      {label && (
        <span className="text-sm text-gray-700 dark:text-gray-300 select-none peer-checked:line-through peer-checked:text-gray-400 transition-all duration-200">
          {label}
        </span>
      )}
    </label>
  );
}
