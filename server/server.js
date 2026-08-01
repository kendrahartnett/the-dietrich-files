import "dotenv/config"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
  res.send("The Dietrich Files API is running...");
});



app.all("/", (req, res) => {
  res.status(404).json({
    success: false,
    data: "404",
  })
})


// try {
//   const mongoURL = process.env.MONGODB_URL || ""
//   await mongoose.connect(mongoURL)
//   console.log(`Dietrich connected to database ${mongoURL}`)

//   app.listen(port, () => {
//     console.log(`Dietrich listening on port ${port}`)
//   })
// } catch (err) {
//   console.log(err)
// }




app.listen(PORT, () => {
  console.log(`Dietrich Server listening on port ${PORT}`);
});