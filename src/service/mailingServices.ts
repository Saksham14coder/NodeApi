import { InformationEvent } from "http";

const nodemailer = require('nodemailer');
import { mail } from "../service/nodemailerConfig";
 

//for email verification : 

export const SendVerifyEmail = async (username = "saksham", email ="abc@gmail.com", token = 123456) => {
    try{
        const transporter =nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: mail.emailUser,
                pass: mail.emailPassword
            }
        });
        const mailOptions = {
            from : mail.emailUser,
            to: email,
            subject: "OTP For Email Verification",
            html: `<p> 
                        Hii ${username}, <br/> <br />  
                        You requested to register in StackIn. 
                        <br /> <br />  
                        Please, use the OTP below to verify you email.
                        <br /> <br />  
                        OTP : ${token}
                        <br /> <br />
                        Hope you have Good Day dear ${username}💕
                    </p>`
        }
        transporter.sendMail(mailOptions, (error:Error, info:InformationEvent)=>{
            if(error){
                console.log("error: ", error);
            }else{
                console.log("Mail has been sent. Info: ");
            }
        })
    }catch(error){
        console.log("Error: ",error);
    }
}

 