import { AbilityCategory, Ability } from "./model/ability.js";
import { AeonStone } from "./model/aeonStone.js";
import { Impurity } from "./model/impurity.js";
import { Lattice } from "./model/lattice.js";
import { Mold } from "./model/mold.js";
Hooks.once("init", () => {
    const mod = game.modules.get("pf2e-aeon-stone-tinkering");
    //@ts-ignore
    mod.api = {
        Ability,
        AbilityCategory,
        AeonStone,
        Impurity,
        Lattice,
        Mold,
    };
});
//# sourceMappingURL=main.js.map