import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const data = req.body;

    const client = await MongoClient.connect(process.env.MONGO_URL);

    const db = client.db();

    const jobsCollection = db.collection("jobs");

    await jobsCollection.insertOne(data);

    client.close();

    return res.status(201).json({ message: "job added succesfully" });
  }
}
