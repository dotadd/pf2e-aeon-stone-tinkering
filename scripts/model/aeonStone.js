export class AeonStone {
    level;
    name;
    text;
    rulesElementsRegular;
    rulesElementsResonant;
    constructor(level, name, text, rulesElementsRegular, rulesElementsResonant) {
        this.level = level;
        this.name = name;
        this.text = text;
        this.rulesElementsRegular = rulesElementsRegular;
        this.rulesElementsResonant = rulesElementsResonant;
    }
    static fromComponents(mold, lattice, impurities) {
        // check for level of ingredients
        if (mold.level > lattice.level) {
            throw new Error("Incorrect level of ingredients. Lattice level must be at least as high as mold level.");
        }
        for (var impurity of impurities) {
            if (impurity.level > lattice.level) {
                throw new Error("Incorrect level of ingredients. Lattice level must be at least as high as each impurity level.");
            }
        }
        // check for correct number of ingredients
        const slots = mold.regularAbilities.length + mold.resonantAbilities.length;
        if (slots != impurities.length) {
            throw new Error("Incorrect number of ingredients. " + slots + " slots available, but " + impurities.length + " impurities provided.");
        }
        // check whether abilities of impurities match the the ones expected by the mold
        const impuritiesRegular = impurities.slice(0, mold.regularAbilities.length);
        const impuritiesResonant = impurities.slice(mold.regularAbilities.length);
        for (let i = 0; i < impuritiesRegular.length; i++) {
            let category = mold.regularAbilities[i];
            let match = false;
            for (let ability of impuritiesRegular[i].abilities) {
                if (ability.category === category) {
                    match = true;
                    break;
                }
            }
            if (!match) {
                throw new Error("Mold ability number " + (i + 1) + " requires a " + category + " ability, but impurity " + impuritiesRegular[i].name + " does not supply it.");
            }
        }
        for (let i = 0; i < impuritiesResonant.length; i++) {
            let category = mold.resonantAbilities[i];
            let match = false;
            for (let ability of impuritiesResonant[i].abilities) {
                if (ability.category === category) {
                    match = true;
                    break;
                }
            }
            if (!match) {
                throw new Error("Mold resonant ability number " + (i + 1) + " requires a " + category + " ability, but resonant impurity " + impuritiesResonant[i].name + " does not supply it.");
            }
        }
        // define easy parameters
        const level = lattice.level;
        const name = "Experimental Aeon Stone";
        var text = "<p>While invested, the Experimental Aeon Stone grants the following benefits:</p>";
        // compile abilities
        // to do: substitute values for level scaling
        let abilitiesRegular = new Array;
        for (let i = 0; i < impuritiesRegular.length; i++) {
            let category = mold.regularAbilities[i];
            for (let ability of impuritiesRegular[i].abilities) {
                if (ability.category === category) {
                    abilitiesRegular.push(ability);
                    // to do: check whether I messed up here and made this wrap multiple <p>
                    text = text.concat(`<p>${ability.text}</p>`);
                    break;
                }
            }
        }
        const rulesElementsRegular = abilitiesRegular.flatMap(o => o.rulesElements);
        text = text.concat("<p>While socketed into a Wayfinder, the Tinkered Aeon Stone also grants the following benefits:</p>");
        let abilitiesResonant = new Array;
        for (let i = 0; i < impuritiesResonant.length; i++) {
            let category = mold.resonantAbilities[i];
            for (let ability of impuritiesResonant[i].abilities) {
                if (ability.category === category) {
                    abilitiesResonant.push(ability);
                    text = text.concat(`<p>${ability.text}</p>`);
                    break;
                }
            }
        }
        const rulesElementsResonant = abilitiesResonant.flatMap(o => o.rulesElements);
        return new AeonStone(level, name, text, rulesElementsRegular, rulesElementsResonant);
    }
}
//# sourceMappingURL=aeonStone.js.map