import { EquipmentPF2e } from "foundry-pf2e";
import { AbilityCategory } from "./ability.js";
import { moldPrice } from "../data/data.js";


export class Mold {
    constructor(
        public level: number,
        public name: string,
        public text: string,
        public price: number,
        public regularAbilities: Array<AbilityCategory>,
        public resonantAbilities: Array<AbilityCategory>,
        public shape: string,
        public imgPath: string,
    ) {
        if (regularAbilities.length < 1 || resonantAbilities.length < 1) {
            throw new Error("Mold without regular or resonant abilities.");
        }
    }

    public static formatMoldText(regularAbilities: Array<AbilityCategory>, resonantAbilities: Array<AbilityCategory>): string {
        const header = `<p>When used as a mold for Aeon Stone Tinkering, the resulting Experimental Aeon Stone will have the following categories of abilities.</p>`;
        const regularText = `<p><strong>Invested</strong> ${regularAbilities.join(", ")}</p>`
        const resonantText = `<p><strong>Invested and placed in a Wayfinder</strong> ${resonantAbilities.join(", ")}</p>`

        return header + regularText + resonantText;
    }

    public static fromDefaults(level: number, name: string, regularAbilities: Array<AbilityCategory>, resonantAbilities: Array<AbilityCategory>, shape: string, imgPath = "systems/pf2e/icons/equipment/worn-items/other-worn-items/taletellers-ring.webp"): Mold {
        const price = moldPrice[level-1];
        const text = Mold.formatMoldText(regularAbilities, resonantAbilities);

        return new Mold(level, name, text, price, regularAbilities, resonantAbilities, shape, imgPath);
    }

    public static fromItem(item: EquipmentPF2e): Mold {
        //@ts-ignore
        if (!item.traits.has("mold")) {
            throw new Error("Component type not set via trait. Expected item to have the 'mold' trait.");
        }

        const level = item.level;
        const name = item.name;
        const text = item.description;
        const price = item.system.price.value.goldValue;
        const imgPath = item.img;

        const regularAbilities = item.getFlag("pf2e-aeon-stone-tinkering", "regularAbilities") as Array<AbilityCategory>;
        const resonantAbilities = item.getFlag("pf2e-aeon-stone-tinkering", "resonantAbilities") as Array<AbilityCategory>;
        if ((regularAbilities.length + resonantAbilities.length) < 1) {
            throw new Error("Mold without ability categories.")
        }

        const shape = item.getFlag("pf2e-aeon-stone-tinkering", "shape") as string;
        if (!shape) {
            throw new Error("Mold without shape.")
        }

        return new Mold(level, name, text, price, regularAbilities, resonantAbilities, shape, imgPath)
    }

    public async toItem(compendiumId?: string, folderId?: string, actorId?: string): Promise<void> {
        // handle nonsense cases
        if (folderId && actorId) {
            throw new Error("Cannot create item both in folder and on actor.");
        }
        if (compendiumId && actorId) {
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
                    resonantAbilities: this.resonantAbilities,
                    shape: this.shape
                }
            },
            folder: folderId
        };


        if (compendiumId) {
            await Item.create(createData, { pack: compendiumId });
        } else if (actorId) {
            const parent = game.actors.get(actorId);
            await Item.create(createData, { parent: parent });
        } else {
            await Item.create(createData);
        }
    }
}