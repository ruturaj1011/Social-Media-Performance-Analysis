
import { DataAPIClient } from "@datastax/astra-db-ts";

import { config } from "dotenv";
config();

const token = process.env.DBTOKEN;
const databaseUrl = process.env.DBURL; 

// Initialize the client
const client = new DataAPIClient(token);
const db = client.db(databaseUrl);

(async () => {
  try {
    // List collections to verify connection
    const collections = await db.listCollections();
    console.log('Connected to Astra DB successfully!');
    console.log('Collections:', collections);
  } catch (error) {
    console.error('Failed to connect to Astra DB:', error);
  }
})();
