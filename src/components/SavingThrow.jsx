// This component renders the saving throw tool

import { useState, useEffect } from "react";
import { joinSpells } from "../API/fetching";
import SingleSpellDetails from "./SingleSpellDetails";

export default function SavingThrow() {
	const [searchParam, setSearchParam] = useState("");
	const [spells, setSpells] = useState([]);
	const [STspells, setSTSpells] = useState([]);
	const [spellsToDisplay, setSpellsToDisplay] = useState([]);

	useEffect(() => {
		async function getAllSpells() {
			console.log("entering getAllSpells");
			const APIResponse = await joinSpells();
			if (APIResponse != []) {
				setSpells(APIResponse);
				await savingThrowSpells(spells);
				console.log("STspells", STspells);
				await savingSpells();
				console.log("spellsToDisplay", spellsToDisplay);
			} else {
				console.error("Unable to fetch all spells");
			}
		}
		getAllSpells();
	}, []);

	async function savingThrowSpells(spells) {
		console.log("entering SavingThrowSpells");
		const objLength = Object.keys(spells).length;
		const dcKey = "dc";
		// console.log("spells in STS", spells);

		try {
			for (let i = 0; i < objLength; i++) {
				if (dcKey in spells[i]) {
					STspells.push(spells[i]);
				}
			}
			setSTSpells(STspells);
			return STspells;
		} catch (error) {
			console.error("Can't make saving throw spells array", error);
		}
	}

	// Allows for search functionality
	// Users can search any keyword in the name

	async function savingSpells() {
		try {
			let savingSpells = searchParam
				? STspells.filter((spell) =>
						spell.name.toLowerCase().includes(searchParam)
				  )
				: STspells;
			setSpellsToDisplay(savingSpells);
			return spellsToDisplay;
		} catch (error) {
			console.error("Can't render saving spells array", error);
		}
	}

	// let spellsToDisplay = searchParam
	// 	? spells.filter((spell) => spell.name.toLowerCase().includes(searchParam))
	// 	: spells;

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
					const spellST = spell;
					return (
						// eslint-disable-next-line react/jsx-key
						<div id="single-spell-card">
							<SingleSpellDetails spellST={spellST} spellIndex={spellIndex} />
						</div>
					);
				})}
			</div>
		</div>
	);
}
