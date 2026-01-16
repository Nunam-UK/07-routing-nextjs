'use client';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <input 
        type="text" 
        placeholder="Search notes..." 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        style={{ 
          padding: '8px', 
          width: '100%', 
          borderRadius: '4px', 
          border: '1px solid #ccc',
          boxSizing: 'border-box' 
        }}
      />
    </div>
  );
}