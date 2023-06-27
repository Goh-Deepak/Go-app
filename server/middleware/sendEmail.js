const nodemailer = require('nodemailer')
exports.sendEmail = async (options) => {
    var transport = nodemailer.createTransport({

        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secureConnection: true,
        auth: {
            user:  process.env.EMAIL_USER,
            pass:  process.env.EMAIL_PASS,
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: options.email,
        subject: options.subject,
        text: options.message,
        attachments: options.attachments
    }

    transport.sendMail(mailOptions, function (error, response) {
        if (error) {
            return error
        } else {
            return true
        }

        // if you don't want to use this transport object anymore, uncomment following line
        transport.close(); // shut down the connection pool, no more messages
    });


}