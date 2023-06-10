import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import bodyParser from 'body-parser';

import * as userRoutes from './routes/user';

const app = express();
const port = process.env.PORT || 5050;
const mongoDbUrl = process.env.MONGODB_URL || "";
if (mongoDbUrl === "") {
    throw new Error("Failed to get mongoDb url");
}

app.use(bodyParser.json());

app.use('/user', userRoutes.router);

app.get('/', (req, res, next) => {
    res.send("Hello, world!");
});

// app.use((error: any, req: any, res: any) => {
//     console.log(error);
//     if(error.statusCode) {
//         res.status(error.statusCode).json({ message: error.message });
//     } else {
//         res.status(500).json({ message: error.message });
//     }
// })

mongoose.set('strictQuery', false);
mongoose.connect(mongoDbUrl).then((result) => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}).catch((err) => console.log(err));