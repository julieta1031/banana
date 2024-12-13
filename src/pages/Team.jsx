import React, { useState, useEffect } from 'react';
import Player from '../Player';
import './Team.css';
import axios from "axios";
import ImageUploader from "../components/ui/imageUploader";

import {t} from "i18next";
import { useTranslation } from "react-i18next";
import {Link} from "react-router-dom";

function Li(props) {
    return null;
}

const Team = () => {
    const [players, setPlayers] = useState([]);
    const [deletedPlayers, setDeletedPlayers] = useState([]);
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [number, setNumber] = useState('');
    const [image, setImage] = useState('');
    const [query, setQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const {t} = useTranslation()
    useEffect(() => {



        const fetchData = async () => {
            try {
                const playersResponse = await axios.get('http://localhost:5000/players');
                const deletedPlayersResponse = await axios.get('http://localhost:5000/deletedPlayers');
                setPlayers(playersResponse.data);
                setDeletedPlayers(deletedPlayersResponse.data);
            } catch (e) {
                console.error("Error fetching data:", e.message);
            }
        };
        fetchData();
    }, []);

    const playerAdd = async () => {
        const newPlayer = {
            id: Date.now().toString(),
            name,
            position,
            number,
            image,
        };

        try {
            const response = await axios.post('http://localhost:5000/players', newPlayer);
            setPlayers([...players, response.data]);
        } catch (error) {
            console.error("Error adding player:", error.message);
        }

        setName('');
        setPosition('');
        setNumber('');
        setImage('');
    };

    const deletePlayer = async (id) => {
        // Find player by ID in the players list
        const playerToDelete = players.find(player => player.id === id);

        if (!playerToDelete) {
            console.error("Player not found in players list.");
            return;
        }

        // Move player to deletedPlayers list (soft delete)
        try {
            await axios.post('http://localhost:5000/deletedPlayers', playerToDelete);
            await axios.delete(`http://localhost:5000/players/${id}`);

            setPlayers(players.filter(player => player.id !== id));
            setDeletedPlayers([...deletedPlayers, playerToDelete]);
        } catch (error) {
            console.error("Error deleting player:", error.message);
        }
    };

    const permanentlyDelete = async (id) => {
        // Find the player in the deletedPlayers list by ID
        const playerToDelete = deletedPlayers.find(player => player.id === id);
        if (!playerToDelete) {
            console.error("Player not found in deletedPlayers list.");
            return;
        }

        try {
            // Permanently delete the player from both the deletedPlayers and players list
            await axios.delete(`http://localhost:5000/deletedPlayers/${id}`);

            setDeletedPlayers(deletedPlayers.filter(player => player.id !== id));
            console.log(`Player with ID ${id} permanently deleted.`);
        } catch (error) {
            console.error("Error permanently deleting player:", error.message);
        }
    };

    const restorePlayer = async (id) => {
        const playerToRestore = deletedPlayers.find(player => player.id === id);

        if (!playerToRestore) return;

        try {
            // Restore player to players list
            await axios.post('http://localhost:5000/players', playerToRestore);
            await axios.delete(`http://localhost:5000/deletedPlayers/${id}`);

            setPlayers([...players, playerToRestore]);
            setDeletedPlayers(deletedPlayers.filter(player => player.id !== id));
        } catch (e) {
            console.error("Error restoring player:", e.message);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPlayer(null);
    };

    const filteredPlayers = players.filter(player =>
        player.name.toLowerCase().includes(query.toLowerCase())
    );

    const filteredDeletedPlayers = deletedPlayers.filter(player =>
        player.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="team-container">
            <h2>{t("Real Madrid Squad")}</h2>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by Player Name"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
            </div>

            <div className="add-player-form">
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text"
                    placeholder="Player Name"
                />
                <input
                    value={position}
                    onChange={e => setPosition(e.target.value)}
                    name="position"
                    type="text"
                    placeholder="Player Position"
                />
                <input
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                    name="number"
                    type="text"
                    placeholder="Player Number"
                />
                <ImageUploader
                    images={image ? [image] : []}
                    setImages={(images) => setImage(images[0]?.data_url || '')}
                />
                <button
                    onClick={playerAdd}
                    type="submit"
                    className="border border-black rounded-xl w-[150px] bg-red-600 hover:text-white"
                >
                    {t('Add')}
                </button>
            </div>

            <div className="players-grid">
                {filteredPlayers.length > 0 ? (
                    filteredPlayers.map((player) => (
                        <div
                            key={player.id}
                            className="player-card"
                            onClick={() => {
                                setSelectedPlayer(player);
                                setIsModalOpen(true);
                            }}
                        >
                            <Player
                                name={player.name}
                                position={player.position}
                                number={player.number}
                                image={player.image}
                            />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deletePlayer(player.id);
                                }}
                                className="delete-btn"
                            >
                                X
                            </button>
                            <Link
                                className="moreBtn"
                                to={`/team/${player.id}`}>
                                see more
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No players found</p>
                )}
            </div>

            {isModalOpen && selectedPlayer && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Player Details</h3>
                        <p><strong>Name:</strong> {selectedPlayer.name}</p>
                        <p><strong>Position:</strong> {selectedPlayer.position}</p>
                        <p><strong>Number:</strong> {selectedPlayer.number}</p>
                        {selectedPlayer.image && <img src={selectedPlayer.image} alt={selectedPlayer.name} />}
                        <button
                            onClick={closeModal}
                            className="close-btn"
                        >
                            Close
                        </button>

                    </div>
                </div>
            )}

            <h2>{t("Deleted Players")}</h2>
            <div className="deleted-players flex">
                {filteredDeletedPlayers.length > 0 ? (
                    filteredDeletedPlayers.map((player) => (
                        <div key={`${player.id}-${player.name}`} className="player-card">
                            <Player
                                name={player.name}
                                position={player.position}
                                number={player.number}
                                image={player.image}
                            />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    restorePlayer(player.id);
                                }}
                                className="restore-btn"
                            >
                                {t("Restore")}
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    permanentlyDelete(player.id);
                                }}
                                className="permanent-delete-btn"
                            >
                                Delete Permanently
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No deleted players found</p>
                )}
            </div>
        </div>
    );
};

export default Team;
