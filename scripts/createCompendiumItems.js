import { l1EnergySubstitution, l1LesserEquipmentBond, l1LesserInnateEffect, l1LesserSpell, } from "./createAbilities.js";
import { AbilityCategory } from "./model/ability.js";
import { Impurity } from "./model/impurity.js";
import { Lattice } from "./model/lattice.js";
import { Mold } from "./model/mold.js";
export function createComponents(compendium = "pf2e-aeon-stone-tinkering.pf2e-aeon-stone-tinkering-items") {
    const folderIds = getCreationContext(compendium);
    createLattices(compendium, folderIds.latticeFolderId);
    createMolds(compendium, folderIds.moldFolderId);
    createImpurities(compendium, folderIds.impurityFolderId);
}
function getCreationContext(compendium) {
    const pack = game.packs.get(compendium);
    if (!pack) {
        throw new Error("Could not get compendium pack for module.");
    }
    // Doing this cleanly is not worth the time
    //@ts-ignore
    const latticeFolder = pack.folders.getName("Lattices");
    //@ts-ignore
    const moldFolder = pack.folders.getName("Molds");
    //@ts-ignore
    const impurityFolder = pack.folders.getName("Impurities");
    if (!latticeFolder || !moldFolder || !impurityFolder) {
        throw new Error("Could not get compendium pack folders for module.");
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
export function createLattices(compendium, folder) {
    Lattice.fromDefaults(1, "Amber Lattice", "Amber", "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/amber.webp").toItem(compendium, folder);
    Lattice.fromDefaults(3, "Pearl Lattice", "Pearly White", "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/saltwater-pearl.webp").toItem(compendium, folder);
    Lattice.fromDefaults(5, "Malachite Lattice", "Green-Patterned", "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/jade.webp").toItem(compendium, folder);
    Lattice.fromDefaults(7, "Opal Lattice", "Opaline", "systems/pf2e/icons/equipment/treasure/gems/lesser-precious-stones/opal.webp").toItem(compendium, folder);
    Lattice.fromDefaults(9, "Sodalite Lattice", "Speckled Blue", "systems/pf2e/icons/equipment/treasure/gems/lesser-semiprecious-stones/lapis-lazuli.webp").toItem(compendium, folder);
    Lattice.fromDefaults(11, "Hematite Lattice", "Red-Streaked Black", "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/garnet.webp").toItem(compendium, folder);
    Lattice.fromDefaults(13, "Sugilite Lattice", "Flat Purple", "systems/pf2e/icons/equipment/other/spellhearts/perfect-droplet.webp").toItem(compendium, folder);
    Lattice.fromDefaults(15, "Aquamarine Lattice", "Brilliant Blue", "systems/pf2e/icons/equipment/treasure/gems/lesser-precious-stones/aquamarine.webp").toItem(compendium, folder);
    Lattice.fromDefaults(17, "Alexandrite Lattice", "Shifting", "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/amethyst.webp").toItem(compendium, folder);
    Lattice.fromDefaults(19, "Diamond Lattice", "Brilliant", "systems/pf2e/icons/equipment/treasure/gems/greater-precious-stones/large-diamond.webp").toItem(compendium, folder);
}
export function createMolds(compendium, folder) {
    Mold.fromDefaults(1, "Oblong Mold", [AbilityCategory.lesserInnateEffect], [AbilityCategory.lesserSpell], "Oblong").toItem(compendium, folder);
    Mold.fromDefaults(1, "Triangle Mold", [AbilityCategory.energySubstitution], [AbilityCategory.lesserSpell], "Triangle").toItem(compendium, folder);
    Mold.fromDefaults(1, "Torus Mold", [AbilityCategory.lesserInnateEffect], [AbilityCategory.lesserEquipmentBond], "Torus").toItem(compendium, folder);
    Mold.fromDefaults(3, "Rhombus Mold", [AbilityCategory.energySubstitution, AbilityCategory.energySubstitution], [AbilityCategory.spell], "Rhombus").toItem(compendium, folder);
    Mold.fromDefaults(3, "Prism Mold", [AbilityCategory.lesserEquipmentBond, AbilityCategory.lesserEquipmentBond], [AbilityCategory.martialTalent], "Prism").toItem(compendium, folder);
    Mold.fromDefaults(3, "Cylinder Mold", [AbilityCategory.martialTalent], [AbilityCategory.alchemicalInfusion], "Cylinder").toItem(compendium, folder);
    Mold.fromDefaults(3, "Hemisphere Mold", [AbilityCategory.magicTrick], [AbilityCategory.spell], "Hemisphere").toItem(compendium, folder);
    Mold.fromDefaults(3, "Trapezoid Mold", [AbilityCategory.alchemicalInfusion], [AbilityCategory.spell], "Trapezoid").toItem(compendium, folder);
    Mold.fromDefaults(3, "Square Mold", [AbilityCategory.spell], [AbilityCategory.lesserSpell, AbilityCategory.lesserSpell], "Square").toItem(compendium, folder);
    Mold.fromDefaults(3, "Ellipse Mold", [AbilityCategory.magicTrick], [AbilityCategory.martialTalent], "Ellipse").toItem(compendium, folder);
    Mold.fromDefaults(5, "Pyramid Mold", [AbilityCategory.restoration], [AbilityCategory.resistance], "Pyramid").toItem(compendium, folder);
    Mold.fromDefaults(5, "Pentagon Mold", [AbilityCategory.resistance], [AbilityCategory.spell, AbilityCategory.lesserSpell], "Pentagon").toItem(compendium, folder);
    Mold.fromDefaults(5, "Cuboid Mold", [AbilityCategory.skillEnhancement], [AbilityCategory.restoration], "Cuboid").toItem(compendium, folder);
    Mold.fromDefaults(5, "Crescent Mold", [AbilityCategory.innateEffect], [AbilityCategory.martialTalent, AbilityCategory.alchemicalInfusion], "Crescent").toItem(compendium, folder);
    Mold.fromDefaults(5, "Sphere Mold", [AbilityCategory.magicTrick, AbilityCategory.magicTrick], [AbilityCategory.spell, AbilityCategory.lesserSpell], "Sphere").toItem(compendium, folder);
    Mold.fromDefaults(5, "Kite Mold", [AbilityCategory.resistance], [AbilityCategory.energySubstitution, AbilityCategory.energySubstitution], "Kite").toItem(compendium, folder);
    Mold.fromDefaults(5, "Dome Mold", [AbilityCategory.skillEnhancement], [AbilityCategory.alchemicalInfusion, AbilityCategory.alchemicalInfusion], "Dome").toItem(compendium, folder);
    Mold.fromDefaults(7, "Cone Mold", [AbilityCategory.replenishment], [AbilityCategory.restoration, AbilityCategory.alchemicalInfusion], "Cone").toItem(compendium, folder);
    Mold.fromDefaults(7, "Star Mold", [AbilityCategory.equipmentBond], [AbilityCategory.rush], "Star").toItem(compendium, folder);
    Mold.fromDefaults(7, "Hexagon Mold", [AbilityCategory.rush], [AbilityCategory.magicTrick, AbilityCategory.magicTrick], "Hexagon").toItem(compendium, folder);
    Mold.fromDefaults(7, "Cube Mold", [AbilityCategory.equipmentBond], [AbilityCategory.lesserEquipmentBond, AbilityCategory.lesserEquipmentBond], "Cube").toItem(compendium, folder);
    Mold.fromDefaults(7, "Spiral Mold", [AbilityCategory.replenishment], [AbilityCategory.spell, AbilityCategory.spell], "Spiral").toItem(compendium, folder);
    Mold.fromDefaults(7, "Dual Crescent Mold", [AbilityCategory.martialTalent, AbilityCategory.martialTalent], [AbilityCategory.rush], "Dual Crescent").toItem(compendium, folder);
}
export function createImpurities(compendium, folder) {
    Impurity.fromDefaults(1, "example", [l1LesserSpell[0], l1LesserInnateEffect[0], l1LesserEquipmentBond[0], l1EnergySubstitution[0]]).toItem(compendium, folder);
}
//# sourceMappingURL=createCompendiumItems.js.map