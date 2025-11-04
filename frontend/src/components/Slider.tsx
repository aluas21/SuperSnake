import React from 'react';

interface SliderProps {
  name: string;
  values: string[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const Slider: React.FC<SliderProps> = ({
  name,
  values,
  selectedValue,
  onChange,
}) => {
  const selectedIndex = values.indexOf(selectedValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.value, 10);
    const newValue = values[index];
    if (newValue) onChange(newValue);
  };

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <label className="font-mono font-bold text-slate-700 text-base mb-2">{name}</label>
      <input
        type="range"
        min={0}
        max={values.length - 1}
        step={1}
        value={selectedIndex}
        onChange={handleChange}
        className="slider mb-4 w-64"
      />
      <div className="flex justify-between w-full px-4 text-sm text-slate-600 font-mono">
        {values.map((value, index) => (
          <span key={index} className={selectedValue === value ? 'font-extrabold' : ''}>
            {value}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
