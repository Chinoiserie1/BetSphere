const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 flex items-center p-3 px-8 bg-red-600 text-white">
      <div className="text-2xl">BetSphere</div>
      <div className="ml-auto">
        <button className="ml-2 px-4 py-1 bg-white text-red-600 rounded-lg hover:bg-white/60">
          Sign-up
        </button>
        <button className="ml-2 px-4 py-1 bg-white text-red-600 rounded-lg hover:bg-white/60">
          Sign-in
        </button>
      </div>
    </header>
  );
};

export default Header;
