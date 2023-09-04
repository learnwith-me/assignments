import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./section/Home";

function App() {

	return ( 
			<Routes>
				<Route path="/" exact element={<Home />} />
			</Routes>
	);
}

export default App;