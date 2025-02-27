import express from "express"
import commentRouter from "./routes/comment.js";
import cors from "cors";

const app = express();
const PORT=9000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"http://localhost:5173"
}));

app.use("/api/v1/snippet",commentRouter);
 
"http://localhost:9000/api/v1/snippet/:id/comment"


app.listen(PORT,()=>{
    console.log(`server listen at port ${PORT}`)
});