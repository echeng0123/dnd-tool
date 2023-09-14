// FETCHING FUNCTIONS

const API_URL = `https://www.dnd5eapi.co/api`;

// FETCH ALL SPELLS (RAW)
export const fetchAllSpellsRaw = async () => {
	try {
		const response = await fetch(`${API_URL}/spells`);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error("Unable to fetch all raw spells", error);
	}
};

// FETCH SINGLE SPELL
export const fetchSingleSpell = async (spellUrl) => {
	try {
		const response = await fetch(`${API_URL}/spells/${spellUrl}`);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(`Unable to fetch spell ${spellUrl}`, error);
	}
};

// JOIN SPELLS
// Because the D&D 5e API is not set up to grab spells with full info, this function creates a new array that pulls in the full spell list by grabbing each spell individually.
// export async function joinSpells() {
// 	console.log("Entering joinSpells");

// 	try {
// 		const APIResponse = await fetchAllSpellsRaw();
// 		const cleanSpells = [];
// 		const APIlength = Object.keys(APIResponse.results).length;

// 		for (let i = 0; i < APIlength; i++) {
// 			let singleSpell = await fetchSingleSpell(APIResponse.results[i].index);
// 			cleanSpells.push(singleSpell);
// 		}
// 		console.log("cleanSpells", cleanSpells);
// 		return cleanSpells;
// 	} catch (error) {
// 		console.error("Can't fetch all raw spells", error);
// 	}
// }

export async function joinSpells() {
	console.log("Entering joinSpells");
	const chunk = 50;
	let index = 0;

	async function doChunk() {
		console.log("entering doChunk");
		let count = chunk;
		const APIResponse = await fetchAllSpellsRaw();
		const cleanSpells = [];
		// const APIlength = Object.keys(APIResponse.results).length;
		const APIlength = 50;

		while (count-- && index < APIlength) {
			console.log("hello", count);
			for (let i = 0; i < APIlength; i++) {
				let singleSpell = await fetchSingleSpell(APIResponse.results[i].index);
				cleanSpells.push(singleSpell);
			}
			++index;
		}
		if (index < APIlength) {
			// set timeout for async iteration
			setTimeout(doChunk, 1);
		}
		console.log("cleanSpells", cleanSpells);
		return cleanSpells;
	}
	await doChunk();

	// console.log("cleanSpells", cleanSpells);
	// return cleanSpells;
	// try {
	// } catch (error) {
	// 	console.error("Can't fetch all raw spells", error);
	// }
}
