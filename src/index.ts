import express, { NextFunction, Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { NotFoundException } from './errors/notfound.exception';
import apiRouter from './route';

const app = express();
app.use(express.json());

// Import all routes
app.use('/api', apiRouter)

const PORT = process.env.PORT || 3000;

// Global handler for errors
app.use(
    (
        error: Error | NotFoundException,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        console.log();
        if (error instanceof NotFoundException) {
            return res.status(error.errorCode).send({ status: 'error', message: error.message });
        } else if (error instanceof SyntaxError && 'body' in error) {
            return res.status(400).send({ status: 'error', message: 'Invalid JSON' });
        }

        console.error(error);
        res.status(500).json({ status: 500, message: error.message });
        next();
    },
);
app.listen(PORT, () => console.log(`Simple file api running on port ${PORT}`));

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!")
}).catch((err) => {
    console.error("Error during Data Source initialization", err)
})

module.exports = { app };