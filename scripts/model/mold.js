import { Component } from "./component.js";
export class Mold extends Component {
    regularAbilities;
    resonantAbilities;
    constructor(level, name, text, price, regularAbilities, resonantAbilities) {
        super(level, name, text, price);
        this.regularAbilities = regularAbilities;
        this.resonantAbilities = resonantAbilities;
    }
    static fromItem(item) {
        //@ts-ignore
        if (!item.traits.has("mold")) {
            throw new Error("Component type not set via trait. Expected item to have the 'mold' trait.");
        }
        const level = item.level;
        const name = item.name;
        const text = item.description;
        const price = item.system.price.value.goldValue;
        const regularAbilities = item.getFlag("pf2e-aeon-stone-tinkering", "regularAbilities");
        const resonantAbilities = item.getFlag("pf2e-aeon-stone-tinkering", "resonantAbilities");
        if ((regularAbilities.length + resonantAbilities.length) < 1) {
            throw new Error("Mold without ability categories.");
        }
        return new Mold(level, name, text, price, regularAbilities, resonantAbilities);
    }
    async toItem() {
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
                    value: ["mold"]
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
                    regularAbilities: this.regularAbilities,
                    resonantAbilities: this.resonantAbilities
                }
            }
        });
    }
}
//# sourceMappingURL=mold.js.map