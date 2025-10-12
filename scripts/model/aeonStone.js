import { AbilityCategory } from "./ability.js";
import { aeonStonePrice, itemBonusByLevel, itemDcByLevel, resistanceByLevel } from "../data/data.js";
export class AeonStone {
    level;
    name;
    text;
    price;
    rulesElementsRegular;
    rulesElementsResonant;
    imgPath;
    constructor(level, name, text, price, rulesElementsRegular, rulesElementsResonant, imgPath) {
        this.level = level;
        this.name = name;
        this.text = text;
        this.price = price;
        this.rulesElementsRegular = rulesElementsRegular;
        this.rulesElementsResonant = rulesElementsResonant;
        this.imgPath = imgPath;
    }
    static scaleAbility(ability, level) {
        const dc = itemDcByLevel[level - 1];
        const itemBonus = itemBonusByLevel[level - 1];
        const resistance = resistanceByLevel[level - 1];
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
        ability.text = ability.text.replace(/DC [0-9]*/, "DC " + dc);
        ability.text = ability.text.replace(/(@Check\[.*?)(dc:[0-9]*)(.*?\])/, "$1" + "dc:" + dc + "$3");
        return ability;
    }
    static formatAeonStoneText(abilitiesRegular, abilitiesResonant) {
        const header = "<p>An Experimental Aeon Stone, created from raw components. You must invest it in order to gain its benefits and you may not invest more than one Experimental Aeon Stone each day.</p>";
        let subHeaderRegular = "<hr><p>While invested, the Experimental Aeon Stone grants the following benefits:</p>";
        const abilityTextsRegular = abilitiesRegular.map(ability => ability.formatAbilityText());
        let subHeaderResonant = "<hr><p>While invested and placed in a Wayfinder, the Experimental Aeon Stone grants the following benefits:</p>";
        const abilityTextsResonant = abilitiesResonant.map(ability => ability.formatAbilityText());
        return header + subHeaderRegular + abilityTextsRegular.join("") + subHeaderResonant + abilityTextsResonant.join("");
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
        // set level
        const level = lattice.level;
        // generate name
        const shape = `${mold.shape.charAt(0).toUpperCase()}${mold.shape.slice(1)}`;
        const color = `${lattice.color.charAt(0).toUpperCase()}${lattice.color.slice(1)}`;
        const name = `Experimental Aeon Stone (${color} ${shape})`;
        // compile abilities
        let abilitiesRegular = new Array;
        for (let i = 0; i < impuritiesRegular.length; i++) {
            let category = mold.regularAbilities[i];
            for (let ability of impuritiesRegular[i].abilities) {
                if (ability.category === category) {
                    abilitiesRegular.push(ability.scale(level));
                    break;
                }
            }
        }
        const rulesElementsRegular = abilitiesRegular.flatMap(o => o.rulesElements);
        let abilitiesResonant = new Array;
        for (let i = 0; i < impuritiesResonant.length; i++) {
            let category = mold.resonantAbilities[i];
            for (let ability of impuritiesResonant[i].abilities) {
                if (ability.category === category) {
                    abilitiesResonant.push(ability.scale(level));
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
        // get text
        const text = AeonStone.formatAeonStoneText(abilitiesRegular, abilitiesResonant);
        // get image (static for now)
        const imgPath = "systems/pf2e/icons/equipment/worn-items/other-worn-items/aeon-stone-tourmaline-sphere.webp";
        return new AeonStone(level, name, text, price, rulesElementsRegular, rulesElementsResonant, imgPath);
    }
    async toItem(compendiumId, folderId, actorId) {
        // handle nonsense cases
        if (folderId && actorId) {
            throw new Error("Cannot create item both in folder and on actor.");
        }
        if (compendiumId && actorId) {
            throw new Error("Cannot create item both in compendium and on actor.");
        }
        // configure rules elements
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
            if (Array.isArray(re.predicate)) {
                re.predicate.push("experimental-aeon-stone-in-wayfinder");
            }
            else {
                re.predicate = ["experimental-aeon-stone-in-wayfinder"];
            }
        }
        let rulesElementsTotal = rulesElementsRegular.concat(rulesElementsResonant);
        rulesElementsTotal.push(rollOptionRulesElement);
        // create
        const createData = {
            name: this.name,
            type: "equipment",
            img: this.imgPath,
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
            },
            folder: folderId
        };
        if (compendiumId) {
            await Item.create(createData, { pack: compendiumId });
        }
        else if (actorId) {
            const parent = game.actors.get(actorId);
            await Item.create(createData, { parent: parent });
        }
        else {
            await Item.create(createData);
        }
    }
}
//# sourceMappingURL=aeonStone.js.map