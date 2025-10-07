import { EquipmentPF2e } from "foundry-pf2e";
import { AbilityCategory } from "./ability.js";
import { moldPrice } from "../data.js";


export class Mold {
    constructor(
        public level: number,
        public name: string,
        public text: string,
        public price: number,
        public regularAbilities: Array<AbilityCategory>,
        public resonantAbilities: Array<AbilityCategory>,
    ) {
        if (regularAbilities.length < 1 || resonantAbilities.length < 1) {
            throw new Error("Mold without regular or resonant abilities.");
        }
    }

    public static formatMoldText(regularAbilities: Array<AbilityCategory>, resonantAbilities: Array<AbilityCategory>): string {
        //<p>When used as a component in Aeon Stone Tinkering, Example Impurity 1 can grant the following abilities to the Experimental Aeon Stone.</p><hr /><p><strong>Skill Enhancement</strong> You gain a +1 item bonus to Athletics checks.</p><p><strong>Lesser Spell</strong> You can cast the @UUID[Compendium.pf2e.spells-srd.Item.izcxFQFwf3woCnFs]{Guidance} cantrip as an occult innate spell.</p>
        const header = `<p>When used as a mold for Aeon Stone Tinkering, the resulting Experimental Aeon Stone will have the following categories of abilities.</p>`;
        const regularText = `<p><strong>Invested</strong> ${regularAbilities.join(", ")}</p>`
        const resonantText = `<p><strong>Invested and placed in a Wayfinder</strong> ${resonantAbilities.join(", ")}</p>`

        return header + regularText + resonantText;
    }

    public static fromDefaults(level: number, name: string, regularAbilities: Array<AbilityCategory>, resonantAbilities: Array<AbilityCategory>): Mold {
        const price = moldPrice[level-1];
        const text = Mold.formatMoldText(regularAbilities, resonantAbilities);

        return new Mold(level, name, text, price, regularAbilities, resonantAbilities);
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

        const regularAbilities = item.getFlag("pf2e-aeon-stone-tinkering", "regularAbilities") as Array<AbilityCategory>;
        const resonantAbilities = item.getFlag("pf2e-aeon-stone-tinkering", "resonantAbilities") as Array<AbilityCategory>;

        if ((regularAbilities.length + resonantAbilities.length) < 1) {
            throw new Error("Mold without ability categories.")
        }

        return new Mold(level, name, text, price, regularAbilities, resonantAbilities)
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
            }
        )
    }
}