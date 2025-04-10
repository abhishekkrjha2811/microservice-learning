import express from "express";
import snippetRoute from "./routes/snippet.route.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:"http://localhost:5173"
}))

const PORT = 8001;

app.post("/events", (req,res) => {
  console.log(`We recieved ${req.body.type}`);
  return res.status(200).json({});
})

app.use("/api/v1/snippets", snippetRoute);

app.listen(PORT, () => {
  console.log(`Snippets server listen at port ${PORT}`);
});
