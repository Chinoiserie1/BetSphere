function getValueFromKeyPath(obj: any, keyPath: string): any {
  return keyPath
    .split(/[\.\[\]]/)
    .filter(Boolean)
    .reduce((acc, key) => acc && acc[key], obj);
}

export default getValueFromKeyPath;
