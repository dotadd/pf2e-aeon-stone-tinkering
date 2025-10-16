import { l1EnergySubstitution, l1LesserEquipmentBond, l1LesserInnateEffect, l1LesserSpell, l3AlchemicalInfusion, l3MagicTrick, l3MartialTalent, l3Spell, l5InnateEffect, l5MartialTalent, l5Resistance, l5Restoration, l5SkillEnhancement, l5Spell, l7EquipmentBond, l7Replenishment, l7Rush, l7Spell, } from "./createAbilities.js";
import { aeonStoneColor } from "./data/data.js";
import { AbilityCategory } from "./model/ability.js";
import { Impurity } from "./model/impurity.js";
import { Lattice } from "./model/lattice.js";
import { Mold } from "./model/mold.js";
export async function getCreationContext(compendium) {
    const pack = game.packs.get(compendium);
    if (!pack) {
        throw new Error("Could not get compendium pack for module.");
    }
    //@ts-ignore
    let componentFolder = pack.folders.getName("Components");
    if (!componentFolder) {
        //@ts-ignore
        componentFolder = await Folder.create({ name: "Components", sorting: "m", type: "Item" }, { pack: compendium });
    }
    // Doing this cleanly is not worth the time
    //@ts-ignore
    let latticeFolder = pack.folders.getName("Lattices");
    if (!latticeFolder) {
        //@ts-ignore
        latticeFolder = await Folder.create({ name: "Lattices", sorting: "m", type: "Item", folder: componentFolder }, { pack: compendium });
    }
    //@ts-ignore
    let moldFolder = pack.folders.getName("Molds");
    if (!moldFolder) {
        //@ts-ignore
        moldFolder = await Folder.create({ name: "Molds", sorting: "m", type: "Item", folder: componentFolder }, { pack: compendium });
    }
    //@ts-ignore
    let impurityFolder = pack.folders.getName("Impurities");
    if (!impurityFolder) {
        //@ts-ignore
        impurityFolder = await Folder.create({ name: "Impurities", sorting: "m", type: "Item", folder: componentFolder }, { pack: compendium });
    }
    if (!latticeFolder || !moldFolder || !impurityFolder) {
        throw new Error("Could not get or create compendium pack folders for module.");
    }
    for (let docIndex of latticeFolder.contents.concat(moldFolder.contents, impurityFolder.contents)) {
        if (!docIndex._id) {
            throw new Error("Document somehow without _id.");
        }
        let document = await pack.getDocument(docIndex._id);
        await document?.delete();
    }
    // why is _id even nullable???
    if (!latticeFolder._id || !moldFolder._id || !impurityFolder._id) {
        throw new Error("Compendium folder somehow does not have an _id.");
    }
    return {
        "latticeFolderId": latticeFolder._id,
        "moldFolderId": moldFolder._id,
        "impurityFolderId": impurityFolder._id,
    };
}
const lattices = [
    Lattice.fromDefaults(1, "Amber Lattice", aeonStoneColor.amber, "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/amber.webp"),
    Lattice.fromDefaults(3, "Pearl Lattice", aeonStoneColor.pearlyWhite, "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/saltwater-pearl.webp"),
    Lattice.fromDefaults(5, "Malachite Lattice", aeonStoneColor.greenPatterned, "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/jade.webp"),
    Lattice.fromDefaults(7, "Opal Lattice", aeonStoneColor.opaline, "systems/pf2e/icons/equipment/treasure/gems/lesser-precious-stones/opal.webp"),
    Lattice.fromDefaults(9, "Sodalite Lattice", aeonStoneColor.speckledBlue, "systems/pf2e/icons/equipment/treasure/gems/lesser-semiprecious-stones/lapis-lazuli.webp"),
    Lattice.fromDefaults(11, "Hematite Lattice", aeonStoneColor.redStreakedBlack, "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/garnet.webp"),
    Lattice.fromDefaults(13, "Sugilite Lattice", aeonStoneColor.flatPurple, "systems/pf2e/icons/equipment/other/spellhearts/perfect-droplet.webp"),
    Lattice.fromDefaults(15, "Aquamarine Lattice", aeonStoneColor.radiantBlue, "systems/pf2e/icons/equipment/treasure/gems/lesser-precious-stones/aquamarine.webp"),
    Lattice.fromDefaults(17, "Alexandrite Lattice", aeonStoneColor.shifting, "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/amethyst.webp"),
    Lattice.fromDefaults(19, "Diamond Lattice", aeonStoneColor.brilliant, "systems/pf2e/icons/equipment/treasure/gems/greater-precious-stones/large-diamond.webp"),
];
const molds = [
    Mold.fromDefaults(1, "Oblong Mold", [AbilityCategory.lesserInnateEffect], [AbilityCategory.lesserSpell], "Oblong"),
    Mold.fromDefaults(1, "Triangular Mold", [AbilityCategory.energySubstitution], [AbilityCategory.lesserSpell], "Triangle"),
    Mold.fromDefaults(1, "Torus Mold", [AbilityCategory.lesserInnateEffect], [AbilityCategory.lesserEquipmentBond], "Torus"),
    Mold.fromDefaults(3, "Rhomboid Mold", [AbilityCategory.energySubstitution, AbilityCategory.energySubstitution], [AbilityCategory.spell], "Rhombus"),
    Mold.fromDefaults(3, "Prismatic Mold", [AbilityCategory.lesserEquipmentBond, AbilityCategory.lesserEquipmentBond], [AbilityCategory.martialTalent], "Prism"),
    Mold.fromDefaults(3, "Cylindrical Mold", [AbilityCategory.martialTalent], [AbilityCategory.alchemicalInfusion], "Cylinder"),
    Mold.fromDefaults(3, "Hemispherical Mold", [AbilityCategory.magicTrick], [AbilityCategory.spell], "Hemisphere"),
    Mold.fromDefaults(3, "Trapezoidal Mold", [AbilityCategory.alchemicalInfusion], [AbilityCategory.spell], "Trapezoid"),
    Mold.fromDefaults(3, "Square Mold", [AbilityCategory.spell], [AbilityCategory.lesserSpell, AbilityCategory.lesserSpell], "Square"),
    Mold.fromDefaults(3, "Ellitical Mold", [AbilityCategory.magicTrick], [AbilityCategory.martialTalent], "Ellipse"),
    Mold.fromDefaults(5, "Pyramid Mold", [AbilityCategory.restoration], [AbilityCategory.resistance], "Pyramid"),
    Mold.fromDefaults(5, "Pentagonal Mold", [AbilityCategory.resistance], [AbilityCategory.spell, AbilityCategory.lesserSpell], "Pentagon"),
    Mold.fromDefaults(5, "Cuboid Mold", [AbilityCategory.skillEnhancement], [AbilityCategory.restoration], "Cuboid"),
    Mold.fromDefaults(5, "Crescent Mold", [AbilityCategory.innateEffect], [AbilityCategory.martialTalent, AbilityCategory.alchemicalInfusion], "Crescent"),
    Mold.fromDefaults(5, "Spherical Mold", [AbilityCategory.magicTrick, AbilityCategory.magicTrick], [AbilityCategory.spell, AbilityCategory.lesserSpell], "Sphere"),
    Mold.fromDefaults(5, "Spiral Mold", [AbilityCategory.resistance], [AbilityCategory.energySubstitution, AbilityCategory.energySubstitution], "Spiral"),
    Mold.fromDefaults(5, "Dome Mold", [AbilityCategory.skillEnhancement], [AbilityCategory.alchemicalInfusion, AbilityCategory.alchemicalInfusion], "Dome"),
    Mold.fromDefaults(7, "Conical Mold", [AbilityCategory.replenishment], [AbilityCategory.restoration, AbilityCategory.alchemicalInfusion], "Cone"),
    Mold.fromDefaults(7, "Star Mold", [AbilityCategory.equipmentBond], [AbilityCategory.rush], "Star"),
    Mold.fromDefaults(7, "Hexagonal Mold", [AbilityCategory.rush], [AbilityCategory.magicTrick, AbilityCategory.magicTrick], "Hexagon"),
    Mold.fromDefaults(7, "Cubical Mold", [AbilityCategory.equipmentBond], [AbilityCategory.lesserEquipmentBond, AbilityCategory.lesserEquipmentBond], "Cube"),
    Mold.fromDefaults(7, "Helical Mold", [AbilityCategory.replenishment], [AbilityCategory.spell, AbilityCategory.spell], "Helix"),
    Mold.fromDefaults(7, "Dual Crescent Mold", [AbilityCategory.martialTalent, AbilityCategory.martialTalent], [AbilityCategory.rush], "Dual Crescent"),
];
const impurities = [
    // level 1
    Impurity.fromDefaults(1, "Rock Salt", [l1LesserSpell[2], l1LesserInnateEffect[0], l1LesserEquipmentBond[6], l1EnergySubstitution[0]], "systems/pf2e/icons/equipment/consumables/oils/aligned-oil.webp"),
    Impurity.fromDefaults(1, "Acetic Acid", [l1LesserSpell[18], l1LesserInnateEffect[9], l1LesserEquipmentBond[4], l1EnergySubstitution[1]], "systems/pf2e/icons/equipment/consumables/oils/nectar-of-purification.webp"),
    Impurity.fromDefaults(1, "Aqua Vitae", [l1LesserSpell[16], l1LesserInnateEffect[11], l1LesserEquipmentBond[0], l1EnergySubstitution[4]], "systems/pf2e/icons/equipment/consumables/other-consumables/black-powder-keg.webp"),
    Impurity.fromDefaults(1, "Porous Limestone", [l1LesserSpell[3], l1LesserInnateEffect[10], l1LesserEquipmentBond[7], l1EnergySubstitution[9]], "systems/pf2e/icons/equipment/adventuring-gear/chalk.webp"),
    Impurity.fromDefaults(1, "Artisanal Soap", [l1LesserSpell[6], l1LesserInnateEffect[6], l1LesserEquipmentBond[9]], "systems/pf2e/icons/equipment/adventuring-gear/soap.webp"),
    Impurity.fromDefaults(1, "Bitter Holly Infusion", [l1LesserSpell[26], l1LesserInnateEffect[5], l1LesserEquipmentBond[1], l1EnergySubstitution[10]], "systems/pf2e/icons/equipment/adventuring-gear/holly-and-mistletoe.webp"),
    Impurity.fromDefaults(1, "Silver Laurel Leaf", [l1LesserSpell[12], l1LesserInnateEffect[2], l1LesserEquipmentBond[8], l1EnergySubstitution[2]], "systems/pf2e/icons/equipment/worn-items/apex-items/circlet-of-persuasion.webp"),
    Impurity.fromDefaults(1, "Pure White Wax", [l1LesserSpell[0], l1LesserInnateEffect[7], l1LesserEquipmentBond[11], l1EnergySubstitution[7]], "systems/pf2e/icons/equipment/adventuring-gear/candle.webp"),
    Impurity.fromDefaults(1, "Glassy Chert", [l1LesserSpell[8], l1LesserInnateEffect[12], l1LesserEquipmentBond[12], l1EnergySubstitution[6]], "systems/pf2e/icons/equipment/adventuring-gear/flint-and-steel.webp"),
    // level 3
    Impurity.fromDefaults(3, "High-Sucrose Jelly", [l1LesserEquipmentBond[5], l1EnergySubstitution[5], l3Spell[18], l3AlchemicalInfusion[10]], "systems/pf2e/icons/equipment/worn-items/other-worn-items/aeon-stone-pink-rhomboid.webp"),
    Impurity.fromDefaults(3, "Naphtha", [l1LesserSpell[1], l1EnergySubstitution[8], l3Spell[0], l3MartialTalent[13], l3AlchemicalInfusion[6]], "systems/pf2e/icons/equipment/adventuring-gear/oil.webp"),
    Impurity.fromDefaults(3, "Starfish Mucus", [l1LesserInnateEffect[3], l1LesserEquipmentBond[3], l3Spell[13], l3MartialTalent[2], l3MagicTrick[11]], "systems/pf2e/icons/equipment/adventuring-gear/jellyfish-lamp.webp"),
    Impurity.fromDefaults(3, "Pure Capsaicin", [l1LesserInnateEffect[1], l3Spell[23], l3MartialTalent[4], l3AlchemicalInfusion[12], l3MagicTrick[2]], "systems/pf2e/icons/equipment/alchemical-items/alchemical-tapas/dragons-blood-pudding.webp"),
    Impurity.fromDefaults(3, "Barbed Algae", [l1EnergySubstitution[3], l3Spell[19], l3MartialTalent[9], l3AlchemicalInfusion[3], l3MagicTrick[1]], "systems/pf2e/icons/equipment/worn-items/other-worn-items/wig-of-holding.webp"),
    Impurity.fromDefaults(3, "Coal Tar", [l1LesserSpell[13], l1LesserEquipmentBond[10], l3Spell[8], l3MartialTalent[11], l3MagicTrick[0]], "systems/pf2e/icons/equipment/alchemical-items/alchemical-poisons/lifeblight-residue.webp"),
    Impurity.fromDefaults(3, "Strangely Shiny Pebble", [l1LesserInnateEffect[4], l1LesserEquipmentBond[2], l3Spell[4], l3MartialTalent[0], l3MagicTrick[4]], "systems/pf2e/icons/equipment/alchemical-items/alchemical-bombs/thunderstone.webp"),
    Impurity.fromDefaults(3, "Dried Ashleaf", [l1LesserSpell[14], l3Spell[9], l3AlchemicalInfusion[8], l3MagicTrick[3]], "systems/pf2e/icons/equipment/alchemical-items/drugs/refined-pesh.webp"),
    Impurity.fromDefaults(3, "Bear Claw Clippings", [l1LesserSpell[25], l3MagicTrick[10], l3MartialTalent[15], l3AlchemicalInfusion[1]], "systems/pf2e/icons/spells/pack-attack.webp"),
    Impurity.fromDefaults(3, "Cobalt Pigment", [l1LesserSpell[22], l3Spell[2], l3MartialTalent[14], l3MagicTrick[6]], "systems/pf2e/icons/equipment/alchemical-items/alchemical-tools/body-recovery-kit.webp"),
    Impurity.fromDefaults(3, "Grave Rose", [l3MartialTalent[10], l1LesserSpell[9], l3Spell[6], l3MagicTrick[8]], "systems/pf2e/icons/equipment/cursed-items/rose-of-loves-lost.webp"),
    Impurity.fromDefaults(3, "River Drake Scale", [l1LesserSpell[19], l3Spell[21], l3MartialTalent[5], l3MagicTrick[5]], "systems/pf2e/icons/equipment/consumables/other-consumables/bubbling-scale.webp"),
    Impurity.fromDefaults(3, "Mycotoxic Spores", [l1LesserSpell[20], l3Spell[17], l3MartialTalent[3]], "systems/pf2e/icons/equipment/alchemical-items/alchemical-poisons/addlebrain.webp"),
    Impurity.fromDefaults(3, "Wizard's Gold", [l1LesserSpell[5], l3MagicTrick[8], l3Spell[1], l3MartialTalent[17]], "systems/pf2e/icons/equipment/adventuring-gear/cookware.webp"),
    Impurity.fromDefaults(3, "Ooze of Uncertain Origin", [l1LesserSpell[7], l3AlchemicalInfusion[0], l3Spell[16], l3MartialTalent[16]], "systems/pf2e/icons/equipment/alchemical-items/alchemical-poisons/cytillesh-oil.webp"),
    Impurity.fromDefaults(3, "Perfect Shell", [l1LesserSpell[21], l3Spell[12], l3MartialTalent[12], l3AlchemicalInfusion[4]], "systems/pf2e/icons/equipment/treasure/gems/lesser-semiprecious-stones/shell.webp"),
    Impurity.fromDefaults(3, "Glowcap Gills", [l1LesserSpell[23], l3Spell[7], l3MartialTalent[9], l1LesserInnateEffect[8]], "systems/pf2e/icons/equipment/alchemical-items/drugs/cytillesh.webp"),
    Impurity.fromDefaults(3, "Mystery Powder", [l1LesserSpell[11], l3Spell[3], l3MartialTalent[6]], "systems/pf2e/icons/equipment/alchemical-items/alchemical-bombs/tanglefoot-bag.webp"),
    Impurity.fromDefaults(3, "Flame Petals", [l1LesserSpell[17], l3Spell[15], l3AlchemicalInfusion[9], l1LesserEquipmentBond[13]], "systems/pf2e/icons/equipment/alchemical-items/alchemical-tools/sunrod.webp"),
    Impurity.fromDefaults(3, "Pure Black Wax", [l1LesserSpell[10], l3Spell[10], l3MartialTalent[7], l3AlchemicalInfusion[7]], "systems/pf2e/icons/equipment/consumables/other-consumables/candle-of-revealing.webp"),
    Impurity.fromDefaults(3, "Powdered Fulminant", [l1LesserSpell[24], l3Spell[22], l3MartialTalent[1], l3AlchemicalInfusion[2]], "systems/pf2e/icons/equipment/alchemical-items/alchemical-poisons/mage-bane.webp"),
    Impurity.fromDefaults(3, "Seedpod of Potential", [l1LesserSpell[15], l1EnergySubstitution[11], l3Spell[20], l3AlchemicalInfusion[5]], "systems/pf2e/icons/equipment/structures/gourd-home.webp"),
    Impurity.fromDefaults(3, "Barely Shifting Ooze", [l1LesserInnateEffect[13], l3Spell[14], l3MagicTrick[9], l3AlchemicalInfusion[11]], "systems/pf2e/icons/equipment/alchemical-items/alchemical-poisons/lethargy-poison.webp"),
    Impurity.fromDefaults(3, "Djezet", [l3Spell[11], l3AlchemicalInfusion[13], l3MartialTalent[18], l3MagicTrick[16]], "systems/pf2e/icons/equipment/materials/djezet-mass.webp"),
    Impurity.fromDefaults(3, "Perfect Pitch", [l3Spell[5], l3AlchemicalInfusion[14], l3MartialTalent[19], l3MagicTrick[12]], "systems/pf2e/icons/equipment/alchemical-items/alchemical-bombs/redpitch-bomb.webp"),
    // level 5
    Impurity.fromDefaults(5, "Elemental Earth", [l1LesserSpell[4], l3MagicTrick[3], l5Spell[7], l5InnateEffect[1], l5Restoration[8]], "systems/pf2e/icons/equipment/worn-items/other-worn-items/fleshgem-earthspeaker.webp"),
    Impurity.fromDefaults(5, "Quicksilver", [l5Spell[4], l5Restoration[9], l5SkillEnhancement[0], l5InnateEffect[3], l5MartialTalent[1]], "systems/pf2e/icons/equipment/alchemical-items/alchemical-poisons/isolation-draught.webp"),
    Impurity.fromDefaults(5, "Sighted Mustard Seeds", [l5Spell[5], l5Restoration[3], l5Resistance[5], l5InnateEffect[6]], "systems/pf2e/icons/equipment/consumables/talismans/eye-of-apprehension.webp"),
    Impurity.fromDefaults(5, "Demonic Sulfur", [l3MagicTrick[14], l5Spell[3], l5SkillEnhancement[4], l5InnateEffect[5]], "systems/pf2e/icons/equipment/alchemical-items/alchemical-tools/sun-orchid-poultice.webp"),
    Impurity.fromDefaults(5, "Sacred Serpent Oil", [l3MagicTrick[13], l5Restoration[5], l5SkillEnhancement[11]], "systems/pf2e/icons/equipment/alchemical-items/alchemical-tools/snake-oil.webp"),
    Impurity.fromDefaults(5, "Nightglow Moss", [l5Spell[2], l5Restoration[2], l5SkillEnhancement[13], l5InnateEffect[2]], "systems/pf2e/icons/equipment/alchemical-items/alchemical-poisons/lich-dust.webp"),
    Impurity.fromDefaults(5, "Elemental Air", [l5Spell[7], l5Restoration[1], l5SkillEnhancement[5], l5MartialTalent[2]], "systems/pf2e/icons/equipment/held-items/bottled-air.webp"),
    Impurity.fromDefaults(5, "Crystal Ball Shard", [l3MagicTrick[15], l5Spell[0], l5Restoration[0], l5SkillEnhancement[9]], "systems/pf2e/icons/spells/unrelenting-observation.webp"),
    Impurity.fromDefaults(3, "Psychoactive Toad Secretions", [l3MagicTrick[17], l5Spell[1], l5Restoration[7], l5SkillEnhancement[8]], "systems/pf2e/icons/spells/baleful-polymorph.webp"),
    Impurity.fromDefaults(5, "Darkwood Shavings", [l5SkillEnhancement[3], l5Restoration[6], l5MartialTalent[3], l5Resistance[7]], "systems/pf2e/icons/equipment/materials/darkwood-lumber.webp"),
    Impurity.fromDefaults(5, "Microcalligraphy Beads", [l5SkillEnhancement[1], l5Resistance[9], l5InnateEffect[4], l5InnateEffect[10]], "systems/pf2e/icons/equipment/held-items/holy-prayer-beads.webp"),
    Impurity.fromDefaults(5, "Cesium", [l5SkillEnhancement[2], l5Resistance[2], l5InnateEffect[12], l5MartialTalent[4]], "systems/pf2e/icons/equipment/alchemical-items/alchemical-elixirs/quicksilver-mutagen.webp"),
    Impurity.fromDefaults(5, "Elemental Water", [l5Restoration[4], l5SkillEnhancement[7], l5Resistance[8], l5InnateEffect[13]], "systems/pf2e/icons/equipment/alchemical-items/alchemical-tools/ghost-ink.webp"),
    Impurity.fromDefaults(5, "Asp Venom", [l5SkillEnhancement[12], l5Resistance[6], l5InnateEffect[9], l5InnateEffect[16], l5MartialTalent[6]], "systems/pf2e/icons/equipment/alchemical-items/alchemical-bombs/acid-flask.webp"),
    Impurity.fromDefaults(5, "Flourescent Nettle", [l5SkillEnhancement[15], l5Resistance[0], l5InnateEffect[0], l5InnateEffect[14]], "systems/pf2e/icons/spells/aromatic-lure.webp"),
    Impurity.fromDefaults(5, "Eternal Ice", [l5SkillEnhancement[6], l5Resistance[4], l5InnateEffect[17], l5MartialTalent[0]], "systems/pf2e/icons/spells/clinging-ice.webp"),
    Impurity.fromDefaults(5, "Sapphire Seed", [l5SkillEnhancement[10], l5Resistance[3], l5InnateEffect[8], l5MartialTalent[5]], "systems/pf2e/icons/equipment/treasure/gems/greater-precious-stones/star-sapphire.webp"),
    Impurity.fromDefaults(5, "Autumn Break Leaf", [l5SkillEnhancement[14], l5Resistance[1], l5InnateEffect[7], l5InnateEffect[15]], "icons/consumables/plants/leaf-pink.webp"),
    // level 7
    Impurity.fromDefaults(7, "Highly Concentrated Caffeine", [l5InnateEffect[11], l7Spell[0], l7Replenishment[0], l7EquipmentBond[1], l7Rush[4]], "systems/pf2e/icons/equipment/alchemical-items/alchemical-elixirs/prey-mutagen.webp"),
    Impurity.fromDefaults(7, "Maelstrom Matter", [], "systems/pf2e/icons/equipment/snares/glittering-snare-effect.webp"),
    Impurity.fromDefaults(7, "Skeleton's Tears", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-bombs/dread-ampoule.webp"),
    Impurity.fromDefaults(7, "Microscopic Snowglobe", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-bombs/alignment-ampoule.webp"),
    Impurity.fromDefaults(7, "Homunculus Swears", [], "systems/pf2e/icons/equipment/worn-items/companion-items/hosteling-statuette.webp"),
    Impurity.fromDefaults(7, "Rectangular Essence", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-elixirs/leapers-elixir.webp"),
    Impurity.fromDefaults(7, "Planar Void", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-poisons/lifeblight-residue.webp"),
    Impurity.fromDefaults(7, "Planar Vitality", [], "systems/pf2e/icons/spells/summon-healing-servitor.webp"),
    Impurity.fromDefaults(7, "Writhing Mass", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-poisons/mindfog-mist.webp"),
    // level 9
    Impurity.fromDefaults(9, "Black Vortex Bead", [], "systems/pf2e/icons/equipment/artifacts/sphere-of-annihilation.webp"),
    Impurity.fromDefaults(9, "Phoenix Down", [], "systems/pf2e/icons/equipment/consumables/talismans/balisse-feather.webp"),
    Impurity.fromDefaults(9, "Absence of Potion", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-elixirs/malleable-mixture.webp"),
    Impurity.fromDefaults(9, "Adamantineoxide", [], "systems/pf2e/icons/equipment/materials/adamantine-chunk.webp"),
    Impurity.fromDefaults(9, "Hypnotic Candy", [], "systems/pf2e/icons/equipment/alchemical-items/drugs/grolna.webp"),
    Impurity.fromDefaults(9, "Spark of Inspiration", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-bombs/bottled-lightning.webp"),
    Impurity.fromDefaults(9, "Pacified Abysium", [], "systems/pf2e/icons/equipment/materials/abysium-chunk.webp"),
    Impurity.fromDefaults(9, "Blessed Water", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-bombs/bottled-sunlight.webp"),
];
export async function createComponentType(compendium, folder, components) {
    let items = [];
    for (const component of components) {
        const item = await component.toItem(compendium, folder);
        if (!item) {
            throw new Error("Error creating item: " + component.name);
        }
        items.push(item);
    }
    if (!items) {
        throw new Error("Error creating items.");
    }
    return items;
}
export async function createComponents(compendium = "pf2e-aeon-stone-tinkering.pf2e-aeon-stone-tinkering-items") {
    const folderIds = await getCreationContext(compendium);
    const latticeItems = await createComponentType(compendium, folderIds.latticeFolderId, lattices);
    const moldItems = await createComponentType(compendium, folderIds.moldFolderId, molds);
    const impurityItems = await createComponentType(compendium, folderIds.impurityFolderId, impurities);
    return { latticeItems: latticeItems, moldItems: moldItems, impurityItems: impurityItems };
}
//# sourceMappingURL=createCompendiumItems.js.map