import express from 'express';
import "reflect-metadata";
import { AppDataSource } from './data-source';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!")
}).catch((err) => {
    console.error("Error during Data Source initialization", err)
})

app.listen(PORT, () => console.log(`Simple file api running on port ${PORT}`));


module.exports = { app };