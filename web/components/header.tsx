import ConnectButton from "./connectButton";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 flex items-center p-3 px-8 bg-red-600 text-white">
      <div className="text-2xl">BetSphere</div>
      <div className="ml-auto">
        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;
