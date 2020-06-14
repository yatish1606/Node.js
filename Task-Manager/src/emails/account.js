const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeMail = (email, name) => {
    sgMail.send({
        to : email,
        from : 'yatish1606@gmail.com',
        subject : 'Welcome to the App!',
        text : `Hey, ${name} how you doin ? Welcome to the Task Manager App`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to : email,
        from : 'yatish1606@gmail.com',
        subject : 'Goodbye!',
        text : `Hey, ${name} sorry to see that you deleted your account. `
    })
}

module.exports = {
    sendWelcomeMail,
    sendCancellationEmail
}