// src/components/Player.js
import React from 'react';
import './Player.css';




const Player = ({ name, position, number, image }) => {
    // if()
    return (
        <div className="player-card relative">


            <img src={image} alt={`${name}`} className="player-image "/>
            <div className="player-info ">
                <h3>Name:{name}</h3>
                <p>Position: {position}</p>
                <p>Number: {number}</p>
            </div>
        </div>
    );
};

export default Player;