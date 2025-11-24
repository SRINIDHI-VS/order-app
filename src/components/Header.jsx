export default function Header() {
  return (
    <header className="w-full max-w-full sm:max-w-7xl mx-auto bg-blue-800 shadow-lg border-b border-gray-200 rounded-2xl mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              OrderHub
            </h1>
            <p className="text-sm text-gray-300 -mt-0.5">
              Smart Order Management Dashboard
            </p>
          </div>

        </div>
      </div>
    </header>
  );
}
