const express = require("express");
const bodyParser = require("body-parser");

const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", async (req, res) => {
  const { from, to, subject, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const msg = {
    from: `The Node Mailer Api`, // sender address
    to: `${to}`, // list of receivers
    subject: `${subject}`, // Subject line
    text: `${message} From ${from}`, // plain text body
  };

  // send mail with defined transport object
  try {
    await transporter.sendMail(msg);
    console.log("Message sent:");
    res.send("Email Sent!");
  } catch {
    console.timeLog("Sending Failed");
    res.send("Sending Failed");
  }
});

app.listen(port, () => console.log(`Running on port ${port}`));
