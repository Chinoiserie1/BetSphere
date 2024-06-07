import { ethers } from "ethers";
import dotenv from "dotenv";
import ABI from "../abi/OffChainDataFetch.json";

import evaluateExpression from "../utils/evaluateExpression";
import getValueFromKeyPath from "../utils/getValueFromKeyPath";

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.TEST_RPC_URL);
const contractAddress: string = process.env.CONTRACT_ADDRESS!;

const oracleContract = new ethers.Contract(contractAddress, ABI.abi, provider);

const listenToEvents = () => {
  console.log("Listening to events...");
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

  const simulatedFetchData = (res: any, keyPaths: string[]) => {
    return keyPaths.map((keyPath) => getValueFromKeyPath(res, keyPath));
  };

  console.log(simulatedFetchData(res, exempleKeys));

  console.log(getValueFromKeyPath(res, exempleKeys[0]));

  const result = evaluateExpression(
    { key1: "alice", key2: "100" },
    "key1 == 'alice' && key2 > 60"
  );
  console.log(result);
  oracleContract.on(
    "Request",
    (id, target, timestamp, url, params, key, condition, event) => {
      console.log(
        `Event Request triggered with args: ${id}, ${target}, ${timestamp}, ${url}, ${key}, ${condition}`
      );

      // Run your job here
    }
  );
};

const runJob = async (
  id: string,
  target: string,
  timestamp: number,
  url: string,
  params: string,
  key: string,
  condition: string
) => {};

export default listenToEvents;
