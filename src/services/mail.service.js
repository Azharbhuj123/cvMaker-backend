const ApiError = require("../utils/APIError");
const httpStatus = require("http-status");
const fs = require("fs");
const nodemailer = require("nodemailer");
const config = require("../config/config");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "morecreate.emails@gmail.com",
//     pass: "morecreate123!@#",
//   },
//   logger: true,
//   debug: true,
// });

const transporter = nodemailer.createTransport({
  service: "gmail",
  // host: 'smtp.gmail.com',
  // port: 465,
  auth: {
    user: config.mailer.email,
    pass: config.mailer.password,
  },
  logger: true,
  debug: true,
});

function replaceAll(str, find, replace) {
  var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  return str.replace(new RegExp(escapedFind, "g"), replace);
}

const sendFile = async (files, email) => {
  const sendingMail = config.mailer.email;

  let attachment = [];
  //   for (let index = 0; index < files.length; index++) {
  // const element = {
  //   filename: files.filename + ".pdf",
  //   content: fs.createReadStream(files.path),
  // };
  // attachment.push(element);

  const mailOptions = {
    from: sendingMail,
    to: config.mailer.receiver,
    subject: `${email} noen har nettopp laget en CV ved hjelp av CV-maker,
    `,
    // html: "EOM",
    html:`${config.mailer.baseurl}/uploads/${files.filename}`
    // attachments: attachment,
  };

  await transporter.sendMail(mailOptions, async function (err, data) {
    // await fs.unlink(files.path, (err) => {
    //   if (err) {
    //     console.log("ERROR while sending email", err);
    //   } else {
    //     console.log("\nDeleted file");
    //   }
    // });
    if (err) {
      console.log("error while sending mail.")
    } else {
      console.log("mail Sent")
    }
    return "mail Sent";
  });
};

const suggestion = async (body) => {
  console.log(body);
  const transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: body.email,
      pass: body.password,
    },
    logger: true,
    debug: true,
  });
  const recipents = body.recipents;
  const sendingMail = body.email;
  let test = await replaceAll(body.message, "&lt;", "<");
  const mailOptions = {
    from: sendingMail,
    to: recipents,
    subject: body.subject,
    html: test,
  };

  const response = await transporter.sendMail(
    mailOptions,
    async (err, data) => {
      if (err) {
        console.log(err);
        return "mail not sent";
      }
      console.log(data, "<==== data");
      return "mail sent";
    }
  );
};

module.exports = { sendFile, suggestion };
