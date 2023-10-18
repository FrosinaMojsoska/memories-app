//POST /api/new-memory
import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    console.log("here")
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://frosinam:react23@cluster0.tjwf3jf.mongodb.net/memories?retryWrites=true&w=majority"
      
    );

    const db = client.db();
    const memoriesCollection = db.collection("memories");
    const result = await memoriesCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "Memory inserted!" });
  }
}

export default handler;
