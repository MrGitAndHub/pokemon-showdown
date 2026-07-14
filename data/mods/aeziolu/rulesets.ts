export const Rulesets: import('../../../sim/dex-formats').ModdedFormatDataTable = {
	standardag: {
		inherit: true,
		ruleset: [
			'Obtainable', 'Team Preview', 'Cancel Mod', 'Endless Battle Clause',
			'Species Clause',
		],
	},
	standard: {
		inherit: true,
		ruleset: [
			'Standard AG',
			'Sleep Moves Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Clause',
		],
	},
	standarddraft: {
		inherit: true,
		ruleset: [
			'Standard AG',
			'Nickname Clause', 'Sleep Clause Mod', 'OHKO Clause', 'Evasion Clause',
			'!Item Clause',
		],
		onBegin() {
			this.reportPercentages = true;
		},
		// timer: {starting: 60 * 60, grace: 0, addPerTurn: 10, maxPerTurn: 100, timeoutAutoChoose: true},
	},
	flatrules: {
		inherit: true,
		desc: "The in-game Flat Rules: SDL Official Format",
		ruleset: ['Obtainable', 'Team Preview', 'Species Clause', 'Nickname Clause', 'Cancel Mod'],
		banlist: ['Mythical', 'Restricted Legendary'],
	},
	teampreview: {
		inherit: true,
		onTeamPreview() {
			this.add('clearpoke');
			for (const pokemon of this.getAllPokemon()) {
				const details = pokemon.details.replace(/(Xerneas|Zacian|Zamazenta)(-[a-zA-Z?-]+)?/g, '$1-*');
				this.add('poke', pokemon.side.id, details, '');
			}
			if (this.ruleTable.has(`teratypepreview`)) {
				for (const side of this.sides) {
					let buf = ``;
					for (const pokemon of side.pokemon) {
						buf += buf ? ` / ` : `raw|${side.name}'s Tera Types:<br />`;
						buf += `<psicon pokemon="${pokemon.species.id}" /><psicon type="${pokemon.teraType}" />`;
					}
					this.add(`${buf}`);
				}
			}
			this.makeRequest('teampreview');
		},
	},
	natdexmod: {
		effectType: 'ValidatorRule',
		name: 'NatDex Mod',
		desc: "Mechanics for National Dex formats",
		ruleset: [
			'+Unobtainable', '+Past', 'Sketch Post-Gen 7 Moves',
		],
		// implemented in the champions natdex draft format
	},
};
