import { itemBonusByLevel, resistanceByLevel } from "../data/numberTables.js";
export var AbilityCategory;
(function (AbilityCategory) {
    AbilityCategory["lesserSpell"] = "Lesser Spell";
    AbilityCategory["lesserInnateEffect"] = "Lesser Innate Effect";
    AbilityCategory["lesserEquipmentBond"] = "Lesser Equipment Bond";
    AbilityCategory["energySubstitution"] = "Energy Substitution";
    AbilityCategory["spell"] = "Spell";
    AbilityCategory["martialTalent"] = "Martial Talent";
    AbilityCategory["alchemicalInfusion"] = "Alchemical Infusion";
    AbilityCategory["magicTrick"] = "Magic Trick";
    AbilityCategory["restoration"] = "Restoration";
    AbilityCategory["resistance"] = "Resistance";
    AbilityCategory["skillEnhancement"] = "Skill Enhancement";
    AbilityCategory["innateEffect"] = "Innate Effect";
    AbilityCategory["replenishment"] = "Replenishment";
    AbilityCategory["equipmentBond"] = "Equipment Bond";
    AbilityCategory["rush"] = "Rush";
})(AbilityCategory || (AbilityCategory = {}));
export class Ability {
    category;
    text;
    rulesElements;
    constructor(category, text, rulesElements) {
        this.category = category;
        this.text = text;
        this.rulesElements = rulesElements;
    }
    static lesserSpell(spellLink, tradition) {
        const text = `You can cast the ${spellLink} cantrip. If you are spellcaster, use your tradition and spell DC for this spell. Otherwise it belongs to the ${tradition} tradition and uses your class DC.`;
        return new Ability(AbilityCategory.lesserSpell, text, []);
    }
    static lesserInnateEffect(text, rulesElements = []) {
        return new Ability(AbilityCategory.lesserInnateEffect, text, rulesElements);
    }
    static lesserEquipmentBond(text, rulesElements = []) {
        return new Ability(AbilityCategory.lesserEquipmentBond, text, rulesElements);
    }
    static energySubstitution(energyType) {
        const text = `Once per hour, when you Cast a Spell or use an action that deals energy damage, you may replace the damage type of that action with ${energyType}.`;
        return new Ability(AbilityCategory.energySubstitution, text, []);
    }
    static spell(spellLink, tradition) {
        const text = `You can cast ${spellLink} once per day. If you are spellcaster, use your tradition and spell DC for this spell. Otherwise it belongs to the ${tradition} tradition and uses your class DC. The spell is cast at a rank equal to half the level of this item, rounded up.`;
        return new Ability(AbilityCategory.spell, text, []);
    }
    static martialTalent(featLink) {
        const text = `Once per day, at the start of your turn, you may gain the benefits of the ${featLink} feat for one round. You ignore all prerequisites of that feat and it gains the trait of your class instead of any other class traits.`;
        return new Ability(AbilityCategory.martialTalent, text, []);
    }
    static alchemicalInfusion(itemLink) {
        const text = `Once per day, you may spend one action to gain the effect of an ${itemLink} of a variant whose level is no higher than that of this item.`;
        return new Ability(AbilityCategory.alchemicalInfusion, text, []);
    }
    static magicTrick(text, rulesElements = []) {
        return new Ability(AbilityCategory.magicTrick, text, rulesElements);
    }
    static restoration(conditionLink) {
        const text = `Once per day, at the start of your turn, you may reduce the value of your ${conditionLink} condition by 1 or remove it if it has no value.`;
        return new Ability(AbilityCategory.restoration, text, []);
    }
    static resistance(damageType, level) {
        const resistanceAmount = resistanceByLevel[level - 1];
        const text = `You gain resistance ${resistanceAmount} to ${damageType}.`;
        const re = { key: "Resistance", type: damageType, value: resistanceAmount };
        return new Ability(AbilityCategory.resistance, text, [re]);
    }
    static skillEnhancement(skill, level) {
        const itemBonus = itemBonusByLevel[level - 1];
        const text = `You gain a +${itemBonus} item bonus to ${skill} checks.`;
        const re = { key: "FlatModifier", selector: skill, value: itemBonus, type: "item", requiresInvestment: true };
        return new Ability(AbilityCategory.skillEnhancement, text, [re]);
    }
    static innateEffect(text, rulesElements = []) {
        return new Ability(AbilityCategory.innateEffect, text, rulesElements);
    }
    static replenishment(text, rulesElements = []) {
        return new Ability(AbilityCategory.replenishment, text, rulesElements);
    }
    static equipmentBond(text, rulesElements = []) {
        return new Ability(AbilityCategory.equipmentBond, text, rulesElements);
    }
    static rush(text, rulesElements = []) {
        return new Ability(AbilityCategory.rush, text, rulesElements);
    }
}
//# sourceMappingURL=ability.js.map