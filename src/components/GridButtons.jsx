const ActionButton = ({ label, className, onClick }) => (
  <button
    className={`p-2 m-1 rounded-lg font-medium text-sm shadow-sm
                hover:shadow-md transition duration-200 text-white ${className}`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default ActionButton;
