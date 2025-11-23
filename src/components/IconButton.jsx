export default function IconButton({ icon: Icon, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg hover:bg-gray-200 transition ${className}`}
    >
      <Icon size={18} />
    </button>
  );
}