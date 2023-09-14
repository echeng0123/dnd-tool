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
			console.log("APIResponse in ST", APIResponse);
			if (APIResponse != []) {
				setSpells(APIResponse);
				console.log("spells is now ", spells);
				await savingThrowSpells(spells);
				console.log("STspells", STspells);
				await savingSpells();
				console.log("spellsToDisplay", spellsToDisplay);
			} else {
				console.error("Unable to fetch all spells");
			}
		}
		getAllSpells();
	}, [STspells]);

	async function savingThrowSpells(spells) {
		const objLength = Object.keys(spells).length;
		const dcKey = "dc";

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

	async function savingSpells() {
		console.log("entering savingSpells");
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

	// Allows for search functionality
	// Users can search any keyword in the name
	async function searchSpells(spells) {
		let spellsToDisplaySearch = searchParam
			? spells.filter((spell) => spell.name.toLowerCase().includes(searchParam))
			: spells;
		setSpellsToDisplay(spellsToDisplaySearch);
		return spellsToDisplay;
	}

	// Filter by saving throw type
	async function savingThrowFilter(stat) {
		console.log("stat is ", stat.target.innerHTML);
		if (stat.target.innerHTML == "STR") {
			const filteredSpells = STspells.filter(
				(spell) => spell.dc.dc_type.index == "str"
			);
			setSpellsToDisplay(filteredSpells);
		} else if (stat.target.innerHTML == "DEX") {
			const filteredSpells = STspells.filter(
				(spell) => spell.dc.dc_type.index === "dex"
			);
			setSpellsToDisplay(filteredSpells);
		} else if (stat.target.innerHTML == "CON") {
			const filteredSpells = STspells.filter(
				(spell) => spell.dc.dc_type.index == "con"
			);
			setSpellsToDisplay(filteredSpells);
		} else if (stat.target.innerHTML == "INT") {
			const filteredSpells = STspells.filter(
				(spell) => spell.dc.dc_type.index == "int"
			);
			setSpellsToDisplay(filteredSpells);
		} else if (stat.target.innerHTML == "WIS") {
			const filteredSpells = STspells.filter(
				(spell) => spell.dc.dc_type.index == "wis"
			);
			setSpellsToDisplay(filteredSpells);
		} else if (stat.target.innerHTML == "CHA") {
			const filteredSpells = STspells.filter(
				(spell) => spell.dc.dc_type.index == "cha"
			);
			setSpellsToDisplay(filteredSpells);
		}
		console.log("spellsToDisplay in ST Filter ", spellsToDisplay);
		return spellsToDisplay;
	}

	// Filter by spell level

	// Filter by school of magic

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
			<div id="filter-buttons">
				<button
					id="filter-button"
					onClick={(stat) => {
						savingThrowFilter(stat);
					}}
				>
					STR
				</button>
				<button
					id="filter-button"
					onClick={(stat) => {
						savingThrowFilter(stat);
					}}
				>
					DEX
				</button>
				<button
					id="filter-button"
					onClick={(stat) => {
						savingThrowFilter(stat);
					}}
				>
					CON
				</button>
				<button
					id="filter-button"
					onClick={(stat) => {
						savingThrowFilter(stat);
					}}
				>
					INT
				</button>
				<button
					id="filter-button"
					onClick={(stat) => {
						savingThrowFilter(stat);
					}}
				>
					WIS
				</button>
				<button
					id="filter-button"
					onClick={(stat) => {
						savingThrowFilter(stat);
					}}
				>
					CHA
				</button>
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
