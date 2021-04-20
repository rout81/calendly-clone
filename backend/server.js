const express = require("express");
const fs = require("fs");
const nodemailer = require("nodemailer");
const ics = require("ics");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      name: "satya",
      kam: "nrutya",
      mam: "kritya",
    },
  });
});

app.post("/api", (req, res) => {
  const event = {
    start: [...req.body.start],
    duration: { hours: 1, minutes: 0 },
    title: "Future Blink Event",
    description: "Future Blink Web Conferencing Event",
    location: "Folsom Field, University of Colorado (finish line)",
    geo: { lat: 40.0095, lon: 105.2669 },
    status: "CONFIRMED",
    busyStatus: "FREE",
    organizer: { name: "FutureBlink", email: "futureblink@example.com" },
  };

  ics.createEvent(event, (error, value) => {
    if (error) {
      console.log(error);
    }

    fs.writeFileSync(`${__dirname}/event.ics`, value);
  });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP,
    port: 587,
    secure: false,
    requireTLS: true,
    service: "Gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailObj = {
    from: "satyaranjanrout81@gmail.com",
    to: req.body.data.email,
    subject: "Future Blink Invitation",
    text: req.body.data.textArea,
    attachments: [
      {
        filename: "event.ics",
        path: path.join(__dirname, "/event.ics"),
      },
    ],
  };

  transporter.sendMail(mailObj, function (err, info) {
    console.log(err, info);
    fs.rmSync("./backend/event.ics");
  });

  res.json({
    status: "success",
    mailTo: req.body.data.email,
  });
});

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("frontend/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//   });
// }

const PORT = process.env.PORT || 5000;

app.listen(5000, () => console.log(`server started on port ${PORT}`));
