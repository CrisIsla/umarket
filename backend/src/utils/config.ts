import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const HOST = process.env.HOST || "localhost";

const MONGODB_DBNAME = process.env.DB_NAME;

const MONGODB_URI = process.env.MONGODB_URI;

const JWT_SECRET = process.env.JWT_SECRET || "my_secret"

export default { PORT, HOST, MONGODB_DBNAME, MONGODB_URI,JWT_SECRET };