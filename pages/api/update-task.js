import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { taskId } = req.body;

      const client = await MongoClient.connect(
        "mongodb+srv://kunduaritra7:5PEC4YLPKqVS5qkD@cluster0.it4emu0.mongodb.net/todoTask?retryWrites=true&w=majority&appName=Cluster0"
      );

      const db = client.db();
      const taskCollections = db.collection("todoTask");

      const result = await taskCollections.updateOne(
        { _id: new ObjectId(taskId) },
        { $set: { completeStatus: true } }
      );

      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Task updated successfully" });
      } else {
        res.status(404).json({ message: "Task not found" });
      }
      client.close();
    } catch (error) {
      console.error("Error updating task:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
