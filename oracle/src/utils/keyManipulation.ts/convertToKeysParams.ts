import { Params } from "../../types";

function convertToKeysParams(array: any[]): Params {
  let result: { [key: string]: any } = {};

  array.forEach((value, index) => {
    let key = `key${index + 1}`;
    result[key] = value;
  });

  return result;
}

export default convertToKeysParams;
