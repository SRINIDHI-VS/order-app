export default function Footer() {
  return (
    <footer className="mt-16 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} OrderHub. All rights reserved.</p>

        <div className="mt-2 flex justify-center gap-6 text-gray-500">
          <a href="#" className="hover:text-blue-600 transition">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600 transition">Terms</a>
          <a href="#" className="hover:text-blue-600 transition">Support</a>
        </div>
      </div>
    </footer>
  );
}
