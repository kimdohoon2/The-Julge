'use client';

import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'reverse';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  variant = 'primary',
}) => {
  const styles = {
    primary:
      'bg-orange text-gray-white border-none hover:shadow-lg hover:scale-105 transition-all duration-200',
    reverse:
      'bg-white text-orange border border-orange hover:shadow-lg hover:scale-105 transition-all duration-200',
    disabled: 'bg-gray-40 text-gray-white cursor-not-allowed hover:shadow-none hover:scale-100',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'rounded-[6px] text-sm font-bold focus:ring sm:text-base',
        disabled ? styles.disabled : styles[variant],
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
