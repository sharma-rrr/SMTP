import express, { Application, Request, Response } from 'express';
import nodemailer, { Transporter } from 'nodemailer';
import { Sequelize, QueryTypes } from 'sequelize';
import * as mysql from 'mysql2';

const app: Application = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: "rajni@airai.games",
        pass: "hzyo wuwt nlkf eznu"
    }
}) as Transporter; // Explicit casting




app.post('/send-email',async (req: Request, res: Response,): Promise<void> => {
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

// Sequelize instance using your env variables
const sequelize = new Sequelize(
  process.env.DBNAME || 'appdata',
  process.env.DBUSER || 'root',
  process.env.DBPASS || '',
  {
    host: process.env.DBHOST || 'localhost',
    dialect: 'mysql',
  }
);



app.get('/getappdata', async (req: Request, res: Response) => {
    try {
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
  res.send('get data????????????????>>>>>>>>>>>>>>>>>>>>');
  console.log("get data");
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
