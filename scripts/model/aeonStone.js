import { wrapInParagraph } from "../util.js";
import { aeonStonePrice } from "../data.js";
export class AeonStone {
    level;
    name;
    text;
    price;
    rulesElementsRegular;
    rulesElementsResonant;
    constructor(level, name, text, price, rulesElementsRegular, rulesElementsResonant) {
        this.level = level;
        this.name = name;
        this.text = text;
        this.price = price;
        this.rulesElementsRegular = rulesElementsRegular;
        this.rulesElementsResonant = rulesElementsResonant;
    }
    static fromComponents(mold, lattice, impurities) {
        // check for level of ingredients
        if (mold.level > lattice.level) {
            throw new Error("Incorrect level of ingredients. Lattice level must be at least as high as mold level.");
        }
        for (let impurity of impurities) {
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
        let text = "<p>While invested, the Experimental Aeon Stone grants the following benefits:</p>";
        // compile abilities
        // to do: substitute values for level scaling
        let abilitiesRegular = new Array;
        for (let i = 0; i < impuritiesRegular.length; i++) {
            let category = mold.regularAbilities[i];
            for (let ability of impuritiesRegular[i].abilities) {
                if (ability.category === category) {
                    abilitiesRegular.push(ability);
                    text = text.concat(wrapInParagraph(ability.text));
                    break;
                }
            }
        }
        const rulesElementsRegular = abilitiesRegular.flatMap(o => o.rulesElements);
        text = text.concat("<p>While socketed into a Wayfinder, the Experimental Aeon Stone also grants the following benefits:</p>");
        // to do: add rollOption and predicate for resonant abilities
        let abilitiesResonant = new Array;
        for (let i = 0; i < impuritiesResonant.length; i++) {
            let category = mold.resonantAbilities[i];
            for (let ability of impuritiesResonant[i].abilities) {
                if (ability.category === category) {
                    abilitiesResonant.push(ability);
                    text = text.concat(wrapInParagraph(ability.text));
                    break;
                }
            }
        }
        const rulesElementsResonant = abilitiesResonant.flatMap(o => o.rulesElements);
        // get price
        const price = aeonStonePrice[level - 1];
        if (!price) {
            throw new Error("Could not get Aeon Stone price. Level out of expected range: " + level);
        }
        return new AeonStone(level, name, text, price, rulesElementsRegular, rulesElementsResonant);
    }
    async toItem() {
        const rollOptionRulesElement = {
            key: "RollOption",
            //@ts-ignore
            option: "experimental-aeon-stone-in-wayfinder",
            label: "Experimental Aeon Stone in Wayfinder",
            toggleable: true
        };
        let rulesElementsRegular = this.rulesElementsRegular;
        let rulesElementsResonant = this.rulesElementsResonant;
        for (let re of rulesElementsRegular) {
            re.requiresInvestment = true;
        }
        for (let re of rulesElementsResonant) {
            re.requiresInvestment = true;
            re.predicate = ["experimental-aeon-stone-in-wayfinder"];
        }
        let rulesElementsTotal = rulesElementsRegular.concat(rulesElementsResonant);
        rulesElementsTotal.push(rollOptionRulesElement);
        await Item.create({
            name: this.name,
            type: "equipment",
            img: "systems/pf2e/icons/equipment/worn-items/other-worn-items/aeon-stone-tourmaline-sphere.webp",
            system: {
                description: {
                    value: this.text
                },
                level: {
                    value: this.level
                },
                bulk: {
                    heldOrStowed: 0.1,
                    value: 0.1,
                    per: 1
                },
                traits: {
                    rarity: "uncommon",
                    value: ["invested", "magical"]
                },
                usage: {
                    value: "worn",
                    type: "worn"
                },
                price: {
                    value: {
                        pp: 0,
                        gp: this.price,
                        sp: 0,
                        cp: 0
                    },
                    per: 1,
                    sizeSensitive: false
                },
                rules: rulesElementsTotal,
                publication: {
                    title: "",
                    authors: "",
                    license: "ORC",
                    remaster: true
                }
            }
        });
    }
}
//# sourceMappingURL=aeonStone.js.map