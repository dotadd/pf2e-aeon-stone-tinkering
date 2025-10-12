import { itemBonusByLevel, itemDcByLevel, resistanceByLevel } from "../data/data.js";
export var AbilityCategory;
(function (AbilityCategory) {
    // Level 1+
    AbilityCategory["lesserSpell"] = "Lesser Spell";
    AbilityCategory["lesserInnateEffect"] = "Lesser Innate Effect";
    AbilityCategory["lesserEquipmentBond"] = "Lesser Equipment Bond";
    AbilityCategory["energySubstitution"] = "Energy Substitution";
    // Level 3+
    AbilityCategory["spell"] = "Spell";
    AbilityCategory["martialTalent"] = "Martial Talent";
    AbilityCategory["alchemicalInfusion"] = "Alchemical Infusion";
    AbilityCategory["magicTrick"] = "Magic Trick";
    // Level 5+
    AbilityCategory["restoration"] = "Restoration";
    AbilityCategory["resistance"] = "Resistance";
    AbilityCategory["skillEnhancement"] = "Skill Enhancement";
    AbilityCategory["innateEffect"] = "Innate Effect";
    // Level 7+
    AbilityCategory["replenishment"] = "Replenishment";
    AbilityCategory["equipmentBond"] = "Equipment Bond";
    AbilityCategory["rush"] = "Rush";
})(AbilityCategory || (AbilityCategory = {}));
export class Ability {
    category;
    name;
    text;
    rulesElements;
    constructor(category, name, text, rulesElements) {
        this.category = category;
        this.name = name;
        this.text = text;
        this.rulesElements = rulesElements;
    }
    scale(level) {
        const dc = itemDcByLevel[level - 1];
        const itemBonus = itemBonusByLevel[level - 1];
        const resistance = resistanceByLevel[level - 1];
        // fully account for item bonuses (to skills, because that's the only kind used)
        if (this.category === AbilityCategory.skillEnhancement) {
            this.text = this.text.replace(/\+[0-9] item bonus/, `+${itemBonus} item bonus`);
            for (let i = 0; i < this.rulesElements.length; i++) {
                if (this.rulesElements[i].key === "FlatModifier") {
                    //@ts-ignore
                    ability.rulesElements[i].value = itemBonus;
                }
            }
        }
        // fully account for resistances
        if (this.category === AbilityCategory.resistance) {
            this.text = this.text.replace(/resistance [0-9]* to/, `resistance ${resistance} to`);
            for (let i = 0; i < this.rulesElements.length; i++) {
                if (this.rulesElements[i].key === "Resistance") {
                    //@ts-ignore
                    ability.rulesElements[i].value = resistance;
                }
            }
        }
        // substitute any DCs in plain text and in @Check syntax
        this.text = this.text.replace(new RegExp("DC [0-9]*"), "DC " + dc);
        this.text = this.text.replace(new RegExp("(@Check\[.*?)(dc:[0-9]*)(.*?\])"), "$1" + "dc:" + dc + "$3");
        return this;
    }
    formatAbilityText() {
        return `<p><strong>${this.name} (${this.category})</strong></p><p>${this.text}</p>`;
    }
    static lesserSpell(spellLink, tradition) {
        const name = spellLink.replace(/@UUID\[.*\]\{(.*)\}/, "$1");
        const text = `You can cast the ${spellLink} cantrip. If you are spellcaster, use your tradition and spell DC for this spell. Otherwise it belongs to the ${tradition} tradition and uses your class DC.`;
        return new Ability(AbilityCategory.lesserSpell, name, text, []);
    }
    static lesserInnateEffect(name, text, rulesElements = []) {
        return new Ability(AbilityCategory.lesserInnateEffect, name, text, rulesElements);
    }
    static lesserEquipmentBond(name, text, rulesElements = []) {
        return new Ability(AbilityCategory.lesserEquipmentBond, name, text, rulesElements);
    }
    static energySubstitution(energyType) {
        const name = `${energyType.charAt(0).toUpperCase()}${energyType.slice(1)} Substitution`;
        const text = `Once per hour, when you Cast a Spell or use an action that deals energy damage, you may replace the damage type of that action with ${energyType}.`;
        return new Ability(AbilityCategory.energySubstitution, name, text, []);
    }
    static spell(spellLink, tradition) {
        const name = spellLink.replace(/@UUID\[.*\]\{(.*)\}/, "$1");
        const text = `You can cast ${spellLink} once per day. If you are spellcaster, use your tradition and spell DC for this spell. Otherwise it belongs to the ${tradition} tradition and uses your class DC. The spell is cast at a rank equal to half the level of this item, rounded up.`;
        return new Ability(AbilityCategory.spell, name, text, []);
    }
    static martialTalent(featLink) {
        const name = featLink.replace(/@UUID\[.*\]\{(.*)\}/, "$1");
        const text = `Once per day, at the start of your turn, you may gain the benefits of the ${featLink} feat for one round. You ignore all prerequisites of that feat and it gains the trait of your class instead of any other class traits.`;
        return new Ability(AbilityCategory.martialTalent, name, text, []);
    }
    static alchemicalInfusion(itemLink) {
        let name = itemLink.replace(/@UUID\[.*\]\{(.*)\}/, "$1");
        name = name.replace(/(.*)\(.*\)/, "$1");
        const text = `Once per day, you may spend one action to gain the effect of an ${itemLink} of a variant whose level is no higher than that of this item.`;
        return new Ability(AbilityCategory.alchemicalInfusion, name, text, []);
    }
    static magicTrick(name, text, rulesElements = []) {
        return new Ability(AbilityCategory.magicTrick, name, text, rulesElements);
    }
    static restoration(conditionLink) {
        let name = conditionLink.replace(/@UUID\[.*\]\{(.*)\}/, "$1");
        name = name + " Restoration";
        const text = `Once per day, at the start of your turn, you may reduce the value of your ${conditionLink} condition by 1 or remove it if it has no value.`;
        return new Ability(AbilityCategory.restoration, name, text, []);
    }
    static resistance(damageType, level) {
        const name = `${damageType.charAt(0).toUpperCase()}${damageType.slice(1)} Resistance`;
        const resistanceAmount = resistanceByLevel[level - 1];
        const text = `You gain resistance ${resistanceAmount} to ${damageType}.`;
        const re = { key: "Resistance", type: damageType, value: resistanceAmount, requiresInvestment: true };
        return new Ability(AbilityCategory.resistance, name, text, [re]);
    }
    static skillEnhancement(skill, level) {
        const name = `Enhanced ${skill.charAt(0).toUpperCase()}${skill.slice(1)}`;
        const itemBonus = itemBonusByLevel[level - 1];
        const text = `You gain a +${itemBonus} item bonus to ${skill} checks.`;
        const re = { key: "FlatModifier", selector: skill, value: itemBonus, type: "item", requiresInvestment: true };
        return new Ability(AbilityCategory.skillEnhancement, name, text, [re]);
    }
    static innateEffect(name, text, rulesElements = []) {
        return new Ability(AbilityCategory.innateEffect, name, text, rulesElements);
    }
    static replenishment(name, text, rulesElements = []) {
        return new Ability(AbilityCategory.replenishment, name, text, rulesElements);
    }
    static equipmentBond(name, text, rulesElements = []) {
        return new Ability(AbilityCategory.equipmentBond, name, text, rulesElements);
    }
    static rush(name, text, rulesElements = []) {
        return new Ability(AbilityCategory.rush, name, text, rulesElements);
    }
}
//# sourceMappingURL=ability.js.map