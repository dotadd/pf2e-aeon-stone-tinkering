import { impurityPrice } from "../data/numberTables.js";
export class Impurity {
    level;
    name;
    text;
    price;
    abilities;
    constructor(level, name, text, price, abilities) {
        this.level = level;
        this.name = name;
        this.text = text;
        this.price = price;
        this.abilities = abilities;
        if (abilities.length < 1) {
            throw new Error("Impurity without abilities.");
        }
    }
    static formatImpurityText(name, abilities) {
        const header = `<p>When used as a component in Aeon Stone Tinkering, ${name} can grant the following abilities to the resulting Experimental Aeon Stone.</p>`;
        let abilityTexts = [];
        for (let ability of abilities) {
            let abilityText = `<p><strong>${ability.category}</strong> ${ability.text}</p>`;
            abilityTexts.push(abilityText);
        }
        return header.concat(abilityTexts.join(""));
    }
    static fromDefaults(level, name, abilities) {
        const text = Impurity.formatImpurityText(name, abilities);
        const price = impurityPrice[level - 1];
        return new Impurity(level, name, text, price, abilities);
    }
    static fromItem(item) {
        //@ts-ignore
        if (!item.traits.has("impurity")) {
            throw new Error("Component type not set via trait. Expected item to have the 'impurity' trait.");
        }
        const level = item.level;
        const name = item.name;
        const text = item.description;
        const price = item.system.price.value.goldValue;
        const abilities = item.getFlag("pf2e-aeon-stone-tinkering", "abilities");
        return new Impurity(level, name, text, price, abilities);
    }
    async toItem() {
        await Item.create({
            name: this.name,
            type: "equipment",
            img: "systems/pf2e/icons/equipment/worn-items/other-worn-items/aeon-stone-western-star.webp",
            system: {
                description: {
                    value: this.text
                },
                level: {
                    value: this.level
                },
                bulk: {
                    heldOrStowed: 0,
                    value: 0,
                    per: 1
                },
                traits: {
                    rarity: "uncommon",
                    value: ["impurity"]
                },
                usage: {
                    value: "other",
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
                publication: {
                    title: "",
                    authors: "",
                    license: "ORC",
                    remaster: true
                }
            },
            flags: {
                "pf2e-aeon-stone-tinkering": {
                    abilities: this.abilities
                }
            }
        });
    }
}
//# sourceMappingURL=impurity.js.map