import nodemailer, { TransportOptions } from 'nodemailer';
import { google } from 'googleapis';
import { Request, Response } from 'express';

import { mailoptions } from '../constants';

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function sendMail(req: Request, res: Response) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'vincenzo33.pellegrini@gmail.com',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken,
      },
    } as TransportOptions);

    const mailOptions = {
      ...mailoptions,
      text: 'The Gmail API with NodeJS works',
    };

    const result = await transporter.sendMail(mailOptions);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

export { sendMail };
