import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
    const [value, setValue] = useState([]); // สร้าง State สำหรับเก็บข้อมูลสินค้า

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        axios.get("http://localhost:5000/api/product")
            .then((res) => {
                console.log('res', res.data);
                setValue(res.data); // เก็บข้อมูลใน State
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {value.map((product, index) => (
                    <div
                        key={index}
                        className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
                    >
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p className="text-gray-700 mt-2">{product.detail}</p>
                        <p className="text-blue-500 font-bold mt-4">Price: ${product.price}</p>
                        <hr></hr>
                    </div>
                    
                ))}
            </div>
        </div>
    );
};

export default Products;
