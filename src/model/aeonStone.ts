import { RuleElementSource } from "foundry-pf2e";

import { Mold } from "./mold.js";
import { Lattice } from "./lattice.js";
import { Impurity } from "./impurity.js";
import { Ability, AbilityCategory } from "./ability.js";
import { aeonStonePrice, itemBonusByLevel, itemDcByLevel, resistanceByLevel } from "../data/numberTables.js";


export class AeonStone {
    constructor(
        public level: number,
        public name: string,
        public text: string,
        public price: number,
        public rulesElementsRegular: Array<RuleElementSource>,
        public rulesElementsResonant: Array<RuleElementSource>,
    ) {}

    public static scaleAbility(ability: Ability, level: number): Ability {
        const dc = itemDcByLevel[level-1];
        const itemBonus = itemBonusByLevel[level-1];
        const resistance = resistanceByLevel[level-1];

        // fully account for item bonuses (to skills, because that's the only kind used)
        if (ability.category === AbilityCategory.skillEnhancement) {
            ability.text = ability.text.replace(/\+[0-9] item bonus/, `+${itemBonus} item bonus`);
            for (let i = 0; i < ability.rulesElements.length; i++) {
                if (ability.rulesElements[i].key === "FlatModifier") {
                    //@ts-ignore
                    ability.rulesElements[i].value = itemBonus;
                }
            }
        }

        // fully account for resistances
        if (ability.category === AbilityCategory.resistance) {
            ability.text = ability.text.replace(/resistance [0-9]* to/, `resistance ${resistance} to`);
            for (let i = 0; i < ability.rulesElements.length; i++) {
                if (ability.rulesElements[i].key === "Resistance") {
                    //@ts-ignore
                    ability.rulesElements[i].value = resistance;
                }
            }
        }

        // substitute any DCs in plain text and in @Check syntax
        ability.text = ability.text.replace(new RegExp("DC [0-9]*"), "DC " + dc);
        ability.text = ability.text.replace(new RegExp("(@Check\[.*?)(dc:[0-9]*)(.*?\])"), "$1" + "dc:" + dc + "$3");

        return ability;
    }

    public static formatAeonStoneText(abilitiesRegular: Array<Ability>, abilitiesResonant: Array<Ability>): string {
        const header = "<p>An Experimental Aeon Stone, created from raw components. You must invest it in order to gain its benefits and you may not invest more than one Experimental Aeon Stone each day.</p>";
        
        let subHeaderRegular = "<hr><p>While invested, the Experimental Aeon Stone grants the following benefits:</p>";
        
        let abilityTextsRegular: Array<string> = [];
        for (let ability of abilitiesRegular) {
            let abilityText = `<p><strong>${ability.category}</strong> ${ability.text}</p>`;
            abilityTextsRegular.push(abilityText);
        }

        let subHeaderResonant = "<hr><p>While invested and placed in a Wayfinder, the Experimental Aeon Stone grants the following benefits:</p>";
        
        let abilityTextsResonant: Array<string> = [];
        for (let ability of abilitiesResonant) {
            let abilityText = `<p><strong>${ability.category}</strong> ${ability.text}</p>`;
            abilityTextsResonant.push(abilityText);
        }

        return header + subHeaderRegular + abilityTextsRegular.join("") + subHeaderResonant + abilityTextsResonant.join("");
    }

    public static fromComponents(mold: Mold, lattice: Lattice, impurities: Array<Impurity>): AeonStone {
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

        // set easy parameters
        const level = lattice.level;
        const name = "Experimental Aeon Stone";

        // compile abilities
        let abilitiesRegular = new Array<Ability>;
        for (let i = 0; i < impuritiesRegular.length; i++) {
            let category = mold.regularAbilities[i];
            for (let ability of impuritiesRegular[i].abilities) {
                if (ability.category === category) {
                    abilitiesRegular.push(AeonStone.scaleAbility(ability, level));
                    break;
                }
            }
        }
        const rulesElementsRegular = abilitiesRegular.flatMap(o => o.rulesElements);

        let abilitiesResonant = new Array<Ability>;
        for (let i = 0; i < impuritiesResonant.length; i++) {
            let category = mold.resonantAbilities[i];
            for (let ability of impuritiesResonant[i].abilities) {
                if (ability.category === category) {
                    abilitiesResonant.push(AeonStone.scaleAbility(ability, level));
                    break;
                }
            }
        }
        const rulesElementsResonant = abilitiesResonant.flatMap(o => o.rulesElements);

        // get price
        const price = aeonStonePrice[level-1];

        if (!price) {
            throw new Error("Could not get Aeon Stone price. Level out of expected range: " + level);
        }

        // get text
        const text = AeonStone.formatAeonStoneText(abilitiesRegular, abilitiesResonant);

        return new AeonStone(level, name, text, price, rulesElementsRegular, rulesElementsResonant);
    }

    public async toItem(): Promise<void> {
        const rollOptionRulesElement: RuleElementSource = {
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

        await Item.create(
            {
                name: this.name,
                type: "equipment",
                // to do: use random image from list
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
            }
        );
    }
}
