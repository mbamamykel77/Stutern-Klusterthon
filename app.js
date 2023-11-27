import express from "express";
import mongoose from "mongoose";
import { router as Router } from "./routes/router.js";
import cors from "cors"

const app = express();
const port = Number(process.env.PORT) || 7000;

app.use(express.json());
app.use(cors());


// routes
app.get('/', (req, res) => {
  res.send('Welcome to the stuterm farm application!');
});

app.use("/farmers", Router);

// Use CORS middleware with multiple allowed origins
// app.use(cors({
//   origin: ['https://stuternfarm.vercel.app', 'http://localhost:3000'],
//   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//   credentials: true,
// }));

// mongoDB connection
mongoose
  .connect(process.env.MongoURI)
  .then(() => console.log("Database connection established"))
  .catch((error) => console.log(error.message));
  console.log(process.env.MongoURI)



app.listen(port, () => console.log(`listening on port ${port}`));
