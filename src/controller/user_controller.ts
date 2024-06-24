import { ObjectId } from "mongodb";
import { getDatabase } from "../config/mongodb_client";
import { User } from "../models/user_model";
import Express from "express";
 


export class UserController {


    static async signUp(request:Express.Request,response:Express.Response){


        let db = getDatabase();

        let userCollection = db.collection("user")

        const user : User = request.body;

        const checkUseerInDb = {
            email: user.email
        }

        const data = await userCollection.find(checkUseerInDb).toArray();

        if(data.length != 0){
            response.status(403).send({
                "status":"Failure",
                "response":"Email Already Exists"
            })
        }else{

            const responseData = await userCollection.insertOne(user);

            const objectId = responseData.insertedId;

            const userInfo = await userCollection.find({_id: new ObjectId(objectId)}).toArray()

             const userResponseData = userInfo[0];

             userResponseData.password = "";
             
             response.status(200).send({
                "status":"success",
                "response":userResponseData,
             })

            

        }

    }

    static async signIn(request:Express.Request,response:Express.Response){

        let db = getDatabase();

        let userCollection = db.collection("user")

        const user : User = request.body;

        const checkUseerInDb = {
            email: user.email
        }

        const data = await userCollection.find(checkUseerInDb).toArray();

        if(data.length != 0){

           let userInfo = data[0]; 

           let pass;
           if(user.password==userInfo.password){
             pass = true;
           }else{
             pass = false;
           } 

           if((user.email == userInfo.email) && pass){
            
            userInfo.password = "";
            
            response.status(200).json({
                "status":"success",
                "response":userInfo
            })

           }else{

            response.status(403).send({
                "status":"Failure",
                "response":"Invaild Email & Password please check"
            })

           }

        }else{
            response.status(403).send({
                "status":"Failure",
                "response":"Invaild Email & Password please check"
            })
        }
    }



    static  async  myProfile(request: Express.Request,response :Express.Response) {
        let db = getDatabase();

        let userCollection = db.collection("user")

        const uid = request.query.uid;

        const userData =await userCollection.find({_id:new ObjectId(uid!.toString())}).toArray();

        response.status(200).json(
            {
                "status":"success",
                "response":userData[0]
            }
        )

    }



    static async updateProfile(request:Express.Request,response:Express.Response){

        let db = getDatabase();

        let userCollection = db.collection("user")

        const user : User = request.body;

        const updateUserObject = {
            username:user.username,
        }

        const updateUserInfo = await userCollection.updateOne({_id: new ObjectId(user.uid)},{$set : updateUserObject })

        response.status(200).json({
            "status":"success",
            "response":updateUserInfo
        })

         
       
    }

    static async updateFollower(request:Express.Request,response:Express.Response){

        let db = getDatabase();

        let userCollection = db.collection("user")

        const user : User = request.body;

        const updateUserObject = {
            follower:user.follower,
            following : user.following
        }

        const updateUserInfo = await userCollection.updateOne({_id: new ObjectId(user.uid)},{$set : updateUserObject })


        response.status(200).json({
            "status":"success",
            "response":updateUserInfo
        })

         
       
    }

}