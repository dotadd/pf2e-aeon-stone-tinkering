import { ComponentType } from "./componentType.js";
export class Mold {
    level;
    name;
    regularAbilities;
    resonantAbilities;
    constructor(level, name, regularAbilities, resonantAbilities) {
        this.level = level;
        this.name = name;
        this.regularAbilities = regularAbilities;
        this.resonantAbilities = resonantAbilities;
    }
    static fromItem(item) {
        const componentType = item.getFlag("pf2e-aeon-stone-tinkering", "componentType");
        if (componentType != ComponentType.mold) {
            throw new Error("Incorrect component type for item " + item._id + ". Expected 'Mold', got " + componentType);
        }
        const level = item.level;
        const name = item.name;
        const regularAbilities = item.getFlag("pf2e-aeon-stone-tinkering", "regularAbilities");
        const resonantAbilities = item.getFlag("pf2e-aeon-stone-tinkering", "resonantAbilities");
        if ((regularAbilities.length + resonantAbilities.length) < 1) {
            throw new Error("Mold without ability categories.");
        }
        return new Mold(level, name, regularAbilities, resonantAbilities);
    }
}
//# sourceMappingURL=mold.js.map