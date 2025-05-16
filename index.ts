import express, { Application, Request, Response } from 'express';
import nodemailer, { Transporter } from 'nodemailer';
import { Sequelize, QueryTypes } from 'sequelize';
// ✅ REMOVE: import * as mysql from 'mysql2';

const app: Application = express();
app.use(express.json());

// ✅ Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "rajni@airai.games",
        pass: "hzyo wuwt nlkf eznu"
    }
}) as Transporter;

app.post('/send-email', async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, phone, project, message } = req.body;
        const mailOptions = {
            from: "rajni@airai.games",
            to: "rajnimodgill4@gmail.com",
            subject: `New Inquiry from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nProject: ${project}\nMessage: ${message}`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully: ", info);
        res.json({ message: 'Email sent successfully', info });
    } catch (error: any) {
        res.status(500).json({ message: 'Email sending failed', error: error.message || error });
    }
});


const sequelize = new Sequelize(
  'ludo',
  'doadmin',
  'AVNS_wv6o4ceCzPi2A4IbQ7T',
  {
    host: 'db-mysql-blr1-65686-do-user-9331108-0.m.db.ondigitalocean.com',
    port: 25060,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    logging: false
  }
);



app.get('/getappdata', async (req: Request, res: Response) => {
    try {

        console.log(sequelize,"sequilierfetf");
        
        const sql = `SELECT * FROM appdata`;
        const getdata = await sequelize.query(sql, { type: QueryTypes.SELECT });

        res.status(200).json({
            success: true,
            message: "App data retrieved successfully",
            data: getdata
        });
    } catch (error) {
        console.error("Error fetching app data:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred",
            error: error instanceof Error ? error.message : error
        });
    }
});

app.get('/get', (req, res) => {
    res.send('get data successfully');
    console.log("get data");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
