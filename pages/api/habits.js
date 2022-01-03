import clientPromise from "../../mongodb";
import { ObjectID } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("HTC");
  switch (req.method) {
    case "POST": {
      let bodyObject = req.body;
      try {
        await db.collection("habits").insertOne(bodyObject);
        res.status(200).json({ result: "success" })
      } catch (error) {
        res.json({ error: error })
      }
      break;
    }
    case "GET": {
      const habits = await db.collection("habits").find({}).sort({ _id: -1 }).toArray();
      res.json({ status: 200, data: habits });
      break;
    }
    case "PUT": {
      let bodyObject = req.body;
      try {
        await db.collection("habits").updateOne({ _id: ObjectID(bodyObject._id) }, { $set: bodyObject.updatedData });
        res.status(200).json({ result: "success" })
      } catch (error) {
        res.json({ error: error })
      }
      break;
    }
    case "DELETE": {
      const habitId = ObjectID(req.body._id);
      const result = await db.collection("habits").deleteOne({ _id: habitId });
      res.json({ result });
      break;
    }
  }
}