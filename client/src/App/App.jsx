import { Routes, Route } from "react-router-dom";
import Home from "../Routes/Home";
import Nav from "../Components/Nav";
import Editor from "../Routes/Editor";
import Login from "../Routes/Login";
import "./App.css";

function App() {
	return (
		<>
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/editor/:itemId" element={<Editor />} />
			</Routes>
		</>
	);
}

export default App;
