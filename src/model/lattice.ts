import { EquipmentPF2e } from "foundry-pf2e";
import { Component } from "./component.js";

export class Lattice extends Component {
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