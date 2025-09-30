import { ComponentType } from "./componentType.js";
export class Lattice {
    level;
    name;
    constructor(level, name) {
        this.level = level;
        this.name = name;
    }
    static fromItem(item) {
        const componentType = item.getFlag("pf2e-aeon-stone-tinkering", "componentType");
        if (componentType != ComponentType.lattice) {
            throw new Error("Incorrect component type for item " + item._id + ". Expected 'Lattice', got " + componentType);
        }
        const level = item.level;
        const name = item.name;
        return new Lattice(level, name);
    }
}
//# sourceMappingURL=lattice.js.map