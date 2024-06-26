import { MongoClient } from "mongodb";
// const MONGODB_URI = "mongodb://localhost:27017/";
const MONGODB_URI ="mongodb+srv://ajit:ajit@cluster0.botzt9l.mongodb.net/"
const MONGODB_DB = "test";

let cachedClient;
let cachedDb;

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    if (!MONGODB_URI) {
        throw new Error("Define the MONGODB_URI environmental variable");
    }
    if (!MONGODB_DB) {
        throw new Error("Define the MONGODB_DB environmental variable");
    }
    let client = new MongoClient(MONGODB_URI);
    await client.connect();
    let db = client.db(MONGODB_DB);
    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb,
    };
}