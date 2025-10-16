import { itemBonusByLevel, itemDcByLevel, latticePrice } from "../data/data.js";
export class Lattice {
    level;
    name;
    text;
    price;
    color;
    imgPath;
    constructor(level, name, text, price, color, imgPath) {
        this.level = level;
        this.name = name;
        this.text = text;
        this.price = price;
        this.color = color;
        this.imgPath = imgPath;
    }
    static formatLatticeText(level, name) {
        const spellRank = Math.ceil(level / 2);
        const dc = itemDcByLevel[level - 1];
        const itemBonus = itemBonusByLevel[level - 1];
        if (!dc || !itemBonus) {
            throw new Error("Lattice level outside of expected range: " + level);
        }
        return `<p>When used as a component in Aeon Stone Tinkering, ${name} allows for the use of other components with a maximum level of ${level}</p>` +
            `<p>The resulting Experimental Aeon Stone will have a level of ${level}. Any non-cantrip spells will be heightened to rank ${spellRank}. ` +
            `Any item bonuses granted will be +${itemBonus}. Any save DCs will be ${dc}.</p>`;
    }
    static fromDefaults(level, name, color, imgPath = "systems/pf2e/icons/equipment/worn-items/other-worn-items/aeon-stone-tourmaline-sphere.webp") {
        const text = this.formatLatticeText(level, name);
        const price = latticePrice[level - 1];
        return new Lattice(level, name, text, price, color, imgPath);
    }
    static fromItem(item) {
        //@ts-ignore
        if (!item.traits.has("lattice")) {
            throw new Error("Component type not set via trait. Expected item to have the 'lattice' trait.");
        }
        const level = item.level;
        const name = item.name;
        const text = item.description;
        const price = item.system.price.value.goldValue;
        const color = item.getFlag("pf2e-aeon-stone-tinkering", "color");
        const imgPath = item.img;
        if (!color) {
            throw new Error("Lattice without color.");
        }
        return new Lattice(level, name, text, price, color, imgPath);
    }
    async toItem(compendiumId, folderId, actor) {
        // handle nonsense cases<
        if (folderId && actor) {
            throw new Error("Cannot create item both in folder and on actor.");
        }
        if (compendiumId && actor) {
            throw new Error("Cannot create item both in compendium and on actor.");
        }
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
                    value: ["lattice"]
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
                                "value": "A component used in the creation of Experimental Aeon Stone Stones. For what purpose, is unclear."
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
                    color: this.color
                }
            },
            folder: folderId
        };
        if (compendiumId) {
            return await Item.create(createData, { pack: compendiumId });
        }
        else if (actor) {
            return await Item.create(createData, { parent: actor });
        }
        else {
            return await Item.create(createData);
        }
    }
}
//# sourceMappingURL=lattice.js.map