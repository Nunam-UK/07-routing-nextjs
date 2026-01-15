export default function SearchBox() {
  return (
    <div style={{ marginBottom: '20px' }}>
      <input 
        type="text" 
        placeholder="Search notes..." 
        style={{ padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
      />
    </div>
  );
}