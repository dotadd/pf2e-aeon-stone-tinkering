import { createAeonStone } from "./createAeonStoneDialog.js";
import { createComponents, createImpurities, createLattices, createMolds } from "./createCompendiumItems.js";
import { AbilityCategory, Ability } from "./model/ability.js";
import { AeonStone } from "./model/aeonStone.js";
import { Impurity } from "./model/impurity.js";
import { Lattice } from "./model/lattice.js";
import { Mold } from "./model/mold.js";


declare module "fvtt-types/configuration" {
  interface ModuleConfig {
    "pf2e-aeon-stone-tinkering": {
      api: {
        Ability: typeof Ability,
        AbilityCategory: typeof AbilityCategory,
        AeonStone: typeof AeonStone,
        Impurity: typeof Impurity,
        Lattice: typeof Lattice,
        Mold: typeof Mold,
        createLattices: typeof createLattices,
        createMolds: typeof createMolds,
        createImpurities: typeof createImpurities,
        createComponents: typeof createComponents,
        createAeonStone: typeof createAeonStone,
      }
    }
  }
  interface RequiredModules {
    "pf2e-aeon-stone-tinkering": true;
  }
}

Hooks.once("init", ()=> {
  const mod = game.modules.get("pf2e-aeon-stone-tinkering");
  //@ts-ignore
  mod.api = {
    Ability,
    AbilityCategory,
    AeonStone,
    Impurity,
    Lattice,
    Mold,
    createLattices,
    createMolds,
    createImpurities,
    createComponents,
    createAeonStone,
  }
});