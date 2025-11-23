function InputField({ label, required = false, ...inputProps }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        className="w-full p-3 border border-gray-300 rounded-lg 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   outline-none transition"
        {...inputProps}
      />
    </div>
  );
}

export default InputField;
