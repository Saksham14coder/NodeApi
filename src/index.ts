import Express from "express";
import cors from 'cors';
import {connectToDatabase} from "./config/mongodb_client"
import appLogger from "./middleware/app_logger"
import userRouter from "./router/user_router";
import noteRouter from "./router/note_router";
import postRouter from "./router/post_router";
const PORT = process.env.PORT || 8000;
 

const app : Express.Application = Express();


app.use(cors())
app.use(Express.json())
app.use(appLogger)
app.use(Express.urlencoded({extended:false}))
app.use("/v1/user",userRouter)
app.use("/v1/note",noteRouter)
app.use("/v1/post",postRouter)


// const hostName = "localhost";
// const portNumber = 8000;



// app.listen(portNumber,hostName, async()=>{
//     await connectToDatabase();
//     let date = new Date().toLocaleTimeString(); 
//     console.log("Welcome to my notes app backend server "+`${date}`);
// })

const start = async () => {
    try {
      await connectToDatabase();
      app.listen(PORT, () => {
        let date = new Date().toLocaleTimeString(); 
        console.log("Welcome to my notes app backend server "+`${date}`);
        console.log("Conneced to the port : " + PORT);
      });
    } catch (error) {
      console.log(error);
    }
  };
  start();
