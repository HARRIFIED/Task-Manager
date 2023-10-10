import { Routes, Route, } from 'react-router-dom';
import Signup from './pages/Signup'
import Login from './pages/Login'

function Navs() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
        </Routes>
    );
}

export default Navs;
