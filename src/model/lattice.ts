import { EquipmentPF2e } from "foundry-pf2e";
import { ComponentType } from "./componentType.js";


export class Lattice {
    constructor(
        public level: number,
        public name: string,
    ) {}

    public static fromItem(item: EquipmentPF2e): Lattice {
        const componentType = item.getFlag("pf2e-aeon-stone-tinkering", "componentType") as ComponentType;
        if (componentType!= ComponentType.lattice) {
            throw new Error("Incorrect component type for item " + item._id + ". Expected 'Lattice', got " + componentType);
        }

        const level = item.level;
        const name = item.name;

        return new Lattice(level, name)
    }
}