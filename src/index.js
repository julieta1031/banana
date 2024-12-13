import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {Provider} from "react-redux";
import store from "./redux/store"
import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import I18NextHttpBackend from "i18next-http-backend";

i18next
    .use(initReactI18next)
    .use(I18nextBrowserLanguageDetector)
    .use(I18NextHttpBackend)
    .init({
        supportedLngs: ['am', 'en', 'ru', 'de'],
        fallbackLng: 'am',
        backend: {
            loadPath: '/locales/{{lng}}/translation.json'
        },
        // resources: {
        //     am: {
        //         translation: {
        //             "search": "Որոնել"
        //         }
        //     },
        //     en: {
        //         translation: {
        //             "search": "Search"
        //         }
        //     },
        //     ru: {
        //         translation: {
        //             "search": "Поиск"
        //         }
        //     }
        // }
    })
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
            <Provider store={store}>
                <App />
                <ToastContainer />
            </Provider>


    </BrowserRouter>
);

