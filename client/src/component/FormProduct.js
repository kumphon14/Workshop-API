import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FormProduct = () => {
    // ที่เก็บข้อมูล แล้วนำไปใส่ในตาราง โดย data จะถูก item รับไปเก็บไว้
    // setData รับค่าจาก loadData
    const [data, setData] = useState([]);

    // เก็บข้อมูล ที่ได้มาจากการกรอกข้อมูล input โดยฟังก์ชัน handleChange เป็นตัวดึงข้อมูลให้
    const [form, setForm] = useState({
        name: '',
        detail: '',
        price: ''
    }); // ค่าตั้งต้นของฟอร์ม

    // ดึงข้อมูล ไปเก็บในฟังก์ชัน useState ชื่อว่า setData
    useEffect(() => {
        loadData();
    }, []);

    // ทำการ GET หรือ load ข้อมูลจาก server ตามที่อยู่ url แล้ว respon ข้อมูลมาแสดงผล
    const loadData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/product');
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // ฟังก์ชันสำหรับรับค่าและเปลี่ยนแปลงการกรอกข้อมูล
    const handleChange = (e) => {
        setForm({
            ...form, // copy ค่าใน useState
            [e.target.name]: e.target.value || '' // นำไปเก็บใน form และ '' คือค่า default
        });
    };

    // ฟังก์ชันสำหรับทำการ POST โดยการกดปุ่ม submit และมีการส่งข้อมูลที่กรอกไปยัง server
    const handleSubmit = async (e) => {
        e.preventDefault(); // ห้าม refresh
        console.log(form); // แสดง form ใน console
        try {
            const res = await axios.post('http://localhost:5000/api/product', form); // ใช้ POST เพื่อเพิ่มข้อมูลใหม่
            console.log(res.data); // แสดงข้อมูลที่ส่งกลับจาก Server
            loadData(); // โหลดข้อมูลใหม่เพื่ออัปเดตใน table
            setForm({ name: '', detail: '', price: '' }); // รีเซ็ต form หลัง submit
        } catch (err) {
            console.log(err);
        }
    };
    
//-------------------------------------------------------------------------------------------------------------//
    
    // ฟังก์ชันสำหรับการ Delete
    const handleRemove = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/product/${id}`); // ลบข้อมูลตาม id
            loadData(); // โหลดข้อมูลใหม่หลังลบ
        } catch (err) {
            console.log(err);
        }
    };




    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={form.name || ''} // เพิ่ม value เพื่อแสดงค่าปัจจุบันใน input และมีการตั้งค่าเริ่มต้น ''
                    onChange={e => handleChange(e)}
                />
                <input
                    type="text"
                    name="detail"
                    placeholder="detail"
                    value={form.detail || ''} // เพิ่ม value เพื่อแสดงค่าปัจจุบันใน input
                    onChange={e => handleChange(e)}
                />
                <input
                    type="text"
                    name="price"
                    placeholder="price"
                    value={form.price || ''} // เพิ่ม value เพื่อแสดงค่าปัจจุบันใน input
                    onChange={e => handleChange(e)}
                />
                <button type="submit">Submit</button> {/* เปลี่ยน onChange เป็น onSubmit */}
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">name</th>
                        <th scope="col">detail</th>
                        <th scope="col">price</th>
                        <th scope="col">action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.map((item, index) => // index เพิ่ม key id
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.detail}</td>
                                <td>{item.price}</td>
                                <td><button onClick={() => handleRemove(item._id)}>Delete</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default FormProduct;
