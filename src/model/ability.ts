import { RuleElementSource } from "foundry-pf2e";

export enum AbilityCategory {
    lesserSpell = "Lesser Spell",
    lesserInnateEffect = "Lesser Innate Effect",
    lesserEquipmentBond = "Lesser Equipment Bond",
    energySubstitution = "Energy Substitution",
    spell = "Spell",
    martialTalent = "Martial Talent",
    alchemicalInfusion = "Alchemical Infusion",
    magicTrick = "Magic Trick",
    restoration = "Restoration",
    resistance = "Resistance",
    skillEnhancement = "Skill Enhancement",
    innateEffect = "Innate Effect",
    replenishment = "Replenishment",
    equipmentBond = "Equipment Bond",
    rush = "Rush",
}

export class Ability {
    constructor(
        public category: AbilityCategory,
        public text: string,
        public rulesElements: Array<RuleElementSource>,
    ) {}
}

//let abil = new mod.api.Ability("Skill Enhancement", "desc", [{"key": "FlatModifier", "selector": "athletics", "value": 1, "type": "item"}])
