import express from "express";
import commentRoute from "./routes/comment.route.js";
import cors from "cors";
const app = express();

const PORT = 8002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.post("/events", (req, res) => {
 
  console.log(`We recieved ${req.body.type}`);
  return res.status(200).json({});
});

app.use("/api/v1/snippets", commentRoute);

app.listen(PORT, () => {
  console.log(`Comments server listen at port ${PORT}`);
});
