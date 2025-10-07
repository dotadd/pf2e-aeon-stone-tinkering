import { AbilityCategory, Ability } from "./model/ability.js";
import { AeonStone } from "./model/aeonStone.js";
import { Impurity } from "./model/impurity.js";
import { Lattice } from "./model/lattice.js";
import { Mold } from "./model/mold.js";
import { aeonStonePrice, latticePrice, moldPrice, impurityPrice, itemBonusByLevel, itemDcByLevel } from "./data/numberTables.js";


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
        aeonStonePrice: typeof aeonStonePrice,
        latticePrice: typeof latticePrice,
        moldPrice: typeof moldPrice,
        impurityPrice: typeof impurityPrice,
        itemBonusByLevel: typeof itemBonusByLevel,
        itemDcByLevel: typeof itemDcByLevel,
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
    aeonStonePrice,
    latticePrice,
    moldPrice,
    impurityPrice,
    itemBonusByLevel,
    itemDcByLevel,
  }
});