import { EquipmentPF2e } from "foundry-pf2e";
import { Ability, RawAbility } from "./ability.js";
import { ComponentType } from "./componentType.js";


export class Impurity {
    constructor (
        public level: number,
        public name: string,
        public abilities: Array<Ability>,
    ) {}

    public static fromItem(item: EquipmentPF2e): Impurity {
        const componentType = item.getFlag("pf2e-aeon-stone-tinkering", "componentType") as ComponentType;
        if (componentType!= ComponentType.impurity) {
            throw new Error("Incorrect component type for item " + item._id + ". Expected 'Impurity', got " + componentType);
        }

        const level = item.level;
        const name = item.name;

        const rawAbilities = item.getFlag("pf2e-aeon-stone-tinkering", "abilities") as Array<RawAbility>;
        const abilities = rawAbilities.map(o => Ability.fromFlag(o));
        if (abilities.length < 1) {
            throw new Error("Impurity without abilities.")
        }

        return new Impurity(level, name, abilities)
    }
}