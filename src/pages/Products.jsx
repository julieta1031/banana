import React, { useEffect, useState } from 'react';
import axios from "axios";

const Products = () => {
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [draggedItem, setDraggedItem] = useState(null);
    console.log(data)
    const getPost = async () => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts/");
            setData(response.data);
            setOriginalData(response.data); // Պահպանում ենք սկզբնական տվյալները
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        getPost();
    }, []);

    const handleDragStart = (index) => {
        setDraggedItem(index);
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Անհրաժեշտ է թույլ տալ տարրի տեղափոխումը
    };

    const handleDrop = (index) => {
        const items = [...data];
        const dragged = items[draggedItem];
        items.splice(draggedItem, 1);
        items.splice(index, 0, dragged);
        setData(items);
        setDraggedItem(null);
    };

    const resetOrder = () => {
        setData(originalData); // Վերականգնում ենք սկզբնական տվյալները
    };

    return (
        <div>
            <h1>Drag and Drop</h1>
            <div className="flex justify-center text-center">
                <button
                    onClick={resetOrder}
                    style={{
                        marginBottom: "20px",
                        padding: "10px 20px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    Reset Order
                </button>
            </div>
            <div className="flex justify-center text-center">
                <ul>
                    {data.map((p, index) => (
                        <li
                            key={p.id}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(index)}
                            style={{
                                cursor: "move",
                                padding: "10px",
                                border: "2px solid #ccc",
                                marginBottom: "5px",
                                backgroundColor: "#f9f9f9"
                            }}
                        >
                            <span>{p.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Products;
