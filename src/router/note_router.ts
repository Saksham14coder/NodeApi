
import Express from "express";
import { NoteController } from "../controller/note_Controller";

const noteRouter : Express.Router = Express.Router();


noteRouter.get("/getMyNotes",NoteController.getMyNotes)
noteRouter.post("/addNotes",NoteController.addNotes)
noteRouter.put("/updateNote",NoteController.updateNote)
noteRouter.delete("/deleteNote",NoteController.deleteNote)
noteRouter.get("/searchNotes",NoteController.searchByTitle)


export default noteRouter;