// Routes/product.js
const express = require('express')
const router = express.Router();

//Controllers
const {
    create, 
    list, 
    read, 
    update, 
    remove}= require('../Controllers/product')

router.post('/product',create)//ส่งข้อมูลจากหน้าบ้าน มาไว้หลังบ้านบันทึก
router.get('/product',list) //ดึงข้อมูลมาแสดงทั้งหมด
router.get('/product/:id',read) //ดึงข้อมูลสินค้านั้นๆมาแสดง
router.put('/product/:id',update)
router.delete('/product/:id',remove)
  

module.exports = router

