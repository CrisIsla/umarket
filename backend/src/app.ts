import cookieParser from "cookie-parser";
import express from "express";
import { authErrorHandler } from "./utils/authMiddleware";
import cors from "cors";
const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

/* Se encarga del almacenamiento de archivos */
import multer from "multer";
const upload = multer({ 
    dest: 'uploads/', 
    limits: {
        fileSize: 5 * 1024 * 1024,
    } 
})

app.post('/products', upload.array('images'), (req, res)=>{
    console.log('body', req.body)
    console.log('Archivos:', req.files)
})  
app.use(authErrorHandler);
export default app;