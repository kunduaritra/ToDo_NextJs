import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const data = req.body;
      const { id, date, task, completeStatus } = data;

      const client = await MongoClient.connect(
        "mongodb+srv://kunduaritra7:5PEC4YLPKqVS5qkD@cluster0.it4emu0.mongodb.net/todoTask?retryWrites=true&w=majority&appName=Cluster0"
      );

      const db = client.db();
      const taskCollections = db.collection("todoTask");

      const result = await taskCollections.updateOne(
        { _id: new ObjectId(id) },
        { $set: { task: task, date: date, completeStatus: completeStatus } }
      );
      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Task Updated Successfully" });
      } else {
        res.status(404).json({ message: "Task not found" });
      }
      client.close();
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
}

export default handler;
