// This component renders the saving throw tool

import { useState, useEffect } from "react";
import { joinSpells } from "../API/fetching";
import SingleSpellDetails from "./SingleSpellDetails";

export default function SavingThrow() {
	const [searchParam, setSearchParam] = useState("");
	const [spells, setSpells] = useState([]);
	const STspells = [];

	useEffect(() => {
		async function getAllSpells() {
			const APIResponse = await joinSpells();
			if (APIResponse != []) {
				setSpells(APIResponse);
				await savingThrowSpells(spells);
				console.log("STspells", STspells);
			} else {
				console.error("Unable to fetch all spells");
			}
		}
		getAllSpells();
	}, []);

	async function savingThrowSpells(spells) {
		const objLength = Object.keys(spells).length;
		const dcKey = "dc";
		// console.log("spells in STS", spells);

		try {
			for (let i = 0; i < objLength; i++) {
				if (dcKey in spells[i]) {
					STspells.push(spells[i]);
				}
			}
			return STspells;
		} catch (error) {
			console.error("Can't make saving throw spells array", error);
		}
	}

	// Allows for search functionality
	// Users can search any keyword in the name or description
	let spellsToDisplay = searchParam
		? spells.filter(
				(spell) =>
					spell.name.toLowerCase().includes(searchParam) ||
					JSON.stringify(spell.desc).toLowerCase().includes(searchParam)
		  )
		: spells;

	// Filter by spell level

	// Filter by school of magic

	// Filter by saving throw type

	// Filter by class

	// Filter by subclass

	// Filter by components

	// Checkbox for concentration required?

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
			<div id="all-spell-cards-container">
				{spellsToDisplay.map((spell) => {
					const spellIndex = spell.index;
					return (
						// eslint-disable-next-line react/jsx-key
						<div id="single-spell-card">
							<SingleSpellDetails spells={spells} spellIndex={spellIndex} />
						</div>
					);
				})}
			</div>
		</div>
	);
}
