function InputField({ label, required = false, ...inputProps }) {
  return (
    <>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        {...inputProps}
      />
    </>
  );
}

export default InputField;