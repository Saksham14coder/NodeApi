
import { MongoClient,Db } from "mongodb";

let mongoDb : Db


export async function connectToDatabase(){
    const url = 'mongodb+srv://thorstark140:mongodb%4012345@cluster0.yjppncs.mongodb.net/'
    const client = new MongoClient(url);

    mongoDb = client.db("notedb")
    console.log("mongodb connected successfully")


}

export function getDatabase() : Db{
    return mongoDb
}
