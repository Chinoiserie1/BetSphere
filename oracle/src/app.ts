import express, { Application } from "express";
import dotenv from "dotenv";
import listenToEvents from "./services/blockchain";

dotenv.config();

const app: Application = express();

listenToEvents();

export default app;
