import { ethers } from "ethers";
import dotenv from "dotenv";
import ABI from "../abi/OffChainDataFetch.json";

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.TEST_RPC_URL);
const contractAddress: string = process.env.CONTRACT_ADDRESS!;

const oracleContract = new ethers.Contract(contractAddress, ABI.abi, provider);

const listenToEvents = () => {
  console.log("Listening to events...");
  oracleContract.on(
    "Request",
    (id, target, timestamp, url, key, condition, event) => {
      console.log(
        `Event Request triggered with args: ${id}, ${target}, ${timestamp}, ${url}, ${key}, ${condition}`
      );

      // Run your job here
    }
  );
};

export default listenToEvents;
