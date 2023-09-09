// This component handles the button opening for seeing spell details

import { useState } from "react";
import SingleSpellDetails from "../SingleSpellDetails";

export default function SpellDetailsButton({ spells, spellIndex }) {
	const [isOpen, setIsOpen] = useState(false);
	const SDBspells = spells;
	const SDBindex = spellIndex;

	function handleClick() {
		setIsOpen(!isOpen);
	}

	return (
		<div>
			<button id="clickable-button" onClick={handleClick}>
				{" "}
				<div id="each-spell">
					<h3 id="spell-header">{SDBspells.name}</h3>
					{isOpen && (
						<SingleSpellDetails SDBspells={SDBspells} SDBindex={SDBindex} />
					)}
				</div>
			</button>
		</div>
	);
}
