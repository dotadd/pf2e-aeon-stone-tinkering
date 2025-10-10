import { Ability } from "./model/ability.js";

// LEVEL 1

// 27 lesserSpell
export const l1LesserSpell = [
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.gpzpAAAJ1Lza2JVl]{Detect Magic}", "arcane"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.WBmvzNDfpwka3qT4]{Light}", "arcane"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.vLzFcIaSXs7YTIqJ]{Message}", "arcane"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.TVKNbcgTee19PXZR]{Shield}", "arcane"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.zA0jNIBRgLsyTpbm]{Scatter Scree}", "arcane"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.pwzdSlJgYqN7bs2w]{Telekinetic Hand}", "arcane"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.Qw3fnUlaUbnn7ipC]{Prestidigitation}", "arcane"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.yvs1zN5Pai5U4CJX]{Summon Instrument}", "occult"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.60sgbuMWN0268dB7]{Telekinetic Projectile}", "occult"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.b5BQbwmuBhgPXTyi]{Haunting Hymn}", "occult"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.0zU8CPejjQFnhZFI]{Figment}", "occult"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.qwZBXN6zBoB9BHXE]{Divine Lance}", "divine"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.tXa5vOu5giBNCjdR]{Know the Way}", "divine"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.RA7VKcen3p56rVyZ]{Forbidding Ward}", "divine"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.izcxFQFwf3woCnFs]{Guidance}", "divine"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.kcelf6IHl3L9VXXg]{Vitality Lash}", "divine"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.mAMEt4FFbdqoRnkN]{Void Warp}", "divine"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.6DfLZBl8wKIV03Iq]{Ignition}", "primal"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.thAHF1zxNplLCJPO]{Caustic Blast}", "primal"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.kBhaPuzLUSwS6vVf]{Electric Arc}", "primal"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.D7ZEhTNIDWDLC2J4]{Puff of Poison}", "primal"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.eSL5hVT9gXrnRLtd]{Spout}", "primal"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.Vbj8bTQ1nwrOBbYF]{Live Wire}", "primal"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.IxhGEKl63R4QBvkj]{Frostbite}", "primal"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.dDiOnjcsBFbAvP6t]{Gale Blast}", "primal"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.MPxbKoR54gkYkqLO]{Gouging Claw}", "primal"),
    Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.uZK2BYzPnxUBnDjr]{Tangle Vine}", "primal"),
]


// 13 lesserInnateEffect
export const l1LesserInnateEffect = [
//@ts-ignore
    Ability.lesserInnateEffect("Powerful Fists", "Your Fist unarmed attack loses the Nonlethal trait. For the purposes of the @UUID[Compendium.pf2e.actionspf2e.Item.SjmKHgI7a5Z9JzBx]{Force Open} action, you always count as having a @UUID[Compendium.pf2e.equipment-srd.Item.44F1mfJei4GY8f2X]{Crowbar}.", [{fist: true, img: "systems/pf2e/icons/features/classes/powerful-fist.webp", key: "Strike"}, {itemId: "xxxxxxFISTxxxxxx", key: "ItemAlteration", mode: "remove", property: "traits", value: "nonlethal"}]),
    Ability.lesserInnateEffect("Mote of Luck", "Once per day, when you roll a flat check and the result is a 4, you may reroll that flat check. This is a Fortune effect.", []),
    Ability.lesserInnateEffect("Vibrant Darkvision", "While you have Darkvision, you can determine colors in darkness even better than you would be able to in bright light.", []),
    Ability.lesserInnateEffect("Stonestrider", "You ignore difficult terrain from rubble or broken stonework.", []),
    Ability.lesserInnateEffect("Woodstrider", "You ignore difficult terrain from plants, fungi and dense foliage.", []),
    Ability.lesserInnateEffect("Marshstrider", "You ignore difficult terrain from shallow water, mud or marshland, as long as it is not too deep for you to stand with your head above the surface.", []),
    Ability.lesserInnateEffect("Danger Aversion", "When you Avert Gaze, you can gain the +2 circumstance bonus against your choice of auditory or olfactory effects instead of visual. @UUID[Compendium.pf2e-aeon-stone-tinkering.pf2e-aeon-stone-tinkering-items.Item.GtODeEPTVeSpU6t0]{Effect: Danger Aversion}", []),
    //@ts-ignore
    Ability.lesserInnateEffect("Respiratory Response", "While Sickened, instead of a status penalty, the Sickened condition grants you a status bonus to fortitude saves against olfactory or inhaled effects.", [{"key":"AdjustModifier","mode":"multiply","selector":"fortitude","predicate":[{"or":["item:trait:olfactory","item:trait:inhaled"]}],"slug":"sickened","value":-1}]),
    Ability.lesserInnateEffect("Self-Moisturization", "You constantly draw in moisture from the air around you. You do not need to drink.", []),
    Ability.lesserInnateEffect("Gravitational Rappel", "You can @UUID[Compendium.pf2e.actionspf2e.Item.3yoajuKjwHZ9ApUY]{Grab an Edge} while your hands are occupied. After doing so, for one round you can @UUID[Compendium.pf2e.actionspf2e.Item.pprgrYQ1QnIDGZiy]{Climb} to pull yourself up onto a ledge while your hands are occupied.", []),
    Ability.lesserInnateEffect("Repulsion", "Once per day, when an enemy escapes from your Grapple, you may @UUID[Compendium.pf2e.actionspf2e.Item.7blmbDrQFNfdT731]{Shove} that enemy as a reaction.", []),
    Ability.lesserInnateEffect("Targeting Assist", "Once per day, when you make a flat check to target a @UUID[Compendium.pf2e.conditionitems.Item.DmAIPqOBomZ7H95W]{Concealed} or @UUID[Compendium.pf2e.conditionitems.Item.iU0fEDdBp3rXpTMC]{Hidden} creature, reduce the DC of that flat check by 5.", []),
    Ability.lesserInnateEffect("Taste Enhancer", "Once per day, when an elixir or potion restores hit points to you, it restores an additional [[/r 10]] hit points.", []),
]

// 13 lesserEquipmentBond
export const l1LesserEquipmentBond = [
    Ability.lesserEquipmentBond("Potency Surge", "Once per day, as part of a Strike, you may grant the weapon you are using for that Strike the effect of a Potency Crystal of a level no higher than that of this item. @UUID[Compendium.pf2e.equipment-effects.Item.R5ugeFK3MPwkbv0s]{Effect: Potency Crystal}", []),
    Ability.lesserEquipmentBond("Grievous Strike", "Once per day, when you critically succeed at a Strike attack roll, your attack gains the critical specialization effect of the weapon or unarmed attack.", []),
    Ability.lesserEquipmentBond("Hard Drop", "Once per day, when you @UUID[Compendium.pf2e.actionspf2e.Item.ge56Lu1xXVFYUnLP]{Trip} an enemy, you may deal @Damage[(@actor.abilities.str.mod)[bludgeoning]]{bludgeoning damage} equal to your Strength to the enemy.", []),
    Ability.lesserEquipmentBond("Timely Escape", "Once per day, when you @UUID[Compendium.pf2e.actionspf2e.Item.XMcnh4cSI32tljXa]{Hide}, you may immediately @UUID[Compendium.pf2e.actionspf2e.Item.VMozDqMMuK5kpoX4]{Sneak} using the same stealth check.", []),
    Ability.lesserEquipmentBond("Medical Stopgap", "Once per day, when you critically fail at a check to @UUID[Compendium.pf2e.actionspf2e.Item.1kGNdIIhuglAjIp9]{Treat Wounds}, you get a failure instead.", []),
    Ability.lesserEquipmentBond("Emergency Shield", "Once per day, you may use the @UUID[Compendium.pf2e.feats-srd.Item.jM72TjJ965jocBV8]{Shield Block} reaction, even if you do not have the prerequisite feat. If you do have the Shield Block general feat, you may once per day use it to reduce damage of any type, not just bludgeoning, piercing or slashing.", []),
    Ability.lesserEquipmentBond("Blunt Weapon", "Once per day, as a free action, you may grant a weapon you are wielding the Versatile: Bludgeoning trait for 1 minute.", []),
    Ability.lesserEquipmentBond("Sharpen Edge", "Once per day, as a free action, you may grant a weapon you are wielding the Versatile: Slashing trait for 1 minute.", []),
    Ability.lesserEquipmentBond("Use Pointy End", "Once per day, as a free action, you may grant a weapon you are wielding the Versatile: Piercing trait for 1 minute.", []),
    Ability.lesserEquipmentBond("Weightless Armor", "Once per day, as a free action, you may reduce the speed penalty of your armor by 5 feet until the end of your turn. This reduction is in addition to the one you might get for meeting the armor's strength requirement.", []),
    Ability.lesserEquipmentBond("Armored Tackle", "Once per day, you may attempt to @UUID[Compendium.pf2e.actionspf2e.Item.ge56Lu1xXVFYUnLP]{Trip} a creature despite having your hands full, as long as you are wearing heavy armor. When you do so, you also push the target 5 feet away from you on a success or 10 feet on a critical success.", []),
    Ability.lesserEquipmentBond("Repel Weapon", "Once per day, when an enemy misses you with a melee weapon Strike, if you have a free hand or are wielding a weapon with the Disarm trait, you can try to @UUID[Compendium.pf2e.actionspf2e.Item.Dt6B1slsBy8ipJu9]{Disarm} the enemy of that weapon as a reaction. You can even do so, if the enemy is not in your reach, as long as you are within reach of the enemy's weapon.", []),
    Ability.lesserEquipmentBond("Armored Vitals", "Once per day, when you are critically hit by a ranged Strike, if you are wearing medium or heavy armor, you can reduce the damage you suffer by an amount equal to 5 + the level of this item.", [])
]

// 12 energySubstitution
export const l1EnergySubstitution = [
    Ability.energySubstitution("acid"),
    Ability.energySubstitution("cold"),
    Ability.energySubstitution("electricity"),
    Ability.energySubstitution("fire"),
    Ability.energySubstitution("mental"),
    Ability.energySubstitution("poison"),
    Ability.energySubstitution("sonic"),
    Ability.energySubstitution("vitality"),
    Ability.energySubstitution("void"),
    Ability.energySubstitution("slashing"),
    Ability.energySubstitution("piercing"),
    Ability.energySubstitution("bludgeoning"),
]

// LEVEL 3

// 24 spell rank 1/2
export const l3Spell = [
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.Wu0xFpewMKRK3HG8]{Grease}", "arcane"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.Q7QQ91vQtyi1Ux36]{Jump}", "arcane"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.i35dpZFI7jZcRoBo]{Illusory Disguise}", "arcane"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.gKKqvLohtrSJj3BM]{Force Barrage}", "arcane"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.0qaqksrGGDj74HXE]{Revealing Light}", "arcane"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.mrDi3v933gsmnw25]{Telekinetic Maneuver}", "arcane"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.XSujb7EsSwKl19Uu]{Bless}", "divine"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.2iQKhCQBijhj5Rf3]{Infuse Vitality}", "divine"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.7ZinJNzxq0XF0oMx]{Bane}", "divine"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.gMODOGamz88rgHuf]{Protection}", "divine"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.WPu3UE3kTXSLqO40]{Spiritual Armament}", "divine"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.8Hw3P6eurX1MYm7L]{Dancing Shield}", "divine"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.TSyFZNAbqfkRrcq0]{Concordant Choir}", "occult"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.k34hDOfIIMAxNL4a]{Grim Tendrils}", "occult"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.qTr2oCgIXl703Whb]{Thoughtful Gift}", "occult"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.yHujiDQPdtXW797e]{Spirit Link}", "occult"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.XXqE1eY3w3z6xJCB]{Invisibility}", "occult"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.tlSE7Ly8vi1Dgddv]{Laughing Fit}", "occult"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.gfPjmG6Fe6D3MFjl]{Pest Form}", "primal"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.jfVCuOpzC6mUrf6f]{Hydraulic Push}", "primal"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.K9gI08enGtmih5X1]{Protector Tree}", "primal"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.zDJS8E66UI0himqV]{Thunderstrike}", "primal"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.wzctak6BxOW8xvFV]{Enlarge}", "primal"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.ZxHC7V7HtjUsB8zH]{Blazing Bolt}", "primal"),
]

// 18 martial talent
export const l3MartialTalent = [
    Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.5FyvwI24mnROzh61]{Combat Assessment}"),
    Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.onde0SxLoxLBTnvm]{Double Slice}"),
    Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.mWCiu9Hl1WxajSLa]{Snagging Strike}"),
    Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.2xk4jdwcCfmasYfT]{Vicious Swing}"),
    Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.qQt3CMrhLkUV1wCv]{Sudden Charge}"),
    Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.UiQbjeqBUFjUtgUR]{Assisting Shot}"),
    Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.rTkr1EqpAN6YtnAh]{Lunge}"),
    Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.5SBFayX7JqKYANwa]{Rebounding Toss}"),
    Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.yAgFDUU8HfVK4KTy]{Dragging Strike}"),
    Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.f0fpsr8ZSNrWlfAt]{Set-Up Strike}"),
    Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.117d4Me9nAn1GMry]{Defensive Advance}"),
    Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.HtLFPJeL0QTDLEfq]{Shoulder Check}"),
    Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.qFt6zyWVX1njJf1l]{Quick Draw}"),
    Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.BmAk6o14CutgnIOG]{Risky Reload}"),
    Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.SheifYobjKqyK3Fv]{Tamper}"),
    Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.OiY0L3WvjwlQQ4iG]{Strong Arm}"),
    Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.9XALeVNcmlIxf3tJ]{Twin Feint}"),
    Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.5My8JBXkQru8m2n1]{Dastardly Dash}"),
]


// 14 alchemicalInfusion
export const l3AlchemicalInfusion = [
    Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.9F3d43xMDCJNIkDo]{Bendy-Arm Mutagen (Lesser)}"),
    Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.IQK9N2mEOyAj3iWU]{Bestial Mutagen (Lesser)}"),
    Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.tyt6rFtv32MZ4DT9]{Cheetah's Elixir (Lesser)}"),
    Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.wbr6rkyaVYnDhdgV]{Cognitive Mutagen (Lesser)}"),
    Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.GS4YvQieBS11JNYR]{Drakeheart Mutagen (Lesser)}"),
    Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.7Y2yOr4ltpP2tyuL]{Eagle Eye Elixir (Lesser)}"),
    Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.mbrwudO35tItsldq]{Energy Mutagen (Lesser)}"),
    Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.JPALWW3w4z8STAYV]{Deadweight Mutagen (Lesser)}"),
    Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.bOPQDM54W8ZDoULY]{Serene Mutagen (Lesser)}"),
    Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.YwRAHWW8yUI07sy9]{Silvertongue Mutagen (Lesser)}"),
    Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.e2II4yMBFBqVivnk]{Bottled Catharsis (Minor)}"),
    Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.5MKBwpE401uz4kNN]{Quicksilver Mutagen (Lesser)}"),
    Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.yE7PPagK0wsHMA8l]{Surging Serum (Minor)}"),
    Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.zM9VX3QwM81DzDUA]{Bravo's Brew (Lesser)}"),
]


// xx magicTrick
export const l3MagicTrick = [
    Ability.magicTrick("Poison Thoughts", "Once per hour, when you cast a spell with the poison trait, use an action with the poison trait or attack with a poisoned weapon and would force exactly one creature to make a fortitude save, you may replace the poison trait with the mental trait, any poison damage with mental damage and the fortitude save with a will save.", []),
    Ability.magicTrick("Dousing Spell", "Once per hour, you can use the @UUID[Compendium.pf2e.feats-srd.Item.nroOy0PBeEUGdUXD]{Dousing Spell} spellshape. Instead of applying it to a spell, you may apply it to any activity that takes at least two actions and has the Water trait.", []),
    Ability.magicTrick("", "", []),
    Ability.magicTrick("", "", []),
    Ability.magicTrick("", "", []),
    Ability.magicTrick("", "", []),
    Ability.magicTrick("", "", []),
    Ability.magicTrick("", "", []),
    Ability.magicTrick("", "", []),
    Ability.magicTrick("", "", []),
    Ability.magicTrick("", "", []),
    Ability.magicTrick("", "", []),
]

// LEVEL 5

// 8 spell rank 3
export const l5Spell = [
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.06pzGkKTyPE3tHR8]{Gravity Well}", "arcane"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.I0j56TNRmGcTyoqJ]{Shared Invisibility}", "arcane"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.0JWyMwVnLxX9CDYQ]{Rouse Skeletons}", "divine"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.DyiD239dNS7RIxZE]{Holy Light}", "divine"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.ZYoC630tNGutgbE0]{Hypercognition}", "occult"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.AMEu5zzLN7uCX645]{Ghostly Weapon}", "occult"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.9AAkVUCwF6WVNNY2]{Lightning Bolt}", "primal"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.gPvtmKMRpg9I9D7H]{Earthbind}", "primal"),
]

// 10 restoration
export const l5Restoration = [
    Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.AdPVz7rbaVSRxHFg]{Fascinated}"),
    Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.i3OJZU2nk64Df3xm]{Clumsy}"),
    Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.yblD8fOR1J8rDwEQ]{Confused}"),
    Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.TkIyaNPgTZFBCCuh]{Dazzled}"),
    Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.9PR9y0bi4JPKnHPR]{Deafened}"),
    Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.TBSHQspnbcqxsmjL]{Frightened}"),
    Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.fesd1n5eVhpCSS18]{Sickened}"),
    Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.e1XGnhKNSQIm5IXg]{Stupefied}"),
    Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.Yl48xTdMh3aeQYL2]{Wounded}"),
    Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.HL2l2VRSaQHu9lUw]{Fatigued}"),
]

// 16 skillEnhancement
export const l5SkillEnhancement = [
    Ability.skillEnhancement("acrobatics", 5),
    Ability.skillEnhancement("arcana", 5),
    Ability.skillEnhancement("athletics", 5),
    Ability.skillEnhancement("crafting", 5),
    Ability.skillEnhancement("deception", 5),
    Ability.skillEnhancement("diplomacy", 5),
    Ability.skillEnhancement("intimidation", 5),
    Ability.skillEnhancement("medicine", 5),
    Ability.skillEnhancement("nature", 5),
    Ability.skillEnhancement("occultism", 5),
    Ability.skillEnhancement("performance", 5),
    Ability.skillEnhancement("religion", 5),
    Ability.skillEnhancement("society", 5),
    Ability.skillEnhancement("stealth", 5),
    Ability.skillEnhancement("survival", 5),
    Ability.skillEnhancement("thievery", 5),
]

// 10 resistance
export const l5Resistance = [
    Ability.resistance("acid", 5),
    Ability.resistance("bleed", 5),
    Ability.resistance("cold", 5),
    Ability.resistance("electricity", 5),
    Ability.resistance("fire", 5),
    Ability.resistance("mental", 5),
    Ability.resistance("poison", 5),
    Ability.resistance("sonic", 5),
    Ability.resistance("vitality", 5),
    Ability.resistance("void", 5),
]

// xx innateEffect
export const l5InnateEffect = [
    //@ts-ignore
    Ability.innateEffect("Indistinct Features", "You do not need a Disguise Kit to Impersonate. You gain a +2 circumstance bonus to deception checks to Impersonate, but suffer a -2 circumstance penalty to diplomacy checks to Make an Impression.", [{key: "FlatModifier", selector: "deception", value: 2, type: "circumstance", predicate: ["action:impersonate"]}, {key: "FlatModifier", selector: "diplomacy", value: -2, type: "circumstance", predicate: ["action:make-an-impression"]}]),
    Ability.innateEffect("", "", []),
    //@ts-ignore
    Ability.innateEffect("Steady Footwork", "You gain a +1 circumstance bonus to your Fortitude or Reflex DC against attempts to @UUID[Compendium.pf2e.actionspf2e.Item.lOE4yjUnETTdaf2T]{Reposition}, @UUID[Compendium.pf2e.actionspf2e.Item.7blmbDrQFNfdT731]{Shove}, or @UUID[Compendium.pf2e.actionspf2e.Item.ge56Lu1xXVFYUnLP]{Trip} you. This bonus also applies to saving throws against spells or effects that attempt to force you to move or knock you @UUID[Compendium.pf2e.conditionitems.Item.j91X7x0XSomq8d60]{Prone}.", [{hideIfDisabled: true, key: "FlatModifier", label: "PF2E.SkillVariant.VsShoveOrTrip", predicate: [{or: ["action:shove","action:trip","action:reposition"]}], selector: ["fortitude", "reflex"], type: "circumstance", value: 1},{key: "FlatModifier",label: "PF2E.SkillVariant.VsProne",predicate: ["inflicts:prone"],selector: "saving-throw",type: "circumstance",value: 1}]),
    Ability.innateEffect("", "", []),
    Ability.innateEffect("", "", []),
    Ability.innateEffect("", "", []),
    Ability.innateEffect("", "", []),
    Ability.innateEffect("", "", []),
]


// LEVEL 7

// 8 spell rank 4
export const l7Spell = [
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.zR67Rt3UMHKC5evy]{Flicker}", "arcane"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.VlNcjmYyu95vOUe8]{Translocate}", "arcane"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.hVU9msO9yGkxKZ3J]{Divine Wrath}", "divine"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.gfKhtVsXF3HKSdmY]{Seal Fate}", "divine"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.V8wXOsoejQhe6CyG]{Vapor Form}", "occult"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.FwW2asotQE8dH1WP]{Whispers of the Void}", "occult"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.YrzBLPLd3r9m6t1p]{Fire Shield}", "primal"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.kHyjQbibRGPNCixx]{Ice Storm}", "primal"),
]

// xx martial talent
export const l7MartialTalent = [
    Ability.martialTalent(""),
    Ability.martialTalent(""),
    Ability.martialTalent(""),
    Ability.martialTalent(""),
    Ability.martialTalent(""),
]

// xx magicTrick
export const l7MagicTrick = [
    Ability.magicTrick("Practiced Spellshapes", "If you have the @UUID[Compendium.pf2e.feats-srd.Item.BWomK7EVY0WXxWgh]{Reach Spell} or @UUID[Compendium.pf2e.feats-srd.Item.FoWO4RnHRwfEIC7Q]{Widen Spell} spellshapes, you may once per day use either one of them as a free action.", []),
    Ability.magicTrick("", "", []),
    Ability.magicTrick("", "", []),
    Ability.magicTrick("", "", []),
    Ability.magicTrick("", "", []),
    Ability.magicTrick("", "", []),
]


// xx replenishment
export const l7Replenishment = [
    Ability.replenishment("Instant Focus", "Once per day, as a free action, you can regain an expended focus point.", []),
    Ability.replenishment("Persistent Grandeur", "Once per day, after you expend @UUID[Compendium.pf2e.classfeatures.Item.LzYi0OuOoypNb6jd]{Panache}, expel your @UUID[Compendium.pf2e.classfeatures.Item.GtxSH6TudkQoKToW]{Divine Spark} from an Ikon or lose a similar power-up state, you immediately regain it.", []),
    Ability.replenishment("Practiced Spellcraft", "Once per day, as a free action you can regain the use of a spell slot that is at least 2 ranks below your highest ranked spell slot. You can use that regained spell slot only until the end of your turn, at which point it is lost.", []),
    Ability.replenishment("", "", []),
    Ability.replenishment("", "", []),
]

// xx equipmentBond
export const l7EquipmentBond = [
    Ability.equipmentBond("Automatic Initialization", "Once per round, when you activate a piece of ammunition, you may do so using one fewer action than normal.", []),
    Ability.equipmentBond("Featherweight", "Once per day, when you are knocked @UUID[Compendium.pf2e.conditionitems.Item.j91X7x0XSomq8d60]{Prone}, if you are wearing light or no armor, you may immediately Stand as a free action that does not provoke reactions.", []),
    Ability.equipmentBond("Furious Weapon", "Once per day, as a free action you may grant a weapon you are wielding the Forceful and Sweep traits until the end of your turn. @UUID[Compendium.pf2e-aeon-stone-tinkering.pf2e-aeon-stone-tinkering-items.Item.gIHsGwUGxQYOBui3]{Effect: Furious Weapon}", []),
    Ability.equipmentBond("", "", []),
    Ability.equipmentBond("", "", []),
    Ability.equipmentBond("", "", []),
    Ability.equipmentBond("", "", []),
    Ability.equipmentBond("", "", []),
]

// xx rush
export const l7Rush = [
    Ability.rush("", "", []),
    Ability.rush("", "", []),
    Ability.rush("", "", []),
    Ability.rush("", "", []),
    Ability.rush("", "", []),
]


// LEVEL 9

// 6 restoration
export const l9Restoration = [
    Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.XgEqL1kFApUbl5Z2]{Blinded}"),
    Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.3uh1r86TzbQvosxv]{Doomed}"),
    Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.6uEgoh53GbXuHpTF]{Paralyzed}"),
    Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.xYTAsEpcJE1Ccni3]{Slowed}"),
    Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.dfCMdR4wnpbYNTix]{Stunned}"),
    Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.9qGBRpbX9NEwtAAr]{Controlled}"),
]

// 8 spell rank 5
export const l9Spell = [
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.Y3qZrvZrqPuGJ2hk]{Shock and Awe}", "arcane"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.TCk2MDwf5L5OYjFC]{Cloak of Colors}", "arcane"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.IqJ9URobmJ9L9UBG]{Shadow Blast}", "divine"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.Ek5XI0aEdZhBgm21]{Scouting Eye}", "divine"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.vuehhQN8gPSpqcEK]{Instant Minefield}", "occult"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.tpLTLbJUrYcMWGld]{Telekinetic Haul}", "occult"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.BlfOg9Ceymgjstjm]{Corrosive Muck}", "primal"),
    Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.xxWhyl81w3ckslAU]{Howling Blizzard}", "primal"),
]

// xx martial talent
export const l9MartialTalent = [
    Ability.martialTalent(""),
    Ability.martialTalent(""),
    Ability.martialTalent(""),
    Ability.martialTalent(""),
    Ability.martialTalent(""),
    Ability.martialTalent(""),
]


// xx magicTrick
export const l9MagicTrick = [
    Ability.magicTrick("Defensive Casting", "<span class=\"action-glyph\">f</span> (Concentrate, Spellshape) Once per day, when your next action is to Cast a Spell, remove the Manipulate trait from it.", []),
    Ability.magicTrick("", "", []),
    Ability.magicTrick("", "", []),
    Ability.magicTrick("", "", []),
    Ability.magicTrick("", "", []),
]