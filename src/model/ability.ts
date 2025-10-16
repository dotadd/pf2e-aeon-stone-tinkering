import { RuleElementSource } from "foundry-pf2e";
import { itemBonusByLevel, itemDcByLevel, resistanceByLevel } from "../data/data.js";

export enum AbilityCategory {
    // Level 1+
    lesserSpell = "Lesser Spell",
    lesserInnateEffect = "Lesser Innate Effect",
    lesserEquipmentBond = "Lesser Equipment Bond",
    energySubstitution = "Energy Substitution",
    // Level 3+
    spell = "Spell",
    martialTalent = "Martial Talent",
    alchemicalInfusion = "Alchemical Infusion",
    magicTrick = "Magic Trick",
    // Level 5+
    restoration = "Restoration",
    resistance = "Resistance",
    skillEnhancement = "Skill Enhancement",
    innateEffect = "Innate Effect",
    // Level 7+
    replenishment = "Replenishment",
    equipmentBond = "Equipment Bond",
    rush = "Rush",
}


export interface RawAbility {
    category: AbilityCategory,
    name: string,
    text: string,
    rulesElements: Array<RuleElementSource>,
}

export class Ability {
    constructor(
        public category: AbilityCategory,
        public name: string,
        public text: string,
        public rulesElements: Array<RuleElementSource>,
    ) {}

    public static fromRaw(rawAbility: RawAbility): Ability {
        return new Ability(rawAbility.category, rawAbility.name, rawAbility.text, rawAbility.rulesElements);
    }

    public scale(level: number): Ability {
        const dc = itemDcByLevel[level-1];
        const itemBonus = itemBonusByLevel[level-1];
        const resistance = resistanceByLevel[level-1];

        // fully account for item bonuses (to skills, because that's the only kind used)
        if (this.category === AbilityCategory.skillEnhancement) {
            this.text = this.text.replace(/\+[0-9] item bonus/, `+${itemBonus} item bonus`);
            for (let i = 0; i < this.rulesElements.length; i++) {
                if (this.rulesElements[i].key === "FlatModifier") {
                    //@ts-ignore
                    this.rulesElements[i].value = itemBonus;
                }
            }
        }

        // fully account for resistances
        if (this.category === AbilityCategory.resistance) {
            this.text = this.text.replace(/resistance [0-9]+ to/, `resistance ${resistance} to`);
            for (let i = 0; i < this.rulesElements.length; i++) {
                if (this.rulesElements[i].key === "Resistance") {
                    //@ts-ignore
                    this.rulesElements[i].value = resistance;
                }
            }
        }

        // substitute any DCs in plain text and in @Check syntax
        this.text = this.text.replace(/DC [0-9]+/, "DC " + dc);
        this.text = this.text.replace(/(@Check\[.*?)(dc:[0-9]+)(.*?\])/, "$1" + "dc:" + dc + "$3");

        return this;
    }

    public formatAbilityText(): string {
        return `<p><strong>${this.name} (${this.category})</strong></p><p>${this.text}</p>`;
    }

    public static lesserSpell(spellLink: string, tradition: string): Ability {
        const name = spellLink.replace(/@UUID\[.*\]\{(.*)\}/, "$1");
        const text = `You can cast the ${spellLink} cantrip. If you are spellcaster, use your tradition and spell DC for this spell. Otherwise it belongs to the ${tradition} tradition and uses your class DC.`;
        return new Ability(AbilityCategory.lesserSpell, name, text, []);
    }
    public static lesserInnateEffect(name: string, text: string, rulesElements: Array<RuleElementSource> = []): Ability {
        return new Ability(AbilityCategory.lesserInnateEffect, name, text, rulesElements);
    }
    public static lesserEquipmentBond(name: string, text: string, rulesElements: Array<RuleElementSource> = []): Ability {
        return new Ability(AbilityCategory.lesserEquipmentBond, name, text, rulesElements);
    }
    public static energySubstitution(energyType: string): Ability {
        const name = `${energyType.charAt(0).toUpperCase()}${energyType.slice(1)} Substitution`;
        const text = `Once per hour, when you Cast a Spell or use an action that deals energy damage, you may replace that energy damage with ${energyType} damage.`;
        return new Ability(AbilityCategory.energySubstitution, name, text, []);
    }
    public static spell(spellLink: string, tradition: string): Ability {
        const name = spellLink.replace(/@UUID\[.*\]\{(.*)\}/, "$1");
        const text = `You can cast ${spellLink} once per day. If you are spellcaster, use your tradition and spell DC for this spell. Otherwise it belongs to the ${tradition} tradition and uses your class DC. The spell is cast at a rank equal to half the level of this item, rounded up.`;
        return new Ability(AbilityCategory.spell, name, text, []);
    }
    public static martialTalent(featLink: string): Ability {
        const name = featLink.replace(/@UUID\[.*\]\{(.*)\}/, "$1");
        const text = `Once per hour, at the start of your turn, you may gain the benefits of the ${featLink} feat for one round. You ignore all prerequisites of that feat and it gains the trait of your class instead of any other class traits.`;
        return new Ability(AbilityCategory.martialTalent, name, text, []);
    }
    public static alchemicalInfusion(itemLink: string): Ability {
        let name = itemLink.replace(/@UUID\[.*\]\{(.*)\}/, "$1");
        name = name.replace(/(.*)\(.*\)/, "$1");
        const text = `Once per day, you may spend one action to gain the effect of an ${itemLink} of a variant whose level is no higher than that of this item.`;
        return new Ability(AbilityCategory.alchemicalInfusion, name, text, []);
    }
    public static magicTrick(name: string, text: string, rulesElements: Array<RuleElementSource> = []): Ability {
        return new Ability(AbilityCategory.magicTrick, name, text, rulesElements);
    }
    public static restoration(conditionLink: string): Ability {
        let name = conditionLink.replace(/@UUID\[.*\]\{(.*)\}/, "$1");
        name = name + " Restoration";
        const text = `Once per day, at the start of your turn, you may reduce the value of your ${conditionLink} condition by 1 or remove it if it has no value.`;
        return new Ability(AbilityCategory.restoration, name, text, []);
    }
    public static resistance(damageType: string, level: number): Ability {
        const name = `${damageType.charAt(0).toUpperCase()}${damageType.slice(1)} Resistance`;
        const resistanceAmount = resistanceByLevel[level-1];
        const text = `You gain resistance ${resistanceAmount} to ${damageType}.`;
        const re = {key: "Resistance", type: damageType, value: resistanceAmount, requiresInvestment: true};
        return new Ability(AbilityCategory.resistance, name, text, [re]);
    }
    public static skillEnhancement(skill: string, level: number): Ability {
        const name = `Enhanced ${skill.charAt(0).toUpperCase()}${skill.slice(1)}`;
        const itemBonus = itemBonusByLevel[level-1];
        const text = `You gain a +${itemBonus} item bonus to ${skill} checks.`;
        const re = {key: "FlatModifier", selector: skill, value: itemBonus, type: "item", requiresInvestment: true};
        return new Ability(AbilityCategory.skillEnhancement, name, text, [re]);
    }
    public static innateEffect(name: string, text: string, rulesElements: Array<RuleElementSource> = []): Ability {
        return new Ability(AbilityCategory.innateEffect, name, text, rulesElements);
    }
    public static replenishment(name: string, text: string, rulesElements: Array<RuleElementSource> = []): Ability {
        return new Ability(AbilityCategory.replenishment, name, text, rulesElements);
    }
    public static equipmentBond(name: string, text: string, rulesElements: Array<RuleElementSource> = []): Ability {
        return new Ability(AbilityCategory.equipmentBond, name, text, rulesElements);
    }
    public static rush(name: string, text: string, rulesElements: Array<RuleElementSource> = []): Ability {
        return new Ability(AbilityCategory.rush, name, text, rulesElements);
    }
}
