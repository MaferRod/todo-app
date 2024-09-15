// components/Pagination.tsx
import React from "react";

const Pagination: React.FC = () => {
  return (
    <div className="pagination">
      <span>&laquo;</span>
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>...</span>
      <span>10</span>
      <span>&raquo;</span>
    </div>
  );
};

export default Pagination;