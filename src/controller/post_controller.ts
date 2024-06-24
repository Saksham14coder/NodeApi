
import Express from "express";
import { getDatabase } from "../config/mongodb_client";
import { Post } from "../models/post_model";
import { ObjectId } from "mongodb";
import { link } from "fs";
import moment from "moment";


export class PostController{


    static async addPost(request:Express.Request,response:Express.Response){
 
         let db = getDatabase();

         let postCollection = db.collection("posts")

         const post : Post=request.body 

         const formattedDate = moment().format("MM/DD/YY HH:mm");
         post.createAt = moment(formattedDate, "MM/DD/YY HH:mm").valueOf();

         const data = await postCollection.insertOne(post);

         const objectId = data.insertedId;

         const userInfo = await postCollection.find({_id: new ObjectId(objectId)}).toArray()

         const userResponseData = userInfo[0];

        response.status(200).json({
            "status" : "success",
            "response" : userResponseData
        })

    }


    static async getMyPost(request:Express.Request,response:Express.Response){

 
        let db = getDatabase();

        let postCollection = db.collection("posts")

        const uid = request.query.uid;

        const data = await postCollection.find({creatorId : uid}).toArray();

        response.status(200).json({
            "status" : "success",
            "response" : data
        })

    }

    static async getAllPost(request:Express.Request,response:Express.Response){

 
        let db = getDatabase();

        let postCollection = db.collection("posts")

        const uid = request.query.uid;

        const data = await postCollection.find().toArray();

        response.status(200).json({
            "status" : "success",
            "response" : data
        })

    }


    static async updatePost(request:Express.Request,response:Express.Response){
 
        let db = getDatabase();

        let postCollection = db.collection("posts")

        const post : Post=request.body 

        
        const updateNoteObject ={
            pTitle : post.pTitle,
            pDescription : post.pDescription,
            createAt : post.createAt,
            favorite : post.favorite,
            link : {
                link1 : post.link.link1,
                link2 : post.link.link2
            },
            like : post.like
        }
 

        const data = await postCollection.updateOne({_id: new ObjectId(post.postId)},{$set: updateNoteObject});

         
        response.status(200).json({
            "status" : "success",
            "response" : data
        })

    }


    static async deletePost(request:Express.Request,response:Express.Response){
 
        let db = getDatabase();

        let postCollection = db.collection("posts")

        const post : Post=request.body 


        const data = await postCollection.deleteOne({_id: new ObjectId(post.postId)});

         
        response.status(200).json({
            "status" : "success",
            "response" : data
        })

    }

    static async searchByTitle(request: Express.Request, response: Express.Response) {
        let db = getDatabase();
        let postCollection = db.collection("posts");
        const pTitle = request.query.pTitle as string;
        const data = await postCollection.find({ pTitle: { $regex: pTitle, $options: "i" } }).toArray();
        response.status(200).json({
            "status": "success",
            "response": data
        });
    }

    static async sortByLikes(request: Express.Request, response: Express.Response) {
        let db = getDatabase();
        let postCollection = db.collection("posts");

        const data = await postCollection.find().sort({ like: -1 }).toArray();

        response.status(200).json({
            "status": "success",
            "response": data
        });
    }
}