const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { connectDB } = require("./database/connect");

// route
const userRoutes = require("./routes/user.route");
const serviceRoutes = require('./routes/service.route');

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});
app.use("/api/auth", userRoutes);
app.use('/api/services', serviceRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
