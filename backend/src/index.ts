import express, {
    ErrorRequestHandler,
    Express,
    Request,
    Response,
    json,
} from "express";
import dotenv from "dotenv";
import { createReadStream, createWriteStream } from "fs";
import csvParser from "csv-parser";
import cors from "cors";

const csvFilePath = "db/users.csv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.post("/api/files", (req: Request, res: Response) => {
    if (!req.body || !req.body.file)
        return res.status(400).json({ message: "Error: no file given." });

    const input = req.body.file;
    const writableStream = createWriteStream(csvFilePath, { flags: 'a' });
    
    writableStream.write(input);
    writableStream.end();

    return res.status(200).json({ message: "Content loaded successfully." });
});

app.get("/api/users", (req: Request, res: Response) => {
    const results: any[] = [];

    createReadStream(csvFilePath)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            return res.status(200).json({ data: results });
        })
        .on('error', () => {
            return res.status(500).json({ message: "Cannot read from database." });
        });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
