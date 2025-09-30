"use strict";
//import { AbilityCategory, Ability } from "./model/ability.js";
//import { AeonStone } from "./model/aeonStone.js";
//import { Impurity } from "./model/impurity.js";
//import { Lattice } from "./model/lattice.js";
//import { Mold } from "./model/mold.js";
/*
let abil1 = new Ability(AbilityCategory.lesserSpell, "You can cast the Figment cantrip at will.", ["testre_a_1", "testre_a_2"])
let abil2 = new Ability(AbilityCategory.lesserInnateEffect, "You can lick your own elbow.", ["testre_b"])

let impurity1 = new Impurity(1, "figma", [abil1])
let impurity2 = new Impurity(1, "bows", [abil2])

let moldy = new Mold(1, "moldy", [AbilityCategory.lesserSpell], [AbilityCategory.lesserInnateEffect])

let latticey = new Lattice(1, "licorice")

let stone = new AeonStone(moldy, latticey, [impurity1, impurity2])

console.log(stone)
*/
function testFunction(param) {
    console.log(param);
}
Hooks.once("init", () => {
    const mod = game.modules.get("pf2e-aeon-stone-tinkering");
    mod.api = {
        testFunction
    };
});
//# sourceMappingURL=main.js.map