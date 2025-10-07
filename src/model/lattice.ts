import { EquipmentPF2e } from "foundry-pf2e";
import { itemBonusByLevel, itemDcByLevel, latticePrice } from "../data/numberTables.js";

export class Lattice {

    constructor (
        public level: number,
        public name: string,
        public text: string,
        public price: number,
    ) {}

    public static formatLatticeText(level: number, name: string): string {
        const spellRank = Math.ceil(level/2);
        const dc = itemDcByLevel[level-1];
        const itemBonus = itemBonusByLevel[level-1];

        if (!dc || !itemBonus) {
            throw new Error("Lattice level outside of expected range: " + level);
        }

        return `<p>When used as a component in Aeon Stone Tinkering, ${name} allows for the use of other components with a maximum level of ${level}</p>` +
        `<p>The resulting Experimental Aeon Stone will have a level of ${level}. Any non-cantrip spells will be heightened to rank ${spellRank}. ` +
        `Any item bonuses granted will be +${itemBonus}. Any save DCs will be ${dc}.</p>`;
    }

    public static fromDefaults(level: number, name: string): Lattice {
        const text = this.formatLatticeText(level, name);
        const price = latticePrice[level-1];

        return new Lattice(level, name, text, price);
    }

    public static fromItem(item: EquipmentPF2e): Lattice {
        //@ts-ignore
        if (!item.traits.has("lattice")) {
            throw new Error("Component type not set via trait. Expected item to have the 'lattice' trait.");
        }

        const level = item.level;
        const name = item.name;
        const text = item.description;
        const price = item.system.price.value.goldValue;

        return new Lattice(level, name, text, price)
    }

    public async toItem(): Promise<void> {
        await Item.create(
            {
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
                }
            }
        )
    }
}