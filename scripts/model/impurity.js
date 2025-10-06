import { Component } from "./component.js";
import { wrapInParagraph } from "../util.js";
export class Impurity extends Component {
    abilities;
    constructor(level, name, text, price, abilities) {
        super(level, name, text, price);
        this.abilities = abilities;
        if (abilities.length < 1) {
            throw new Error("Impurity without abilities.");
        }
        this.abilities = abilities;
        if (!this.text) {
            let newText = "";
            for (let ability of this.abilities) {
                newText = newText.concat(wrapInParagraph(ability.text));
            }
            this.text = newText;
        }
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
        if (abilities.length < 1) {
            throw new Error("Impurity without abilities.");
        }
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