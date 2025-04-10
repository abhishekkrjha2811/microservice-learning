import axios from "axios";
import express from "express";

const app = express();
const PORT = 8005;

app.use(express.json());

app.post("/events", (req, res) => {
  const events = req.body;
 
  axios.post("http://localhost:8001/events", events); // snippets
  axios.post("http://localhost:8002/events", events); // comments
  axios.post("http://localhost:8003/events", events); // query service
  
  return res.status(200).json({});
});

app.listen(PORT, () => {
  console.log(`Message broker server listen at port ${PORT}`);
});
