import { Ability } from "./ability.js";
import { ComponentType } from "./componentType.js";
export class Impurity {
    level;
    name;
    abilities;
    constructor(level, name, abilities) {
        this.level = level;
        this.name = name;
        this.abilities = abilities;
    }
    static fromItem(item) {
        const componentType = item.getFlag("pf2e-aeon-stone-tinkering", "componentType");
        if (componentType != ComponentType.impurity) {
            throw new Error("Incorrect component type for item " + item._id + ". Expected 'Impurity', got " + componentType);
        }
        const level = item.level;
        const name = item.name;
        const rawAbilities = item.getFlag("pf2e-aeon-stone-tinkering", "abilities");
        const abilities = rawAbilities.map(o => Ability.fromFlag(o));
        if (abilities.length < 1) {
            throw new Error("Impurity without abilities.");
        }
        return new Impurity(level, name, abilities);
    }
}
//# sourceMappingURL=impurity.js.map