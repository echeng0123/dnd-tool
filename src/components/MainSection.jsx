// This holds the main content for the site

import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import SavingThrow from "./SavingThrow";

export default function MainSection() {
	return (
		<div id="main-section-container">
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/saving-throw" element={<SavingThrow />} />
			</Routes>
		</div>
	);
}
