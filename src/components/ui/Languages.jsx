import React from 'react';
import i18next from "i18next";
import {useTranslation} from "react-i18next";


export const languages = [
    {id: 1, language: 'Armenian', slug: 'am'},
    {id: 2, language: 'English', slug: 'en'},
    {id: 3, language: 'Russian', slug: 'ru'}

]

const Languages = () => {
    const {t} = useTranslation()
    return (
        <div>
            <ul className=" flex gap-4">
                {
                    languages.map(lng => {
                        return <li
                            key={lng.id}
                            className="cursor-pointer border-amber-400 text-decoration-color: #cbd5e1;
"
                            onClick={() => i18next.changeLanguage(lng.slug)}
                        >   <div className=' border border-2  '>
                            {t(lng.language.toLowerCase())}
                        </div>

                        </li>
                    })
                }
            </ul>
        </div>
    );
};

export default Languages;