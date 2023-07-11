import nodemailer, { TransportOptions } from 'nodemailer';
import { google } from 'googleapis';
import { NextFunction, Request, Response } from 'express';

import Email from '@models/Email';

const sendMail = async (req: Request, res: Response) => {
  try {
    // const oAuth2Client = new google.auth.OAuth2(
    //   process.env.CLIENT_ID,
    //   process.env.CLIENT_SECRET,
    //   process.env.REDIRECT_URI,
    // );
    // oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
    // const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_APP_PASS,
      },
      // auth: {
      //   type: 'OAuth2',
      //   user: 'vincenzo33.pellegrini@gmail.com',
      //   clientId: process.env.CLIENT_ID,
      //   clientSecret: process.env.CLIENT_SECRET,
      //   refreshToken: process.env.REFRESH_TOKEN,
      //   accessToken,
      // },
    } as TransportOptions);

    const mailOptions = {
      from: req.body.email,
      to: process.env.GOOGLE_EMAIL,
      subject: req.body.subject,
      text: req.body.description,
    };

    const result = await transporter.sendMail(mailOptions);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const createEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, subject, who, description } = req.body;

  try {
    const contact = await Email.create({
      ip: req.ip,
      name,
      email,
      subject,
      who,
      description,
    });

    res.status(201).json({
      success: true,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { sendMail, createEmail };
