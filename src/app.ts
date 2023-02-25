import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import cors from 'cors';
import path from "path";
import {rootRouter} from "./routers/root.router";
import {errorHandler} from "./middlewares/errorHandler";

const app = express();
const PORT = process.env.PORT || 8888;

app.use(cors({
    credentials: true,
    origin: process.env.NODE_ENV === "production"
        ? [
            process.env.CLIENT_URL_PRODUCTION as string,
        ]
        : [process.env.CLIENT_URL_DEVELOPMENT as string]
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(`/${process.env.API_PREFIX}`, rootRouter);
app.use("/api2", express.static(path.resolve(__dirname, '../src/static')) );
app.use(errorHandler);

const start = async () => {
    try {
        if (process.env.NODE_ENV === "production") {
            app.listen(PORT as number, "localhost", () => console.log(`Server start on PORT = ${PORT}`));
        } else {
            app.listen(PORT as number, () => console.log(`Server start on PORT = ${PORT}`));
        }
    } catch (e: any) {
        console.error('Server error', e.message);
        process.exit(1);
    }
};
start();
