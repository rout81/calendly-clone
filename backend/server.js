const express = require("express");
const fs = require("fs");
const nodemailer = require("nodemailer");
const ics = require("ics");
const cors = require("cors");

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
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "satyaranjanrout81@gmail.com",
      pass: "siba-9658",
    },
  });

  const mailObj = {
    from: "satyaranjanrout81@gmail.com",
    to: req.body.data.email,
    subject: "Future Blink Invitation",
    text: req.body.data.textArea,
    attachments: [{ filename: "event.ics", path: "./backend/event.ics" }],
  };

  transporter.sendMail(mailObj, function (err, info) {
    console.log(err, info);
    fs.rmSync("./backend/event.ics");
  });

  res.send("done");
});

app.listen(5000, () => console.log("server started on port 5000"));
