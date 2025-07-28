import React from 'react';
import './Slider.css';

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
    <div className="slider__wrapper">
      <label className="slider__name">{name}</label>
      <input
        type="range"
        min={0}
        max={values.length - 1}
        step={1}
        value={selectedIndex}
        onChange={handleChange}
        className="slider"
      />
      <div className="slider__labels">
        {values.map((value, index) => (
          <span key={index} className={selectedValue === value ? 'active' : ''}>
            {value}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
