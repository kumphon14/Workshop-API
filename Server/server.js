//server.js
const express = require('express')
const mongoose = require('mongoose')
const {readdirSync} = require('fs')
const fs = require('fs');
const path = require('path');
const connectDB = require('./Config/db')

// Middleware
const morgan =require('morgan')
const bodyParser = require('body-parser')
const cors =require('cors')

// app
const app = express();

// db
connectDB()

// morgan Middleware
app.use(morgan("dev"))//เพิ่ม middleware สำหรับการล็อกข้อมูลการใช้งาน HTTP request ในแอปพลิเคชันของคุณ โดยใช้ Morgan ซึ่งเป็นไลบรารียอดนิยมสำหรับการบันทึก log ใน Express.js
app.use(bodyParser.json({limit:"10mb"}))
app.use(cors()); // เพิ่ม middleware สำหรับจัดการ CORS

// Route หลัก
// app.get('/resister',(req,res)=>{
//     console.log("Hello World")
//     res.send("Hello Resister")
// })

// Route สำหรับค้นหาไฟล์
fs.readdirSync('./Routes')
.filter((file) => file.endsWith('.js'))
.forEach((file) => {
  const routePath = path.join(__dirname, 'Routes', file); // สร้างเส้นทางสัมบูรณ์
  app.use('/api', require(routePath));
});
// file คือ parameter ที่รับค่าจากการอ่านไฟล์ในโฟลเดอร์ Routes เช่น file = product.js

app.listen(5000,()=>console.log('Server is running on port 5000'))