'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: PaginationProps) {
  return (
    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
      <button 
        disabled={currentPage <= 1} 
        onClick={() => onPageChange(currentPage - 1)}
        style={{ padding: '8px 16px', cursor: currentPage <= 1 ? 'not-allowed' : 'pointer' }}
      >
        Previous
      </button>

      <span style={{ fontWeight: 'bold' }}>
        Page {currentPage} of {totalPages || 1}
      </span>

      <button 
        disabled={currentPage >= totalPages} 
        onClick={() => onPageChange(currentPage + 1)}
        style={{ padding: '8px 16px', cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer' }}
      >
        Next
      </button>
    </div>
  );
}