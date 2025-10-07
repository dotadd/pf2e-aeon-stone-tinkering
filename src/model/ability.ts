import { RuleElementSource } from "foundry-pf2e";
import { itemBonusByLevel, resistanceByLevel } from "../data/numberTables.js";

export enum AbilityCategory {
    lesserSpell = "Lesser Spell", // 1
    lesserInnateEffect = "Lesser Innate Effect", // 1
    lesserEquipmentBond = "Lesser Equipment Bond", // 1
    energySubstitution = "Energy Substitution", // 1
    spell = "Spell", // 3
    martialTalent = "Martial Talent", // 3
    alchemicalInfusion = "Alchemical Infusion", // 3
    magicTrick = "Magic Trick", // 3
    restoration = "Restoration", // 5
    resistance = "Resistance", // 5
    skillEnhancement = "Skill Enhancement", // 5
    innateEffect = "Innate Effect", // 5
    replenishment = "Replenishment", // 7
    equipmentBond = "Equipment Bond", // 7
    rush = "Rush", // 7
}

export class Ability {
    constructor(
        public category: AbilityCategory,
        public text: string,
        public rulesElements: Array<RuleElementSource>,
    ) {}

    public static lesserSpell(spellLink: string, tradition: string): Ability {
        const text = `You can cast the ${spellLink} cantrip. If you are spellcaster, use your tradition and spell DC for this spell. Otherwise it belongs to the ${tradition} tradition and uses your class DC.`;
        return new Ability(AbilityCategory.lesserSpell, text, []);
    }
    public static lesserInnateEffect(text: string, rulesElements: Array<RuleElementSource> = []): Ability {
        return new Ability(AbilityCategory.lesserInnateEffect, text, rulesElements);
    }
    public static lesserEquipmentBond(text: string, rulesElements: Array<RuleElementSource> = []): Ability {
        return new Ability(AbilityCategory.lesserEquipmentBond, text, rulesElements);
    }
    public static energySubstitution(energyType: string): Ability {
        const text = `Once per hour, when you Cast a Spell or use an action that deals energy damage, you may replace the damage type of that action with ${energyType}.`;
        return new Ability(AbilityCategory.energySubstitution, text, []);
    }
    public static spell(spellLink: string, tradition: string): Ability {
        const text = `You can cast ${spellLink} once per day. If you are spellcaster, use your tradition and spell DC for this spell. Otherwise it belongs to the ${tradition} tradition and uses your class DC. The spell is cast at a rank equal to half the level of this item, rounded up.`;
        return new Ability(AbilityCategory.spell, text, []);
    }
    public static martialTalent(featLink: string): Ability {
        const text = `Once per day, at the start of your turn, you may gain the benefits of the ${featLink} feat for one round. You ignore all prerequisites of that feat and it gains the trait of your class instead of any other class traits.`;
        return new Ability(AbilityCategory.martialTalent, text, []);
    }
    public static alchemicalInfusion(itemLink: string): Ability {
        const text = `Once per day, you may spend one action to gain the effect of an ${itemLink} of a variant whose level is no higher than that of this item.`;
        return new Ability(AbilityCategory.alchemicalInfusion, text, []);
    }
    public static magicTrick(text: string, rulesElements: Array<RuleElementSource> = []): Ability {
        return new Ability(AbilityCategory.magicTrick, text, rulesElements);
    }
    public static restoration(conditionLink: string): Ability {
        const text = `Once per day, at the start of your turn, you may reduce the value of your ${conditionLink} condition by 1 or remove it if it has no value.`;
        return new Ability(AbilityCategory.restoration, text, []);
    }
    public static resistance(damageType: string, level: number): Ability {
        const resistanceAmount = resistanceByLevel[level-1];
        const text = `You gain resistance ${resistanceAmount} to ${damageType}.`;
        const re = {key: "Resistance", type: damageType, value: resistanceAmount};
        return new Ability(AbilityCategory.resistance, text, [re]);
    }
    public static skillEnhancement(skill: string, level: number): Ability {
        const itemBonus = itemBonusByLevel[level-1];
        const text = `You gain a +${itemBonus} item bonus to ${skill} checks.`;
        const re = {key: "FlatModifier", selector: skill, value: itemBonus, type: "item", requiresInvestment: true};
        return new Ability(AbilityCategory.skillEnhancement, text, [re]);
    }
    public static innateEffect(text: string, rulesElements: Array<RuleElementSource> = []): Ability {
        return new Ability(AbilityCategory.innateEffect, text, rulesElements);
    }
    public static replenishment(text: string, rulesElements: Array<RuleElementSource> = []): Ability {
        return new Ability(AbilityCategory.replenishment, text, rulesElements);
    }
    public static equipmentBond(text: string, rulesElements: Array<RuleElementSource> = []): Ability {
        return new Ability(AbilityCategory.equipmentBond, text, rulesElements);
    }
    public static rush(text: string, rulesElements: Array<RuleElementSource> = []): Ability {
        return new Ability(AbilityCategory.rush, text, rulesElements);
    }
}
