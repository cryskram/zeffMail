const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/views.routes"));
app.use("/api", require("./routes/api.routes"));

app.listen(PORT, () => {
  console.log("[APP]... Server is running Successfully 🙌");
});
