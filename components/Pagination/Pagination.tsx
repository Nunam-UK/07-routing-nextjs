export default function Pagination() {
  return (
    <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
      <button disabled style={{ padding: '5px 10px' }}>Previous</button>
      <button disabled style={{ padding: '5px 10px' }}>Next</button>
    </div>
  );
}