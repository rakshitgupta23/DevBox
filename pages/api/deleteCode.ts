import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "DELETE") {
        const { email, codeId } = req.body;

        if (!email || !codeId) {
            return res.status(400).json({ msg: "Email and codeId are required" });
        }

        let { db } = await connectToDatabase();

        // Convert the codeId from string to ObjectId
        const codeObjectId = new ObjectId(codeId);

        try {
            // Remove the code document from the 'codeDoc' collection
            const deleteCodeDoc = await db.collection('codeDoc').deleteOne({ _id: codeObjectId });

            if (deleteCodeDoc.deletedCount === 0) {
                return res.status(404).json({ msg: "Code not found" });
            }

            // Remove the codeId from the user's 'codes' array in 'codes' collection
            const updateUser = await db.collection('codes').updateOne(
                { email: email },
                { $pull: { codes: codeObjectId } }
            );

            if (updateUser.modifiedCount === 0) {
                return res.status(404).json({ msg: "User not found or codeId not in user's codes" });
            }

            return res.status(200).json({ msg: "Code deleted successfully" });
        } catch (err) {
            console.log("Error deleting code:", err);
            return res.status(500).json({ msg: "An unexpected error occurred", err: err });
        }
    } else {
        res.status(405).json({ msg: "Method Not Allowed" });
    }
}

export default handler;
