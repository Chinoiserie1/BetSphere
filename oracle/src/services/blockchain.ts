import { ethers } from "ethers";
import dotenv from "dotenv";
import ABI from "../abi/OffChainDataFetch.json";

import evaluateExpression from "../utils/evaluateExpression";

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.TEST_RPC_URL);
const contractAddress: string = process.env.CONTRACT_ADDRESS!;

const oracleContract = new ethers.Contract(contractAddress, ABI.abi, provider);

const listenToEvents = () => {
  console.log("Listening to events...");
  const result = evaluateExpression("alice", "key == alice");
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
