export default function NoteForm() {
  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
      <input type="text" placeholder="Note title" style={{ padding: '8px' }} />
      <textarea placeholder="Note content" style={{ padding: '8px' }} />
      <button type="submit" style={{ padding: '10px', background: '#4facfe', color: 'white', border: 'none' }}>
        Add Note
      </button>
    </form>
  );
}