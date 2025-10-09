import { Ability } from "./model/ability.js";

// LEVEL 1

// 27 lesserSpell
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.gpzpAAAJ1Lza2JVl]{Detect Magic}", "arcane")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.WBmvzNDfpwka3qT4]{Light}", "arcane")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.vLzFcIaSXs7YTIqJ]{Message}", "arcane")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.TVKNbcgTee19PXZR]{Shield}", "arcane")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.zA0jNIBRgLsyTpbm]{Scatter Scree}", "arcane")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.pwzdSlJgYqN7bs2w]{Telekinetic Hand}", "arcane")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.Qw3fnUlaUbnn7ipC]{Prestidigitation}", "arcane")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.yvs1zN5Pai5U4CJX]{Summon Instrument}", "occult")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.60sgbuMWN0268dB7]{Telekinetic Projectile}", "occult")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.b5BQbwmuBhgPXTyi]{Haunting Hymn}", "occult")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.0zU8CPejjQFnhZFI]{Figment}", "occult")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.qwZBXN6zBoB9BHXE]{Divine Lance}", "divine")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.tXa5vOu5giBNCjdR]{Know the Way}", "divine")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.RA7VKcen3p56rVyZ]{Forbidding Ward}", "divine")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.izcxFQFwf3woCnFs]{Guidance}", "divine")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.kcelf6IHl3L9VXXg]{Vitality Lash}", "divine")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.mAMEt4FFbdqoRnkN]{Void Warp}", "divine")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.6DfLZBl8wKIV03Iq]{Ignition}", "primal")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.thAHF1zxNplLCJPO]{Caustic Blast}", "primal")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.kBhaPuzLUSwS6vVf]{Electric Arc}", "primal")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.D7ZEhTNIDWDLC2J4]{Puff of Poison}", "primal")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.eSL5hVT9gXrnRLtd]{Spout}", "primal")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.Vbj8bTQ1nwrOBbYF]{Live Wire}", "primal")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.IxhGEKl63R4QBvkj]{Frostbite}", "primal")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.dDiOnjcsBFbAvP6t]{Gale Blast}", "primal")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.MPxbKoR54gkYkqLO]{Gouging Claw}", "primal")
Ability.lesserSpell("@UUID[Compendium.pf2e.spells-srd.Item.uZK2BYzPnxUBnDjr]{Tangle Vine}", "primal")


// xx lesserInnateEffect
//@ts-ignore
Ability.lesserInnateEffect("Your Fist unarmed attack loses the Nonlethal trait. For the purposes of the @UUID[Compendium.pf2e.actionspf2e.Item.SjmKHgI7a5Z9JzBx]{Force Open} action, you always count as having a @UUID[Compendium.pf2e.equipment-srd.Item.44F1mfJei4GY8f2X]{Crowbar}.", [{fist: true, img: "systems/pf2e/icons/features/classes/powerful-fist.webp", key: "Strike"}, {itemId: "xxxxxxFISTxxxxxx", key: "ItemAlteration", mode: "remove", property: "traits", value: "nonlethal"}])
Ability.lesserInnateEffect("Once per day, when you roll a flat check and the result is a 4, you may reroll that flat check. This is a Fortune effect.", [])
Ability.lesserInnateEffect("While you have Darkvision, you can determine colors in darkness even better than you would be able to in bright light.", [])
Ability.lesserInnateEffect("You ignore difficult terrain from rubble or broken stonework.", [])
Ability.lesserInnateEffect("You ignore difficult terrain from plants, fungi and dense foliage.", [])
Ability.lesserInnateEffect("You ignore difficult terrain from shallow water, mud or marshland, as long as it is not too deep for you to stand with your head above the surface.", [])
Ability.lesserInnateEffect("You are particularly adept at ignoring danger. When you Avert Gaze, you can gain the +2 circumstance bonus against your choice of auditory or olfactory effects instead of visual.", [])
//@ts-ignore
Ability.lesserInnateEffect("While Sickened, instead of a status penalty, the Sickened condition grants you a status bonus to fortitude saves against olfactory or inhaled effects.", [{"key":"AdjustModifier","mode":"multiply","selector":"fortitude","predicate":[{"or":["item:trait:olfactory","item:trait:inhaled"]}],"slug":"sickened","value":-1}])
Ability.lesserInnateEffect("You constantly draw in moisture from the air around you. You do not need to drink.", [])
Ability.lesserInnateEffect("You can @UUID[Compendium.pf2e.actionspf2e.Item.3yoajuKjwHZ9ApUY]{Grab an Edge} while your hands are occupied. After doing so, for one round you can @UUID[Compendium.pf2e.actionspf2e.Item.pprgrYQ1QnIDGZiy]{Climb} to pull yourself up onto a ledge while your hands are occupied.", [])
Ability.lesserInnateEffect("Once per day, when an enemy escapes from your Grapple, you may @UUID[Compendium.pf2e.actionspf2e.Item.7blmbDrQFNfdT731]{Shove} that enemy as a reaction.", [])
Ability.lesserInnateEffect("", [])
Ability.lesserInnateEffect("", [])


// xx lesserEquipmentBond
Ability.lesserEquipmentBond("Once per day, as part of a Strike, you may grant the weapon you are using for that Strike the effect of a Potency Crystal of a level no higher than that of this item. @UUID[Compendium.pf2e.equipment-effects.Item.R5ugeFK3MPwkbv0s]{Effect: Potency Crystal}", [])
Ability.lesserEquipmentBond("Once per day, when you critically succeed at a Strike attack roll, your attack gains the critical specialization effect of the weapon or unarmed attack.", [])
Ability.lesserEquipmentBond("Once per day, when you @UUID[Compendium.pf2e.actionspf2e.Item.ge56Lu1xXVFYUnLP]{Trip} an enemy, you may deal @Damage[(@actor.abilities.str.mod)[bludgeoning]]{bludgeoning damage} equal to your Strength to the enemy.", [])
Ability.lesserEquipmentBond("Once per day, when you @UUID[Compendium.pf2e.actionspf2e.Item.XMcnh4cSI32tljXa]{Hide}, you may immediately Sneak using the same stealth check.", [])
Ability.lesserEquipmentBond("Once per day, when you critically fail at a check to @UUID[Compendium.pf2e.actionspf2e.Item.1kGNdIIhuglAjIp9]{Treat Wounds}, you get a failure instead.", [])
Ability.lesserEquipmentBond("", [])
Ability.lesserEquipmentBond("", [])
Ability.lesserEquipmentBond("", [])

// 12 energySubstitution
Ability.energySubstitution("acid")
Ability.energySubstitution("cold")
Ability.energySubstitution("electricity")
Ability.energySubstitution("fire")
Ability.energySubstitution("mental")
Ability.energySubstitution("poison")
Ability.energySubstitution("sonic")
Ability.energySubstitution("vitality")
Ability.energySubstitution("void")
Ability.energySubstitution("slashing")
Ability.energySubstitution("piercing")
Ability.energySubstitution("bludgeoning")


// LEVEL 3

// 24 spell rank 1/2
Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.Wu0xFpewMKRK3HG8]{Grease}", "arcane")
Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.Q7QQ91vQtyi1Ux36]{Jump}", "arcane")
Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.i35dpZFI7jZcRoBo]{Illusory Disguise}", "arcane")
Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.gKKqvLohtrSJj3BM]{Force Barrage}", "arcane")
Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.0qaqksrGGDj74HXE]{Revealing Light}", "arcane")
Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.mrDi3v933gsmnw25]{Telekinetic Maneuver}", "arcane")

Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.XSujb7EsSwKl19Uu]{Bless}", "divine")
Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.2iQKhCQBijhj5Rf3]{Infuse Vitality}", "divine")
Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.7ZinJNzxq0XF0oMx]{Bane}", "divine")
Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.gMODOGamz88rgHuf]{Protection}", "divine")
Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.WPu3UE3kTXSLqO40]{Spiritual Armament}", "divine")
Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.8Hw3P6eurX1MYm7L]{Dancing Shield}", "divine")

Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.TSyFZNAbqfkRrcq0]{Concordant Choir}", "occult")
Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.k34hDOfIIMAxNL4a]{Grim Tendrils}", "occult")
Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.qTr2oCgIXl703Whb]{Thoughtful Gift}", "occult")
Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.yHujiDQPdtXW797e]{Spirit Link}", "occult")
Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.XXqE1eY3w3z6xJCB]{Invisibility}", "occult")
Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.tlSE7Ly8vi1Dgddv]{Laughing Fit}", "occult")

Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.gfPjmG6Fe6D3MFjl]{Pest Form}", "primal")
Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.jfVCuOpzC6mUrf6f]{Hydraulic Push}", "primal")
Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.K9gI08enGtmih5X1]{Protector Tree}", "primal")
Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.zDJS8E66UI0himqV]{Thunderstrike}", "primal")
Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.wzctak6BxOW8xvFV]{Enlarge}", "primal")
Ability.spell("@UUID[Compendium.pf2e.spells-srd.Item.ZxHC7V7HtjUsB8zH]{Blazing Bolt}", "primal")


// 18 martial talent
Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.5FyvwI24mnROzh61]{Combat Assessment}")
Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.onde0SxLoxLBTnvm]{Double Slice}")
Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.mWCiu9Hl1WxajSLa]{Snagging Strike}")
Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.2xk4jdwcCfmasYfT]{Vicious Swing}")
Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.qQt3CMrhLkUV1wCv]{Sudden Charge}")
Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.UiQbjeqBUFjUtgUR]{Assisting Shot}")
Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.rTkr1EqpAN6YtnAh]{Lunge}")
Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.5SBFayX7JqKYANwa]{Rebounding Toss}")
Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.yAgFDUU8HfVK4KTy]{Dragging Strike}")
Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.f0fpsr8ZSNrWlfAt]{Set-Up Strike}")
Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.117d4Me9nAn1GMry]{Defensive Advance}")
Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.HtLFPJeL0QTDLEfq]{Shoulder Check}")
Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.qFt6zyWVX1njJf1l]{Quick Draw}")
Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.BmAk6o14CutgnIOG]{Risky Reload}")
Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.SheifYobjKqyK3Fv]{Tamper}")
Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.OiY0L3WvjwlQQ4iG]{Strong Arm}")
Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.9XALeVNcmlIxf3tJ]{Twin Feint}")
Ability.martialTalent("@UUID[Compendium.pf2e.feats-srd.Item.5My8JBXkQru8m2n1]{Dastardly Dash}")


// 14 alchemicalInfusion
Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.9F3d43xMDCJNIkDo]{Bendy-Arm Mutagen (Lesser)}")
Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.IQK9N2mEOyAj3iWU]{Bestial Mutagen (Lesser)}")
Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.tyt6rFtv32MZ4DT9]{Cheetah&#x27;s Elixir (Lesser)}")
Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.wbr6rkyaVYnDhdgV]{Cognitive Mutagen (Lesser)}")
Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.GS4YvQieBS11JNYR]{Drakeheart Mutagen (Lesser)}")
Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.7Y2yOr4ltpP2tyuL]{Eagle Eye Elixir (Lesser)}")
Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.mbrwudO35tItsldq]{Energy Mutagen (Lesser)}")
Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.JPALWW3w4z8STAYV]{Deadweight Mutagen (Lesser)}")
Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.bOPQDM54W8ZDoULY]{Serene Mutagen (Lesser)}")
Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.YwRAHWW8yUI07sy9]{Silvertongue Mutagen (Lesser)}")
Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.e2II4yMBFBqVivnk]{Bottled Catharsis (Minor)}")
Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.5MKBwpE401uz4kNN]{Quicksilver Mutagen (Lesser)}")
Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.yE7PPagK0wsHMA8l]{Surging Serum (Minor)}")
Ability.alchemicalInfusion("@UUID[Compendium.pf2e.equipment-srd.Item.zM9VX3QwM81DzDUA]{Bravo&#x27;s Brew (Lesser)}")


// xx magicTrick
Ability.magicTrick("", [])


// LEVEL 5

// xx spell rank 3
Ability.spell("", "arcane")


// 10 restoration
Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.AdPVz7rbaVSRxHFg]{Fascinated}")
Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.i3OJZU2nk64Df3xm]{Clumsy}")
Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.yblD8fOR1J8rDwEQ]{Confused}")
Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.TkIyaNPgTZFBCCuh]{Dazzled}")
Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.9PR9y0bi4JPKnHPR]{Deafened}")
Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.TBSHQspnbcqxsmjL]{Frightened}")
Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.fesd1n5eVhpCSS18]{Sickened}")
Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.e1XGnhKNSQIm5IXg]{Stupefied}")
Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.Yl48xTdMh3aeQYL2]{Wounded}")
Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.HL2l2VRSaQHu9lUw]{Fatigued}")


// 16 skillEnhancement
Ability.skillEnhancement("acrobatics", 5)
Ability.skillEnhancement("arcana", 5)
Ability.skillEnhancement("athletics", 5)
Ability.skillEnhancement("crafting", 5)
Ability.skillEnhancement("deception", 5)
Ability.skillEnhancement("diplomacy", 5)
Ability.skillEnhancement("intimidation", 5)
Ability.skillEnhancement("medicine", 5)
Ability.skillEnhancement("nature", 5)
Ability.skillEnhancement("occultism", 5)
Ability.skillEnhancement("performance", 5)
Ability.skillEnhancement("religion", 5)
Ability.skillEnhancement("society", 5)
Ability.skillEnhancement("stealth", 5)
Ability.skillEnhancement("survival", 5)
Ability.skillEnhancement("thievery", 5)


// 10 resistance
Ability.resistance("acid", 5)
Ability.resistance("bleed", 5)
Ability.resistance("cold", 5)
Ability.resistance("electricity", 5)
Ability.resistance("fire", 5)
Ability.resistance("mental", 5)
Ability.resistance("poison", 5)
Ability.resistance("sonic", 5)
Ability.resistance("vitality", 5)
Ability.resistance("void", 5)


// xx innateEffect
//@ts-ignore
Ability.innateEffect("Your features become indistinct. You do not need a Disguise Kit to Impersonate. You gain a +2 circumstance bonus to deception checks to Impersonate, but suffer a -2 circumstance penalty to diplomacy checks to Make an Impression.", [{key: "FlatModifier", selector: "deception", value: 2, type: "circumstance", predicate: ["action:impersonate"]}, {key: "FlatModifier", selector: "diplomacy", value: -2, type: "circumstance", predicate: ["action:make-an-impression"]}])
Ability.innateEffect("XXX1/day Cast without triggeringXXX", [])
Ability.innateEffect("", [])
Ability.innateEffect("", [])
Ability.innateEffect("", [])


// LEVEL 7

// xx spell rank 4
Ability.spell("", "arcane")

// xx martial talent
Ability.martialTalent("")

// xx magicTrick
Ability.magicTrick("", [])

// xx replenishment
Ability.replenishment("", [])

// xx equipmentBond
Ability.equipmentBond("Once per minute, when you activate a piece of ammunition, you may do so using one fewer action than normal.", [])
Ability.equipmentBond("", [])

// xx rush
Ability.rush("", [])


// LEVEL 9

// 6 restoration
Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.XgEqL1kFApUbl5Z2]{Blinded}")
Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.3uh1r86TzbQvosxv]{Doomed}")
Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.6uEgoh53GbXuHpTF]{Paralyzed}")
Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.xYTAsEpcJE1Ccni3]{Slowed}")
Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.dfCMdR4wnpbYNTix]{Stunned}")
Ability.restoration("@UUID[Compendium.pf2e.conditionitems.Item.9qGBRpbX9NEwtAAr]{Controlled}")


// xx spell rank 5
Ability.spell("", "arcane")


// xx martial talent
Ability.martialTalent("")


// xx magicTrick
Ability.magicTrick("", [])