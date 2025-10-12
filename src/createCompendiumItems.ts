import {
    l1EnergySubstitution,
    l1LesserEquipmentBond,
    l1LesserInnateEffect,
    l1LesserSpell,
} from "./createAbilities.js";
import { AbilityCategory } from "./model/ability.js";
import { Impurity } from "./model/impurity.js";
import { Lattice } from "./model/lattice.js";
import { Mold } from "./model/mold.js";




export async function createComponents(compendium: string = "pf2e-aeon-stone-tinkering.pf2e-aeon-stone-tinkering-items"): Promise<void> {
    const folderIds = await getCreationContext(compendium);
    await createLattices(compendium, folderIds.latticeFolderId);
    await createMolds(compendium, folderIds.moldFolderId);
    await createImpurities(compendium, folderIds.impurityFolderId);
}


export async function getCreationContext(compendium: string): Promise<{latticeFolderId: string, moldFolderId: string, impurityFolderId: string}> {
    const pack = game.packs.get(compendium);

    if (!pack) {
        throw new Error("Could not get compendium pack for module.");
    }

    //@ts-ignore
    let componentFolder: Folder<Item> = pack.folders.getName("Components");
    if (!componentFolder) {
        //@ts-ignore
        componentFolder = await Folder.create({name: "Components", sorting: "m", type: "Item"}, {pack: compendium});
    }

    // Doing this cleanly is not worth the time
    //@ts-ignore
    let latticeFolder: Folder<Item> = pack.folders.getName("Lattices");
    if (!latticeFolder) {
        //@ts-ignore
        latticeFolder = await Folder.create({name: "Lattices", sorting: "m", type: "Item", folder: componentFolder}, {pack: compendium});
    }
    //@ts-ignore
    let moldFolder: Folder<Item> = pack.folders.getName("Molds");
    if (!moldFolder) {
        //@ts-ignore
        moldFolder = await Folder.create({name: "Molds", sorting: "m", type: "Item", folder: componentFolder}, {pack: compendium});
    }
    //@ts-ignore
    let impurityFolder: Folder<Item> = pack.folders.getName("Impurities");
    if (!impurityFolder) {
        //@ts-ignore
        impurityFolder = await Folder.create({name: "Impurities", sorting: "m", type: "Item", folder: componentFolder}, {pack: compendium});
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
    }
}


export async function createLattices(compendium: string, folder: string): Promise<void> {
    await Lattice.fromDefaults(1, "Amber Lattice", "Amber", "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/amber.webp").toItem(compendium, folder);
    await Lattice.fromDefaults(3, "Pearl Lattice", "Pearly White", "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/saltwater-pearl.webp").toItem(compendium, folder);
    await Lattice.fromDefaults(5, "Malachite Lattice", "Green-Patterned", "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/jade.webp").toItem(compendium, folder);
    await Lattice.fromDefaults(7, "Opal Lattice", "Opaline", "systems/pf2e/icons/equipment/treasure/gems/lesser-precious-stones/opal.webp").toItem(compendium, folder);
    await Lattice.fromDefaults(9, "Sodalite Lattice", "Speckled Blue", "systems/pf2e/icons/equipment/treasure/gems/lesser-semiprecious-stones/lapis-lazuli.webp").toItem(compendium, folder);
    await Lattice.fromDefaults(11, "Hematite Lattice", "Red-Streaked Black", "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/garnet.webp").toItem(compendium, folder);
    await Lattice.fromDefaults(13, "Sugilite Lattice", "Flat Purple", "systems/pf2e/icons/equipment/other/spellhearts/perfect-droplet.webp").toItem(compendium, folder);
    await Lattice.fromDefaults(15, "Aquamarine Lattice", "Brilliant Blue", "systems/pf2e/icons/equipment/treasure/gems/lesser-precious-stones/aquamarine.webp").toItem(compendium, folder);
    await Lattice.fromDefaults(17, "Alexandrite Lattice", "Shifting", "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/amethyst.webp").toItem(compendium, folder);
    await Lattice.fromDefaults(19, "Diamond Lattice", "Brilliant", "systems/pf2e/icons/equipment/treasure/gems/greater-precious-stones/large-diamond.webp").toItem(compendium, folder);
}

export async function createMolds(compendium: string, folder: string): Promise<void> {
    await Mold.fromDefaults(1, "Oblong Mold", [AbilityCategory.lesserInnateEffect], [AbilityCategory.lesserSpell], "Oblong").toItem(compendium, folder);
    await Mold.fromDefaults(1, "Triangular Mold", [AbilityCategory.energySubstitution], [AbilityCategory.lesserSpell], "Triangle").toItem(compendium, folder);
    await Mold.fromDefaults(1, "Torus Mold", [AbilityCategory.lesserInnateEffect], [AbilityCategory.lesserEquipmentBond], "Torus").toItem(compendium, folder);
 
    await Mold.fromDefaults(3, "Rhomboid Mold", [AbilityCategory.energySubstitution, AbilityCategory.energySubstitution], [AbilityCategory.spell], "Rhombus").toItem(compendium, folder);
    await Mold.fromDefaults(3, "Prismatic Mold", [AbilityCategory.lesserEquipmentBond, AbilityCategory.lesserEquipmentBond], [AbilityCategory.martialTalent], "Prism").toItem(compendium, folder);
    await Mold.fromDefaults(3, "Cylindrical Mold", [AbilityCategory.martialTalent], [AbilityCategory.alchemicalInfusion], "Cylinder").toItem(compendium, folder);
    await Mold.fromDefaults(3, "Hemispherical Mold", [AbilityCategory.magicTrick], [AbilityCategory.spell], "Hemisphere").toItem(compendium, folder);
    await Mold.fromDefaults(3, "Trapezoidal Mold", [AbilityCategory.alchemicalInfusion], [AbilityCategory.spell], "Trapezoid").toItem(compendium, folder);
    await Mold.fromDefaults(3, "Square Mold", [AbilityCategory.spell], [AbilityCategory.lesserSpell, AbilityCategory.lesserSpell], "Square").toItem(compendium, folder);
    await Mold.fromDefaults(3, "Ellitical Mold", [AbilityCategory.magicTrick], [AbilityCategory.martialTalent], "Ellipse").toItem(compendium, folder);

    await Mold.fromDefaults(5, "Pyramid Mold", [AbilityCategory.restoration], [AbilityCategory.resistance], "Pyramid").toItem(compendium, folder);
    await Mold.fromDefaults(5, "Pentagonal Mold", [AbilityCategory.resistance], [AbilityCategory.spell, AbilityCategory.lesserSpell], "Pentagon").toItem(compendium, folder);
    await Mold.fromDefaults(5, "Cuboid Mold", [AbilityCategory.skillEnhancement], [AbilityCategory.restoration], "Cuboid").toItem(compendium, folder);
    await Mold.fromDefaults(5, "Crescent Mold", [AbilityCategory.innateEffect], [AbilityCategory.martialTalent, AbilityCategory.alchemicalInfusion], "Crescent").toItem(compendium, folder);
    await Mold.fromDefaults(5, "Spherical Mold", [AbilityCategory.magicTrick, AbilityCategory.magicTrick], [AbilityCategory.spell, AbilityCategory.lesserSpell], "Sphere").toItem(compendium, folder);
    await Mold.fromDefaults(5, "Spiral Mold", [AbilityCategory.resistance], [AbilityCategory.energySubstitution, AbilityCategory.energySubstitution], "Spiral").toItem(compendium, folder);
    await Mold.fromDefaults(5, "Dome Mold", [AbilityCategory.skillEnhancement], [AbilityCategory.alchemicalInfusion, AbilityCategory.alchemicalInfusion], "Dome").toItem(compendium, folder);

    await Mold.fromDefaults(7, "Conical Mold", [AbilityCategory.replenishment], [AbilityCategory.restoration, AbilityCategory.alchemicalInfusion], "Cone").toItem(compendium, folder);
    await Mold.fromDefaults(7, "Star Mold", [AbilityCategory.equipmentBond], [AbilityCategory.rush], "Star").toItem(compendium, folder);
    await Mold.fromDefaults(7, "Hexagonal Mold", [AbilityCategory.rush], [AbilityCategory.magicTrick, AbilityCategory.magicTrick], "Hexagon").toItem(compendium, folder);
    await Mold.fromDefaults(7, "Cubical Mold", [AbilityCategory.equipmentBond], [AbilityCategory.lesserEquipmentBond, AbilityCategory.lesserEquipmentBond], "Cube").toItem(compendium, folder);
    await Mold.fromDefaults(7, "Helical Mold", [AbilityCategory.replenishment], [AbilityCategory.spell, AbilityCategory.spell], "Helix").toItem(compendium, folder);
    await Mold.fromDefaults(7, "Dual Crescent Mold", [AbilityCategory.martialTalent, AbilityCategory.martialTalent], [AbilityCategory.rush], "Dual Crescent").toItem(compendium, folder);
}

export async function createImpurities(compendium: string, folder: string): Promise<void> {
    await Impurity.fromDefaults(1, "example", [l1LesserSpell[0], l1LesserInnateEffect[0], l1LesserEquipmentBond[0], l1EnergySubstitution[0]]).toItem(compendium, folder);
}