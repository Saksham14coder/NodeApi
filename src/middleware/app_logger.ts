
import Express from "express";

let appLogger = (request : Express.Request,response : Express.Response, next : Express.NextFunction) => {



    const url = request.url;
    const method  = request.method;
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    const result : string = `${url} | ${method} | ${date} | ${time}`


    console.log(request);

    next();

}

export default appLogger;