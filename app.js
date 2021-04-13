const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const notificationService = require("./notification");

const app = express();
app.use(morgan("dev"));

app.use("/images", express.static("images"));

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization,authenticate"
  );
  next();
});


app.post("/sendNotification", async (req, res) => {
    // console.log(req.body)
  const deviceToken = req.body.deviceToken;
  const message = {
    notification: {
      title: req.body.title,
      body: req.body.body,
    },
  };

  await notificationService.sendNotification(deviceToken, message);
  return res.status(200).json( { message: "successfully sent message" });
});

app.listen(8080, () => {
  console.log("port 8080 is running");
});
