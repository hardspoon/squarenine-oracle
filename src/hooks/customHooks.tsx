import { useState, useEffect } from 'react';

export const useInputValue = (initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    reset: () => setValue(initialValue),
  };
};

export const useFirstRender = () => {
  const [isFirst, setIsFirst] = useState(true);
  
  useEffect(() => {
    setIsFirst(false);
  }, []);
  
  return isFirst;
};

export const Show: React.FC<{ when: boolean; children: React.ReactNode }> = ({ 
  when, 
  children 
}) => {
  return when ? <>{children}</> : null;
};
