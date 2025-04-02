import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Nav from "../Components/Nav";
import "./App.css";
import Login from "../Auth/Login";

function App() {
	return (
		<>
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</>
	);
}

export default App;
