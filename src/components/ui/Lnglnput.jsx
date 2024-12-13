import React from 'react';
import {languages} from "./Languages";

const LngInput = () => {



    return (
        <div>


            <input type="text"
                   className="border border-amber-800"
            />
            <div>
                <ul>
                    {languages.map(lng =>{
                        return <li key={lng.id} className='bg-red-600-color'>
                            {lng.slug}
                        </li>
                    })}
                </ul>

            </div>
        </div>
    );
};

export default LngInput;