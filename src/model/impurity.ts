import { ActorPF2e, EquipmentPF2e } from "foundry-pf2e";
import { Ability, RawAbility } from "./ability.js";
import { impurityPrice } from "../data/data.js";


export class Impurity {
    constructor (
        public level: number,
        public name: string,
        public text: string,
        public price: number,
        public abilities: Array<Ability>,
        public imgPath: string,
    ) {
        if (abilities.length < 1) {
            throw new Error("Impurity without abilities.");
        }
    }

    public static formatImpurityText(name: string, abilities: Array<Ability>): string {
        const header = `<p>When used as a component in Aeon Stone Tinkering, ${name} can grant the following abilities to the resulting Experimental Aeon Stone.</p><hr/>`;
        const abilityTexts: Array<string> = abilities.map(ability => ability.formatAbilityText());

        return header.concat(abilityTexts.join("<hr/>"));
    }

    public static fromDefaults(level: number, name: string, abilities: Array<Ability>, imgPath: string = "systems/pf2e/icons/equipment/consumables/other-consumables/camp-shroud.webp"): Impurity {
        const text = Impurity.formatImpurityText(name, abilities);
        const price = impurityPrice[level-1]

        return new Impurity(level, name, text, price, abilities, imgPath)
    }

    public static fromItem(item: EquipmentPF2e): Impurity {
        //@ts-ignore
        if (!item.traits.has("impurity")) {
            throw new Error("Component type not set via trait. Expected item to have the 'impurity' trait.");
        }

        const level = item.level;
        const name = item.name;
        const text = item.description;
        const price = item.system.price.value.goldValue;
        const imgPath = item.img;

        const rawAbilities = item.getFlag("pf2e-aeon-stone-tinkering", "abilities") as Array<RawAbility>;
        const abilities = rawAbilities.map(Ability.fromRaw);

        return new Impurity(level, name, text, price, abilities, imgPath)
    }

    public async toItem(compendiumId?: string, folderId?: string, actor?: ActorPF2e): Promise<void> {
        // handle nonsense cases
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
                    abilities: this.abilities
                }
            },
            folder: folderId
        };

        if (compendiumId) {
            await Item.create(createData, { pack: compendiumId });
        } else if (actor) {
            await Item.create(createData, { parent: actor });
        } else {
            await Item.create(createData);
        }
    }
}