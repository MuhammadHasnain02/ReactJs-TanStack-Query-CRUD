const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} TanStack Query CRUD App
        </p>

        <p className="text-sm text-gray-400">
          Built with React, TanStack Query & Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
