import { createAeonStone, getComponents, pickComponents, queryForComponents, queryForImpurities, queryForLatticeAndMold } from "./createAeonStoneDialog.js";
import { createComponents, createImpurities, createLattices, createMolds, getCreationContext } from "./createCompendiumItems.js";
import { AbilityCategory, Ability } from "./model/ability.js";
import { AeonStone } from "./model/aeonStone.js";
import { Impurity } from "./model/impurity.js";
import { Lattice } from "./model/lattice.js";
import { Mold } from "./model/mold.js";
Hooks.once("init", () => {
    const mod = game.modules.get("pf2e-aeon-stone-tinkering");
    //@ts-ignore
    mod.api = {
        // Model
        Ability,
        AbilityCategory,
        AeonStone,
        Impurity,
        Lattice,
        Mold,
        // Data prep
        createLattices,
        createMolds,
        createImpurities,
        createComponents,
        getCreationContext,
        // Aeon stone stuff
        createAeonStone,
        getComponents,
        pickComponents,
        queryForLatticeAndMold,
        queryForImpurities,
        queryForComponents,
    };
});
//# sourceMappingURL=main.js.map