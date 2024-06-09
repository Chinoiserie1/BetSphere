import getValueFromKeyPath from "./getValueFromKeyPath";

const getKeysValues = (res: any, keyPaths: string[]) => {
  return keyPaths.map((keyPath) => getValueFromKeyPath(res, keyPath));
};

export default getKeysValues;
