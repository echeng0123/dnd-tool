// This component renders the saving throw tool

import { useState, useEffect } from "react";
import { joinSpells } from "../API/fetching";

export default function SavingThrow() {
	const [searchParam, setSearchParam] = useState("");
	const [spells, setSpells] = useState([]);

	useEffect(() => {
		async function getAllSpells() {
			const APIResponse = await joinSpells();
			console.log("APIResponse", APIResponse);
			// setSpells(APIResponse.results);
		}
		getAllSpells();
	}, []);

	// console.log("spells from ST", spells);

	return (
		<div id="saving-throw-container">
			<h1>SAVING THROW TOOL</h1>
			<h3>Spells Requiring Saving Throws</h3>
			<div id="search-container">
				<label id="search-label">
					Search:{" "}
					<input
						id="search-instr-bar"
						type="text"
						placeholder="Search spells requiring a saving throw"
						onChange={(event) =>
							setSearchParam(event.target.value.toLowerCase())
						}
					/>
				</label>
			</div>
		</div>
	);
}
