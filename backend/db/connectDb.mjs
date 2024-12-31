// import { DataAPIClient } from "@datastax/astra-db-ts";
// import { config } from "dotenv";

// config();

// const token = process.env.DB_TOKEN;
// const databaseUrl = process.env.DB_URL;

// // Initialize the client
// const client = new DataAPIClient(token);
// const db = client.db(databaseUrl);

// // Function to list collections
// export const connectDB = async () => {
//   try {
//     const collection = db.collection('posts');
//     console.log('Collections:', collection);
//     return collection;
//   } catch (error) {
//     console.error('Failed to connect to Astra DB:', error);
//     throw error;
//   }
// };

// export const getDB = () => db;

import cassandra from 'cassandra-driver';

const client = new cassandra.Client({
  cloud: { secureConnectBundle: "C:\\Users\\rutur\\OneDrive\\Desktop\\SuperMindHackathonAssignment\\secure-connect-social-media-performance.zip" },

  credentials: { username: 'OjAFPrPddfjXJNYyqKQzJQEi', password: 'Sev7eTFQnkm,6FJUzSMZCUbZSa6uUfgxIusoN+6O0ewZNkHB5qKrUZMIcZHCd_jJoKdkUt8zOwOZRk_n6kMFCl6,KA0SOdZj1z5dghxpkLtxLjIKZCpU7PGg1g7SLCv+' },
  keyspace: 'default_keyspace',
});

export const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected to Astra DB");
  } catch (error) {
    console.error("Error connecting to Astra DB:", error);
  }
};

export const getDB = () => client;

