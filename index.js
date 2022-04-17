const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

// imprt route
const projectRoutes = require("./routes/Project");
const authRoutes = require("./routes/user");
// middleware
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

//route middleware
// htpp://localhost:4000/
app.use("/api/projects", projectRoutes);
app.use("/api/users", authRoutes);
// will listen on 4000
app.listen(4000, () => {
  console.log("Server up and running on 4000 !! OK OK");
});

//connect to database
mongoose
  .connect("mongodb://localhost:27017/proman", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("proman database connected"))
  .catch((err) => console.log(err));
