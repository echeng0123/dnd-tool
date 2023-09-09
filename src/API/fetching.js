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
export async function joinSpells() {
	try {
		const APIResponse = await fetchAllSpellsRaw();
		const cleanSpells = [];
		console.log("APIResponse", APIResponse);
		console.log("APIResponse length", APIResponse.results.length);

		for (let i = 0; i < APIResponse.length; i++) {
			console.log("API index", APIResponse[0].index);
			let singleSpell = await fetchSingleSpell(APIResponse[i].index);
			cleanSpells.push(singleSpell);
		}
		console.log("clean spells", cleanSpells);
		return cleanSpells;
	} catch (error) {
		console.error("Can't fetch all raw spells", error);
	}
}
