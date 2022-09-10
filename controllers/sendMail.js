require('dotenv').config()

const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const {OAuth2} = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env

// console.log(process.env.SENDER_EMAIL_ADDRESS)

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
)

// send mail
const sendEmail = (to, url, txt) => {
    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN
    })

    const accessToken = oauth2Client.getAccessToken()


    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken
        }
    })

    const mailOption = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: 'Requested password reset',
        html: 
            `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Looking For Helpers.</h2>
            <p>To reset your Looking For Helper account password click on the button below. 
            Please note that reset link will expire in 48 hours. If you didn't issue a password reset you can safely ignore this email.
            </p>
            
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
            Have a nice day
            </div>
            `
    }

    smtpTransport.sendMail(mailOption, (err, infor) => {
        if (err) return err
        return infor
    })

}



module.exports = sendEmail