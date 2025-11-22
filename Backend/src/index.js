import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"

import dotenv from "dotenv"
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser";
import { app, server } from "./lib/socket.js"


dotenv.config()

const port = process.env.PORT




app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser());

 connectDB()

app.use(cors({

  origin: "http://localhost:5173" ,

  credentials: true
}))



app.use("/api/auth", authRoutes)

app.use("/api/messages", messageRoutes)


app.use("/", (req, res) => {
  res.json({ message: "Welcome to the API" })
})  




server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)

  
  connectDB()
})
