
import Express from "express";
import { getDatabase } from "../config/mongodb_client";
import { Note } from "../models/note_model";
import { ObjectId } from "mongodb";

export class NoteController{


    static async addNotes(request:Express.Request,response:Express.Response){
 
        let db = getDatabase();

        let notesCollection = db.collection("notes")

        const note : Note=request.body 

        note.createAt = Date.now();

        const data = await notesCollection.insertOne(note);

        response.status(200).json({
            "status" : "success",
            "response" : data
        })

    }


    static async getMyNotes(request:Express.Request,response:Express.Response){

 
        let db = getDatabase();

        let notesCollection = db.collection("notes")

        const uid = request.query.uid;

        const data = await notesCollection.find({creatorId : uid}).toArray();

        response.status(200).json({
            "status" : "success",
            "response" : data
        })

    }



    static async updateNote(request:Express.Request,response:Express.Response){
 
        let db = getDatabase();

        let notesCollection = db.collection("notes")

        const note : Note=request.body 

        const updateNoteObject ={
            title : note.title,
            description : note.description,
            createAt : note.createAt,
            follow : note.follow
        }

        const data = await notesCollection.updateOne({_id: new ObjectId(note.noteId)},{$set: updateNoteObject});

         
        response.status(200).json({
            "status" : "success",
            "response" : data
        })

    }


    static async deleteNote(request:Express.Request,response:Express.Response){
 
        let db = getDatabase();

        let notesCollection = db.collection("notes")

        const note : Note=request.body 


        const data = await notesCollection.deleteOne({_id: new ObjectId(note.noteId)});

         
        response.status(200).json({
            "status" : "success",
            "response" : data
        })

    }

    static async searchByTitle(request: Express.Request, response: Express.Response) {
        let db = getDatabase();
        let notesCollection = db.collection("notes");
        const title = request.query.title as string;
        const data = await notesCollection.find({ title: { $regex: title, $options: "i" } }).toArray();
        response.status(200).json({
            "status": "success",
            "response": data
        });
    }

}