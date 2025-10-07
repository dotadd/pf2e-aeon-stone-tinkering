import { EquipmentPF2e } from "foundry-pf2e";
import { Ability } from "./ability.js";
import { impurityPrice } from "../data.js";


export class Impurity {
    constructor (
        public level: number,
        public name: string,
        public text: string,
        public price: number,
        public abilities: Array<Ability>,
    ) {
        if (abilities.length < 1) {
            throw new Error("Impurity without abilities.");
        }
    }

    public static formatImpurityText(name: string, abilities: Array<Ability>): string {
        const header = `<p>When used as a component in Aeon Stone Tinkering, ${name} can grant the following abilities to the resulting Experimental Aeon Stone.</p>`;
        
        let abilityTexts: Array<string> = [];
        for (let ability of abilities) {
            let abilityText = `<p><strong>${ability.category}</strong> ${ability.text}</p>`;
            abilityTexts.push(abilityText);
        }

        return header.concat(abilityTexts.join(""));
    }

    public static fromDefaults(level: number, name: string, abilities: Array<Ability>): Impurity {
        const text = Impurity.formatImpurityText(name, abilities);
        const price = impurityPrice[level-1]

        return new Impurity(level, name, text, price, abilities)
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

        const abilities = item.getFlag("pf2e-aeon-stone-tinkering", "abilities") as Array<Ability>;

        return new Impurity(level, name, text, price, abilities)
    }

    public async toItem(): Promise<void> {
        await Item.create(
            {
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
            }
        )
    }
}