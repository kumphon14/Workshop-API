// Controllers/product.js

// Model
const Products = require('../Models/Product')

// Controllers CRUD
// create,list,read,update,remove เป็น prop สำหรับส่งค่าออก

//ฟังก์ชัน exports.create เป็นส่วนหนึ่งของ Controller ซึ่งเป็นการจัดการ CRUD (Create, Read, Update, Delete) บนฐานข้อมูล ใช้สำหรับสร้างข้อมูลใหม่ใน MongoDB
exports.create = async(req,res)=>{
    try{
        console.log(req.body) // อ่านข้อมูลจาก req.body ซึ่งส่งมาจาก Client (เช่น Postman)
        const newProducts = await new Products(req.body).save() // ใช้ .save() เพื่อบันทึกข้อมูลลงใน MongoDB
        res.json(newProducts) // ส่งผลลัพธ์กลับไปยัง Client
        console.log(newProducts)
    }catch(err){
        console.log(err)
        res.status(404).send("Server Create Error")
    }
} 

//ฟังก์ชัน exports.list ใช้ดึงรายการข้อมูลสินค้าทั้งหมดจากฐานข้อมูล MongoDB โดยใช้ Mongoose Model (Products) และส่งผลลัพธ์กลับไปยัง Client
exports.list = async(req,res)=>{
    try{
        const listProduct = await Products.find({}).exec() // Products.find({}): คำสั่งนี้ใช้ดึงข้อมูลสินค้าทั้งหมดจากฐานข้อมูล MongoDB // {} ระบุเงื่อนไขการค้นหา
        res.json(listProduct)
    }catch(err){
        console.log(err)
        res.status(404).send("Server list Error")
    }
} 
//ฟังก์ชัน exports.read ใช้ดึงข้อมูลสินค้าแค่ id เดียว จากฐานข้อมูล MongoDB โดยใช้ Mongoose Model (Products) และส่งผลลัพธ์กลับไปยัง Client
exports.read = async(req,res)=>{
    try{
        console.log(req.params.id)
        const id = req.params.id
        const readProduct = await Products.findOne({_id: id}).exec()
        res.json(readProduct)
    } catch(err){
        console.log(err)
        res.status(404).send("Server list Error")
    }
} 

exports.update = async (req, res) => {
    try {
        const id = req.params.id; // ดึง id จาก params
        const updateData = req.body; // ดึงข้อมูลจาก body

        // ใช้ findOneAndUpdate เพื่ออัปเดตข้อมูลสินค้า
        const updateProduct = await Products.findOneAndUpdate(
            { _id: id }, // เงื่อนไขการค้นหา
            updateData,  // ข้อมูลที่ต้องการอัปเดต
            { new: true } // ส่งคืนข้อมูลใหม่หลังอัปเดต
        );

        // หากไม่พบสินค้า
        if (!updateProduct) {
            return res.status(404).send("Product not found");
        }

        // ส่งข้อมูลสินค้าใหม่กลับไปยัง client
        res.json(updateProduct);
    } catch (err) {
        console.log(`Error updating product: ${err.message}`);
        res.status(500).send("Server error while updating product");
    }
};

exports.remove = async(req,res)=>{
    try{
        const id = req.params.id
        const deleteProduct = await Products
            .findByIdAndDelete({_id: id}).exec()
        res.send("Delete Success")

    }catch(err){
        res.status(500).send("Server error Delete product");
    }
} 

