import Register from '../../pages/Register/Register'
import Login from '../../pages/Login/Login'
import Collection from '../../pages/Collection/Collection'
import Item from '../../pages/Item/Item'
import UserCollections from '../../pages/UserCollections/UserCollections';
import style from "./style/AppRouter.module.sass";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation'

function AppRouter() {
    return (
        <BrowserRouter>
            <div className={style.wrapper}>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/register" />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/UsersCollections" element={<UserCollections />} />
                    <Route path="/collection/:id" element={<Collection />} />
                    <Route path="/collection/:id/items/:itemId" element={<Item/>} />
                </Routes>
                <Navigation />
            </div>
        </BrowserRouter>
    );
}

export default AppRouter;