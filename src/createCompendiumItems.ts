import {
    l1EnergySubstitution,
    l1LesserEquipmentBond,
    l1LesserInnateEffect,
    l1LesserSpell,
} from "./createAbilities.js";
import { aeonStoneColor } from "./data/data.js";
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
    await Lattice.fromDefaults(1, "Amber Lattice", aeonStoneColor.amber, "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/amber.webp").toItem(compendium, folder);
    await Lattice.fromDefaults(3, "Pearl Lattice", aeonStoneColor.pearlyWhite, "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/saltwater-pearl.webp").toItem(compendium, folder);
    await Lattice.fromDefaults(5, "Malachite Lattice", aeonStoneColor.greenPatterned, "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/jade.webp").toItem(compendium, folder);
    await Lattice.fromDefaults(7, "Opal Lattice", aeonStoneColor.opaline, "systems/pf2e/icons/equipment/treasure/gems/lesser-precious-stones/opal.webp").toItem(compendium, folder);
    await Lattice.fromDefaults(9, "Sodalite Lattice", aeonStoneColor.speckledBlue, "systems/pf2e/icons/equipment/treasure/gems/lesser-semiprecious-stones/lapis-lazuli.webp").toItem(compendium, folder);
    await Lattice.fromDefaults(11, "Hematite Lattice", aeonStoneColor.redStreakedBlack, "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/garnet.webp").toItem(compendium, folder);
    await Lattice.fromDefaults(13, "Sugilite Lattice", aeonStoneColor.flatPurple, "systems/pf2e/icons/equipment/other/spellhearts/perfect-droplet.webp").toItem(compendium, folder);
    await Lattice.fromDefaults(15, "Aquamarine Lattice", aeonStoneColor.radiantBlue, "systems/pf2e/icons/equipment/treasure/gems/lesser-precious-stones/aquamarine.webp").toItem(compendium, folder);
    await Lattice.fromDefaults(17, "Alexandrite Lattice", aeonStoneColor.shifting, "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/amethyst.webp").toItem(compendium, folder);
    await Lattice.fromDefaults(19, "Diamond Lattice", aeonStoneColor.brilliant, "systems/pf2e/icons/equipment/treasure/gems/greater-precious-stones/large-diamond.webp").toItem(compendium, folder);
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
    await Impurity.fromDefaults(1, "Rock Salt", [l1LesserSpell[6], l1LesserInnateEffect[0], l1LesserEquipmentBond[6], l1EnergySubstitution[0]], "systems/pf2e/icons/equipment/consumables/oils/aligned-oil.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Acetic Acid", [l1LesserSpell[18], l1LesserInnateEffect[8], l1LesserEquipmentBond[4], l1EnergySubstitution[1]], "systems/pf2e/icons/equipment/consumables/oils/nectar-of-purification.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Aqua Vitae", [l1LesserSpell[17], l1LesserInnateEffect[11], l1LesserEquipmentBond[0], l1EnergySubstitution[4]], "systems/pf2e/icons/equipment/consumables/other-consumables/black-powder-keg.webp").toItem(compendium, folder);

    // temp stuff below
    await Impurity.fromDefaults(1, "Orange Crystal", [], "systems/pf2e/icons/equipment/worn-items/other-worn-items/fleshgem-earthspeaker.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Weird Flax", [], "systems/pf2e/icons/equipment/worn-items/other-worn-items/wig-of-holding.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Pink Jelly", [], "systems/pf2e/icons/equipment/worn-items/other-worn-items/aeon-stone-pink-rhomboid.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Silver Laurel", [], "systems/pf2e/icons/equipment/worn-items/apex-items/circlet-of-persuasion.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Wax", [], "systems/pf2e/icons/equipment/adventuring-gear/candle.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Porous Limestone", [], "systems/pf2e/icons/equipment/adventuring-gear/chalk.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Flint", [], "systems/pf2e/icons/equipment/adventuring-gear/flint-and-steel.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Oil", [], "systems/pf2e/icons/equipment/adventuring-gear/oil.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Soap", [], "systems/pf2e/icons/equipment/adventuring-gear/soap.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Starfish Mucus", [], "systems/pf2e/icons/equipment/adventuring-gear/jellyfish-lamp.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Holly", [], "systems/pf2e/icons/equipment/adventuring-gear/holly-and-mistletoe.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Fire Snot", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-bombs/redpitch-bomb.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Shiny Rock", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-bombs/thunderstone.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Poison Juice", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-bombs/acid-flask.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Mystery Powder", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-bombs/tanglefoot-bag.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Hole Potion", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-elixirs/malleable-mixture.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Highly Reactive Metal", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-elixirs/quicksilver-mutagen.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Extra Spicy Sauce", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-elixirs/lastwall-soup.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Espresso", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-elixirs/prey-mutagen.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Rectangular Potion", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-elixirs/leapers-elixir.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Fluffy Grey Spores", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-poisons/addlebrain.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Red Powder", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-poisons/mage-bane.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Fleshy Pellets", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-poisons/leadenleg.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Purple Goop", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-poisons/cytillesh-oil.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Quicksilver", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-poisons/isolation-draught.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Tar", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-poisons/lifeblight-residue.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Smelly Green Stuff", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-poisons/lich-dust.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Orange Goop", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-poisons/lethargy-poison.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Salsa", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-tapas/dragons-blood-pudding.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Teal Salve", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-tools/body-recovery-kit.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Green Pearl", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-tools/metalmist-sphere.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Dried Ashleaf", [], "systems/pf2e/icons/equipment/alchemical-items/drugs/refined-pesh.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Purple Mushroom", [], "systems/pf2e/icons/equipment/alchemical-items/drugs/cytillesh.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Black Vortex Bead", [], "systems/pf2e/icons/equipment/artifacts/sphere-of-annihilation.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Black Wax", [], "systems/pf2e/icons/equipment/consumables/other-consumables/candle-of-revealing.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Phoenix Down", [], "systems/pf2e/icons/equipment/consumables/talismans/balisse-feather.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Eye Gem", [], "systems/pf2e/icons/equipment/consumables/talismans/eye-of-apprehension.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Drake Scale", [], "systems/pf2e/icons/equipment/consumables/other-consumables/bubbling-scale.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Sad Rose", [], "systems/pf2e/icons/equipment/cursed-items/rose-of-loves-lost.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Tiny Rune Beads", [], "systems/pf2e/icons/equipment/held-items/holy-prayer-beads.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Earth Scamp Curses", [], "systems/pf2e/icons/equipment/worn-items/companion-items/hosteling-statuette.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Djezet (Orange Stone)", [], "systems/pf2e/icons/equipment/materials/djezet-mass.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Adamantine Mess", [], "systems/pf2e/icons/equipment/materials/adamantine-chunk.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Vine Gem", [], "systems/pf2e/icons/equipment/treasure/gems/greater-precious-stones/star-sapphire.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Shell", [], "systems/pf2e/icons/equipment/treasure/gems/lesser-semiprecious-stones/shell.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Seedpod", [], "systems/pf2e/icons/equipment/structures/gourd-home.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Confetti", [], "systems/pf2e/icons/equipment/snares/glittering-snare-effect.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Lightning Juice", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-bombs/bottled-lightning.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Some flat-gold liquid", [], "systems/pf2e/icons/equipment/adventuring-gear/cookware.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Hypnotioc Candy", [], "systems/pf2e/icons/equipment/alchemical-items/drugs/grolna.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Skeleton Tears", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-bombs/dread-ampoule.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Green Ghost Rock", [], "systems/pf2e/icons/equipment/materials/abysium-chunk.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Darkwood Shavings", [], "systems/pf2e/icons/equipment/materials/darkwood-lumber.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Black Nobbly Thing", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-poisons/mindfog-mist.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Black Tongue Thing", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-poisons/black-smear-poison.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Microscopic Snowglobe", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-bombs/alignment-ampoule.webp").toItem(compendium, folder);
    await Impurity.fromDefaults(1, "Super Saiyan Juice", [], "systems/pf2e/icons/equipment/alchemical-items/alchemical-bombs/bottled-sunlight.webp").toItem(compendium, folder);
}