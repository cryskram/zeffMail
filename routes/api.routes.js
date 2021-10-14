const router = require("express").Router();
const nodemailer = require("nodemailer");

router.get("/sample", (req, res) => {
  res.status(200).json({
    email: "myemail.id@gmail.com",
    pwd: "my_secret",
    from: "zeffMail.co",
    to: "someone@gmail.com",
    subject: "Hello World",
    content: "Hi buddy! This is the content you want to send to the recivier",
    html: "<h1>This Is An Optional Field</h1>",
  });
});

router.get("/new", (req, res) => {
  res.status(200).json({
    message:
      "This is a POST Route. Please Make A POST Request In The Following Format To This URL",
    format: {
      email: "myemail.id@gmail.com",
      pwd: "my_secret",
      from: "zeffMail.co",
      to: "someone@gmail.com",
      subject: "Hello World",
      content: "Hi buddy! This is the content you want to send to the recivier",
      html: "<h1>This Is An Optional Field</h1>",
    },
  });
});

router.post("/new", (req, res) => {
  const { email, pwd, from, to, subject, content, html } = req.body;

  if (!email || !pwd || !from || !to || !subject || !content) {
    return res.status(400).json({ message: "Required Fields Are Missing" });
  } else {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: pwd,
      },
    });

    const context = {
      from: `"${from}" ${email}`,
      to: to,
      subject: subject,
      text: content,
    };

    transporter.sendMail(context, (err, success) => {
      if (err) {
        return res.status(406).json({ message: `Error Occured: ${err}` });
      } else {
        return res.status(200).json({ message: "Email was sent Successfully" });
      }
    });
  }
});

module.exports = router;
