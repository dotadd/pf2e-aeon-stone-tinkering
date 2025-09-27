import { AbilityCategory, Ability } from "./model/ability"
import { AeonStone } from "./model/aeonStone"
import { Impurity } from "./model/impurity"
import { Lattice } from "./model/lattice"
import { Mold } from "./model/mold"


let abil1 = new Ability(AbilityCategory.lesserSpell, "You can cast the Figment cantrip at will.", [])
let abil2 = new Ability(AbilityCategory.lesserInnateEffect, "You can lick your own elbow.", [])

let impurity1 = new Impurity(1, "figma", [abil1])
let impurity2 = new Impurity(1, "bows", [abil2])

let moldy = new Mold(1, "moldy", [AbilityCategory.lesserSpell], [AbilityCategory.lesserInnateEffect])

let latticey = new Lattice(1, "licorice")

let stone = new AeonStone(moldy, latticey, [impurity1, impurity2])

console.log(stone)