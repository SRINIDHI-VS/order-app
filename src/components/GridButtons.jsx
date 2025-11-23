export const ActionButton = ({ label, className, onClick }) => (
  <button
    className={`px-4 py-2 rounded-lg font-medium text-sm shadow-sm
                hover:shadow-md transition duration-200 text-white ${className}`}
    onClick={onClick}
  >
    {label}
  </button>
);
