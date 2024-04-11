import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const { date, task } = data;

      const client = await MongoClient.connect(
        "mongodb+srv://kunduaritra7:5PEC4YLPKqVS5qkD@cluster0.it4emu0.mongodb.net/todoTask?retryWrites=true&w=majority&appName=Cluster0"
      );

      const db = client.db();
      const taskCollections = db.collection("todoTask");

      const result = await taskCollections.insertOne(data);

      res.status(201).json({ message: "Task added successfully!" });
    } catch (error) {
      console.error("Error handling request:", error);
      res.status(500).json({ message: "Internal Server Error" });
    } finally {
      client.close();
    }
  } else {
    res.status(405).end();
  }
}

export default handler;
