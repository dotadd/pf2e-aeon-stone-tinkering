//import { EquipmentPF2e, RuleElementSource } from "foundry-pf2e";
export class AeonStone {
    level;
    name;
    text;
    abilitiesRegular;
    abilitiesResonant;
    rulesElementsRegular;
    rulesElementsResonant;
    mold;
    lattice;
    impurities;
    // a lot of duplicate code here, but for now it's fine
    constructor(mold, lattice, impurities) {
        this.verifyComponents(mold, lattice, impurities);
        this.mold = mold;
        this.lattice = lattice;
        this.impurities = impurities;
        this.level = lattice.level;
        // to do: improve name
        this.name = "Tinkered Aeon Stone";
        // to do: substitute values for level scaling
        const impuritiesRegular = impurities.slice(0, mold.regularAbilities.length);
        const impuritiesResonant = impurities.slice(mold.regularAbilities.length);
        this.text = "While invested, the Tinkered Aeon Stone grants the following benefits:";
        let abilitiesRegular = new Array;
        for (let i = 0; i < impuritiesRegular.length; i++) {
            let category = mold.regularAbilities[i];
            for (let ability of impuritiesRegular[i].abilities) {
                if (ability.category === category) {
                    abilitiesRegular.push(ability);
                    this.text = this.text.concat(`\n\n${ability.text}`);
                    break;
                }
            }
        }
        this.abilitiesRegular = abilitiesRegular;
        this.rulesElementsRegular = abilitiesRegular.flatMap(o => o.rulesElements);
        this.text = this.text.concat("\n\nWhile socketed into a Wayfinder, the Tinkered Aeon Stone also grants the following benefits:");
        let abilitiesResonant = new Array;
        for (let i = 0; i < impuritiesResonant.length; i++) {
            let category = mold.resonantAbilities[i];
            for (let ability of impuritiesResonant[i].abilities) {
                if (ability.category === category) {
                    abilitiesResonant.push(ability);
                    this.text = this.text.concat(`\n\n${ability.text}`);
                    break;
                }
            }
        }
        this.abilitiesResonant = abilitiesResonant;
        this.rulesElementsResonant = abilitiesResonant.flatMap(o => o.rulesElements);
    }
    verifyComponents(mold, lattice, impurities) {
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
        // check whether impurities match the mold
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
    }
}
//# sourceMappingURL=aeonStone.js.map