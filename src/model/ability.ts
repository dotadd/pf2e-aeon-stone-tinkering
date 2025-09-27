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

export type RawAbility = {
    category: string,
    text: string,
    rulesElements: Array<string>,
}

export class Ability {
    constructor(
        public category: AbilityCategory,
        public text: string,
        public rulesElements: Array<string>,
    ) {}

    public static fromFlag(flag: {category: string, text: string, rulesElements: Array<string>}): Ability {
        if (!Object.values(AbilityCategory).includes(flag.category as AbilityCategory)) {
            throw new Error("");
        }

        return new Ability(flag.category as AbilityCategory, flag.text, flag.rulesElements);
    }
}
