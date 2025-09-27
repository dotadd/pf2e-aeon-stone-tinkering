import { EquipmentPF2e } from "foundry-pf2e";
import { AbilityCategory } from "./ability";
import { ComponentType } from "./componentType";


export class Mold {
    constructor(
        public level: number,
        public name: string,
        public regularAbilities: Array<AbilityCategory>,
        public resonantAbilities: Array<AbilityCategory>,
    ) {}

    public static fromItem(item: EquipmentPF2e): Mold {
        const componentType = item.getFlag("pf2e-aeon-stone-tinkering", "componentType") as ComponentType;
        if (componentType!= ComponentType.mold) {
            throw new Error("Incorrect component type for item " + item._id + ". Expected 'Mold', got " + componentType);
        }

        const level = item.level;
        const name = item.name;

        const regularAbilities = item.getFlag("pf2e-aeon-stone-tinkering", "regularAbilities") as Array<AbilityCategory>;
        const resonantAbilities = item.getFlag("pf2e-aeon-stone-tinkering", "resonantAbilities") as Array<AbilityCategory>;

        if ((regularAbilities.length + resonantAbilities.length) < 1) {
            throw new Error("Mold without ability categories.")
        }

        return new Mold(level, name, regularAbilities, resonantAbilities)
    }
}