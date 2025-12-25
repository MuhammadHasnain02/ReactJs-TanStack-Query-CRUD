const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-300 shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-18 flex items-center justify-between">
        
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
            U
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-none">
              Users Dashboard
            </h1>
            <p className="text-xs text-gray-500">
              Manage users easily
            </p>
          </div>
        </div>

        {/* Right: Action */}
        <button className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 cursor-pointer active:scale-95 transition">
          + Add User
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
