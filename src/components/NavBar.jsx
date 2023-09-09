// This component renders the navigation bar

import { Link } from "react-router-dom";

export default function NavBar() {
	return (
		<div id="navbar-container">
			<Link to="/home">Home</Link>
			<Link to="/saving-throw">Saving Throw Tool</Link>
		</div>
	);
}
