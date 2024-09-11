const switchProvider = (chainId: number | undefined) => {
  switch (chainId) {
    case 1:
      return "mainnet";
    case 3:
      return "ropsten";
    case 4:
      return "rinkeby";
    case 5:
      return "goerli";
    case 42:
      return "kovan";
    case 31337:
      return "http://localhost:8545/";
    default:
      return "mainnet";
  }
};

export default switchProvider;
