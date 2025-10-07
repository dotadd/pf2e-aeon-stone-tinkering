import { moldPrice } from "../data/numberTables.js";
export class Mold {
    level;
    name;
    text;
    price;
    regularAbilities;
    resonantAbilities;
    constructor(level, name, text, price, regularAbilities, resonantAbilities) {
        this.level = level;
        this.name = name;
        this.text = text;
        this.price = price;
        this.regularAbilities = regularAbilities;
        this.resonantAbilities = resonantAbilities;
        if (regularAbilities.length < 1 || resonantAbilities.length < 1) {
            throw new Error("Mold without regular or resonant abilities.");
        }
    }
    static formatMoldText(regularAbilities, resonantAbilities) {
        const header = `<p>When used as a mold for Aeon Stone Tinkering, the resulting Experimental Aeon Stone will have the following categories of abilities.</p>`;
        const regularText = `<p><strong>Invested</strong> ${regularAbilities.join(", ")}</p>`;
        const resonantText = `<p><strong>Invested and placed in a Wayfinder</strong> ${resonantAbilities.join(", ")}</p>`;
        return header + regularText + resonantText;
    }
    static fromDefaults(level, name, regularAbilities, resonantAbilities) {
        const price = moldPrice[level - 1];
        const text = Mold.formatMoldText(regularAbilities, resonantAbilities);
        return new Mold(level, name, text, price, regularAbilities, resonantAbilities);
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
            img: "systems/pf2e/icons/equipment/worn-items/other-worn-items/taletellers-ring.webp",
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
                identification: {
                    status: "identified",
                    unidentified: {
                        name: "Unidentified Component",
                        img: "systems/pf2e/icons/unidentified_item_icons/adventuring_gear.webp",
                        data: {
                            description: {
                                "value": ""
                            }
                        }
                    },
                    "misidentified": {}
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