import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addToCard, changeCountInCard, getFruits, getFruitsFromCard} from "../redux/slices/fruitSlice";
import { SlBasketLoaded } from "react-icons/sl";


const Home = () => {

    const dispatch = useDispatch()
    const {fruits, card} = useSelector(state => state.fruitReducer)

    const [count, setCount] = useState({})

    useEffect(() => {
        dispatch(getFruits())
        dispatch(getFruitsFromCard())
    }, [])
    console.log(card)
    return (
        <div>
            <ul className="w-1/3">
                {
                    fruits.map(({id, name}) => {
                        return <li key={id} className="grid grid-cols-5 justify-items-center">
                            {name}

                            <button
                                onClick={() => {
                                    setCount(prevState => ({
                                        ...prevState,
                                        [id]: count[id] ? count[id] - 1 : 1
                                    }))
                                }}
                            >
                                -
                            </button>

                            {count[id] ? count[id] : 1}

                            <button
                                onClick={() => {
                                    setCount(prevState => ({
                                        ...prevState,
                                        [id]: count[id] ? count[id] + 1 : 2
                                    }))
                                }}
                            >
                                +
                            </button>

                            <div
                                className="cursor-pointer"
                                onClick={() => {
                                    const fruit = card.find(f => f.fruitId === id)
                                    console.log(fruit)
                                    if(fruit){
                                        dispatch(changeCountInCard({
                                            id: fruit.id,
                                            count: count[id] + fruit.count
                                        }))
                                    } else {
                                        dispatch(addToCard({
                                            fruitId: id,
                                            name,
                                            count: count[id]
                                        }))
                                    }
                                }}
                            >
                                <SlBasketLoaded />
                            </div>
                        </li>
                    })
                }
            </ul>
        </div>
    );
};

export default Home;