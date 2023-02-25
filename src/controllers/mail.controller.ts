import {NextFunction, Request, Response} from "express";
import {ISendEmail} from "../types/mail.type";
import nodemailer from "nodemailer";

// email: demyanchuk-art@mail.ru
// service-password: QTtaGsivghrHxPRgyf8F

export const mailController = {
    //=============== SEND EMAIL ===============//
    sendEmail: async (req: Request<any, any, ISendEmail>, res: Response, next: NextFunction) => {
        try {
            const sendEmailData = req.body;
            console.log(sendEmailData)
            const {name, from, email, idea, brief, budget} = sendEmailData
            const ideaText = idea ? idea : "не указано"
            const briefText = brief ? brief : "не указано"
            const budgetText = budget ? budget : "не указано"
            const subject = `Отклик клиента с сайта Demyanchuk Art`

            const transporter = nodemailer.createTransport({
                host: 'smtp.mail.ru',
                port: 465,
                secure: true,
                auth: {
                    user: "demyanchuk-art@mail.ru",
                    pass: "QTtaGsivghrHxPRgyf8F",
                }
            });
            await transporter.sendMail({
                from: "demyanchuk-art@mail.ru",
                to: "demyanchuk-art@mail.ru",
                subject,
                text: "",
                html:
                    `
                <div> 
                     <p>Отклик клиента с сайта Demyanchuk Art</p> 
                     <p>Имя клиента: ${name}</p>                          
                     <p>Веб-сайт или компания клиента: ${from}</p>
                     <p>Почта клиента: ${email}</p>                    
                     <p>Идея проекта: ${ideaText}</p>   
                     <p>Категория проекта: ${briefText}</p>
                     <p>Бюджет проекта: ${budgetText}</p>  
                </div>
                `
            });


            res.json("send email success");
        } catch (e) {
            next(e)
        }
    },
}
