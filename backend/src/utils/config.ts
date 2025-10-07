import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const HOST = process.env.HOST || "localhost";


const JWT_SECRET = process.env.JWT_SECRET || "my_secret"

export default { PORT, HOST, JWT_SECRET };