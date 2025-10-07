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
}
//# sourceMappingURL=ability.js.map