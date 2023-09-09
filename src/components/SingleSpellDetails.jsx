// This component renders details for a single spell

import { useState, useEffect } from "react";
import { fetchSingleSpell } from "../API/fetching";

export default function SingleSpellDetails({ spells, spellIndex }) {
	const [isOpen, setIsOpen] = useState(false);
	const [spell, setSpell] = useState({});
	const SSDspells = spells;
	const SSDindex = spellIndex;

	useEffect(() => {
		async function getSingleSpell() {
			const APIResponse = await fetchSingleSpell(SSDindex);
			if (APIResponse) {
				setSpell(APIResponse);
			} else {
				console.error("Unable to fetch single spell.");
			}
		}
		getSingleSpell();
	}, []);

	return (
		<div>
			<h4>{spell.name}</h4>
			<h4>Level: {spell.level > 0 ? spell.level : "Cantrip"}</h4>

			<h4>Range: {spell.range}</h4>
			<h4>Casting Time: {spell.casting_time}</h4>
			<h4>Components: {JSON.stringify(spell.components)}</h4>
			<h4>Concentration? {spell.concentration ? "Yes" : "No"}</h4>
			<h4>Ritual: {spell.ritual ? "Yes" : "No"}</h4>
			<h4>School: {spell.school.name}</h4>
			<p>
				Description: {spell.desc[0]} {spell.desc[1]}
			</p>

			{/* <h5>Classes: {JSON.stringify(spell.classes)}</h5> */}
		</div>
	);
}
