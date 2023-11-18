import express from 'express';

const app = express();
const port = Number(process.env.PORT) || 7000

app.use(express.json());






app.listen(port, () => console.log(`listening on port ${port}`));