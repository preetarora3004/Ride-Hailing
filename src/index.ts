import express from "express";
import "dotenv/config";
import routes from "./routes/route"

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use("/api/v1", routes)

try {
    app.listen(PORT, () => {
        console.log(`App is listening on the ${PORT}`);
    });
} catch {
    console.log(`Unable to connect to server`);
    process.exit(1);
}
