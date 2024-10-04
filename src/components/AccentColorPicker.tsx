import React from 'react';
import { useTheme } from '../context/ThemeContext';

const AccentColorPicker: React.FC = () => {
  const { accentColor, setAccentColor } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <input
        type="color"
        id="accent-color"
        value={accentColor}
        onChange={(e) => setAccentColor(e.target.value)}
        className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
      />
    </div>
  );
};

export default AccentColorPicker;