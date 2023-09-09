// This component renders details for a single spell

import { useState, useEffect } from "react";
import { fetchSingleSpell } from "../API/fetching";

export default function SingleSpellDetails({ spellST, spellIndex }) {
	const [spell, setSpell] = useState({});
	const SSDspell = spellST;
	const SSDindex = spellIndex;
	const spellLength = Object.keys(spell).length;

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
		<>
			{spellLength > 0 ? (
				<div>
					<h3>{spell.name}</h3>
					<h4>Level: {spell.level > 0 ? spell.level : "Cantrip"}</h4>

					<h4>Range: {spell.range}</h4>
					<h4>Casting Time: {spell.casting_time}</h4>
					<h4>Components: {JSON.stringify(spell.components)}</h4>
					<h4>Concentration? {spell.concentration ? "Yes" : "No"}</h4>
					<h4>Ritual: {spell.ritual ? "Yes" : "No"}</h4>
					<h4>School: {SSDspell.school.name}</h4>
					{/* <h4>Saving Throw: {SSDspell.dc.dc_type.name}</h4> */}
					<p>
						Description: {SSDspell.desc[0]} {SSDspell.desc[1]}
					</p>

					{/* <h5>Classes: {JSON.stringify(spell.classes)}</h5> */}
				</div>
			) : (
				<></>
			)}
		</>
	);
}
