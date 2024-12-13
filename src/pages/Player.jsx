import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

const Player = () => {
    const [data,setData] = useState(null)
    const {id} = useParams()
    const getPlayers = async () =>{
        try {
            const response = await axios.get(`http://localhost:5000/players/${id}`)
            setData( response.data)
        }catch (err){
            console.log(err.message)
        }
    }
    useEffect(() => {
        getPlayers()
    }, []);
    return (
        <div>
            {data && data.name}
        </div>
    );
};

export default Player;