import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      const deleteId = JSON.parse(req.body);
      const client = await MongoClient.connect(
        "mongodb+srv://kunduaritra7:5PEC4YLPKqVS5qkD@cluster0.it4emu0.mongodb.net/todoTask?retryWrites=true&w=majority&appName=Cluster0"
      );
      const db = client.db();
      const taskCollections = db.collection("todoTask");

      const result = await taskCollections.deleteOne({
        _id: new ObjectId(deleteId),
      });

      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Task Deleted Successfully" });
      } else {
        res.status(404).json({ message: "Task not found" });
      }
      client.close();
    } catch (error) {
      console.log(error);
    }
  }
}

export default handler;
