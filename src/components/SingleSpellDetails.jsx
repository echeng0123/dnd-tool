// This component renders details for a single spell

import { useState, useEffect } from "react";
import { fetchSingleSpell } from "../API/fetching";

export default function SingleSpellDetails({ spellST, spellIndex }) {
	// const [spell, setSpell] = useState({});
	const SSDspell = spellST;
	const SSDindex = spellIndex;
	const spellLength = Object.keys(SSDspell).length;

	// console.log("SSDspell", SSDspell);

	// useEffect(() => {
	// 	async function getSingleSpell() {
	// 		const APIResponse = await fetchSingleSpell(SSDindex);
	// 		console.log("APIResponse in SSD ", APIResponse);
	// 		if (APIResponse) {
	// 			setSpell(APIResponse);
	// 			console.log("single spell is ", spell);
	// 		} else {
	// 			console.error("Unable to fetch single spell.");
	// 		}
	// 	}
	// 	getSingleSpell();
	// }, []);

	return (
		<>
			{spellLength > 0 ? (
				<div>
					<h3>{SSDspell.name}</h3>
					<h4>Level: {SSDspell.level > 0 ? SSDspell.level : "Cantrip"}</h4>

					<h4>Range: {SSDspell.range}</h4>
					<h4>Casting Time: {SSDspell.casting_time}</h4>
					<h4>Components: {JSON.stringify(SSDspell.components)}</h4>
					<h4>Concentration? {SSDspell.concentration ? "Yes" : "No"}</h4>
					<h4>Ritual: {SSDspell.ritual ? "Yes" : "No"}</h4>
					<h4>School: {SSDspell.school.name}</h4>
					<h4>Saving Throw: {SSDspell.dc.dc_type.name}</h4>
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
