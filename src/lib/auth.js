import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// dev এ বারবার নতুন সংযোগ না খুলে একটাই ব্যবহার করে
const globalForMongo = globalThis;
const client =
  globalForMongo.mongoClient ?? new MongoClient(process.env.MONGODB_URI);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = client;
}

const db = client.db("bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
    // সাইন আপের পর নিজে নিজে login হবে না, login পেজে যাবে
    autoSignIn: false,
  },
});