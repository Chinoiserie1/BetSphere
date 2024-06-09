import { ethers } from "ethers";
import dotenv from "dotenv";
import ABI from "../abi/OffChainDataFetch.json";

import evaluateExpression from "../utils/evaluateExpression";

import getValueFromKeyPath from "../utils/keyManipulation.ts/getValueFromKeyPath";
import convertToKeysParams from "../utils/keyManipulation.ts/convertToKeysParams";
import getKeysValues from "../utils/keyManipulation.ts/getKeysValues";

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.TEST_RPC_URL);
const contractAddress: string = process.env.CONTRACT_ADDRESS!;

const oracleContract = new ethers.Contract(contractAddress, ABI.abi, provider);

const listenToEvents = async () => {
  console.log("Listening to events...");

  // start test
  const res = {
    team1: { name: "team1" },
    team2: { name: "team2" },
    winner: "team2",
    response: [
      {
        goals: [
          {
            home: 1,
            away: 2,
          },
          {
            home: 2,
            away: 3,
          },
          {
            home: 3,
            away: 4,
          },
        ],
      },
    ],
    data: "some data",
  };
  const exempleKeys = ["response[0].goals[2].away", "team1.name", "winner"];

  const keysParams = convertToKeysParams(getKeysValues(res, exempleKeys));

  console.log("SF", getKeysValues(res, exempleKeys));

  console.log("GVF", getValueFromKeyPath(res, exempleKeys[0]));

  console.log("KP", keysParams);

  const result = evaluateExpression(
    keysParams,
    "key1>1&&key2=='team1'&&key3=='team2'"
  );
  console.log("res", result);
  // end test

  // Listen to Request events
  oracleContract.on(
    "Request",
    (id, target, url, params, keys, condition, event) => {
      console.log(
        `Event Request triggered with args: ${id}, ${target}, ${url}, ${params}, ${keys}, ${condition}`
      );

      // Run job with the event arguments
      runJob(id, target, url, params, keys, condition);
    }
  );
};

const runJob = async (
  id: string,
  target: string,
  url: string,
  params: string[],
  keys: string[],
  condition: string
) => {
  // check if the URL is whitelisted
  const isWhitelisted = await fetch(
    "http://localhost:3000/whitelisted-url/is-whitelisted",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    }
  )
    .then((res) => res.json())
    .then((res) => res.whitelisted);
  console.log("Is the URL whitelisted: ", isWhitelisted);

  // Fetch data from the given URL
  const res = await fetch(url);
  const data = await res.json();
  console.log("Data fetched from the URL:", data);

  const keysParams = convertToKeysParams(getKeysValues(data, keys));

  const result = evaluateExpression(keysParams, condition);

  console.log("Result of the condition:", result);
  // perform blockchain call
};

export default listenToEvents;
