import express from "express";
import mongoose from "mongoose";
import { router as Router } from "./routes/router.js";

const app = express();
const port = Number(process.env.PORT) || 7000;

app.use(express.json());

// routes
app.use("/farmers", Router);


// mongoDB connection
mongoose
  .connect(process.env.MongoURI)
  .then(() => console.log("Database connection established"))
  .catch((error) => console.log(error.message));


app.listen(port, () => console.log(`listening on port ${port}`));
