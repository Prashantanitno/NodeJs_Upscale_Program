async function main(options) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL,
      pass: process.env.SECRET_PASSWORD,
    },
  });

  let mailOptions = {
    from: "Aditya555antino@gmail.com",
    to: "anuj.aes@gmail.com",
    subject: "Password Reset",
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  info
    .then((data) => {
      console.log("Node Mailer - mail sent", data);
    })
    .catch((err) => {
      console.log(err);
    });

  if (info.messageId) {
    return {
      status: true,
      msgId: info.messageId,
    };
  }
}
