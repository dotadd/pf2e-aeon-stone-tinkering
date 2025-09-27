import { Mold } from "./mold";
import { Lattice } from "./lattice";
import { Impurity } from "./impurity";
import { Ability } from "./ability";


export class AeonStone {
    level: number;
    name: string;
    text: string;
    abilitiesRegular: Array<Ability>;
    abilitiesResonant: Array<Ability>;
    rulesElementsRegular: Array<string>;
    rulesElementsResonant: Array<string>;

    mold: Mold;
    lattice: Lattice;
    impurities: Array<Impurity>;

    // a lot of duplicate code here, but for now it's fine
    constructor(mold: Mold, lattice: Lattice, impurities: Array<Impurity>) {
        this.verifyComponents(mold, lattice, impurities);

        this.mold = mold;
        this.lattice = lattice;
        this.impurities = impurities;

        this.level = lattice.level;
        // to do: improve name
        this.name = "Tinkered Aeon Stone"

        // to do: substitute values for level scaling
        const impuritiesRegular = impurities.slice(0, mold.regularAbilities.length - 1);
        const impuritiesResonant = impurities.slice(mold.regularAbilities.length);

        let abilitiesRegular = new Array<Ability>;
        for (let i = 0; i < impuritiesRegular.length; i++) {
            let category = mold.regularAbilities[i];
            for (let ability of impuritiesRegular[i].abilities) {
                if (ability.category === category) {
                    abilitiesRegular.push(ability);
                    break;
                }
            }
        }
        this.abilitiesRegular = abilitiesRegular;
        this.rulesElementsRegular = abilitiesRegular.flatMap(o => o.rulesElements);

        let abilitiesResonant = new Array<Ability>;
        for (let i = 0; i < impuritiesResonant.length; i++) {
            let category = mold.resonantAbilities[i];
            for (let ability of impuritiesResonant[i].abilities) {
                if (ability.category === category) {
                    abilitiesResonant.push(ability);
                    break;
                }
            }
        }
        this.abilitiesResonant = abilitiesResonant;
        this.rulesElementsResonant = abilitiesResonant.flatMap(o => o.rulesElements);
    }

    public verifyComponents(mold: Mold, lattice: Lattice, impurities: Array<Impurity>) : void {
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
        const impuritiesRegular = impurities.slice(0, mold.regularAbilities.length - 1);
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
                throw new Error("Mold ability number " + (i+1) + " requires a " + category + " ability, but impurity " + impuritiesRegular[i].name + " does not supply it.");
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
                throw new Error("Mold resonant ability number " + (i+1) + " requires a " + category + " ability, but resonant impurity " + impuritiesResonant[i].name + " does not supply it.");
            }
        }

    }
}
