import { Navigate, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from "./pages/Home";
import store from './redux/store';
import { Provider as StateProvider } from 'react-redux';
import { useSelector } from 'react-redux';



const Navs = () => {
  const { currentUser } = useSelector(state => state.auth)
  console.log("user", currentUser)
  if (!currentUser) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  } else {
    return (
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    )
  }
}

function App() {
  return (
    <StateProvider store={store}>
      <Navs />
    </StateProvider>
  );
}

export default App;
