import { AbilityCategory } from "./model/ability";
import { Lattice } from "./model/lattice";
import { Mold } from "./model/mold";


export function createLattices(comp: string = "pf2e-aeon-stone-tinkering.pf2e-aeon-stone-tinkering-items", folder: string = "Rmy7puJFRtokguTy") {
    Lattice.fromDefaults(1, "Amber Lattice", "Amber", "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/amber.webp").toItem(comp, folder);
    Lattice.fromDefaults(3, "Pearl Lattice", "Pearly White", "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/saltwater-pearl.webp").toItem(comp, folder);
    Lattice.fromDefaults(5, "Malachite Lattice", "Green-Patterned", "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/jade.webp").toItem(comp, folder);
    Lattice.fromDefaults(7, "Opal Lattice", "Opaline", "systems/pf2e/icons/equipment/treasure/gems/lesser-precious-stones/opal.webp").toItem(comp, folder);
    Lattice.fromDefaults(9, "Sodalite Lattice", "Speckled Blue", "systems/pf2e/icons/equipment/treasure/gems/lesser-semiprecious-stones/lapis-lazuli.webp").toItem(comp, folder);
    Lattice.fromDefaults(11, "Hematite Lattice", "Red-Streaked Black", "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/garnet.webp").toItem(comp, folder);
    Lattice.fromDefaults(13, "Sugilite Lattice", "Flat Purple", "systems/pf2e/icons/equipment/other/spellhearts/perfect-droplet.webp").toItem(comp, folder);
    Lattice.fromDefaults(15, "Aquamarine Lattice", "Brilliant Blue", "systems/pf2e/icons/equipment/treasure/gems/lesser-precious-stones/aquamarine.webp").toItem(comp, folder);
    Lattice.fromDefaults(17, "Alexandrite Lattice", "Shifting", "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/amethyst.webp").toItem(comp, folder);
    Lattice.fromDefaults(19, "Diamond Lattice", "Brilliant", "systems/pf2e/icons/equipment/treasure/gems/greater-precious-stones/large-diamond.webp").toItem(comp, folder);
}

export function createMolds(comp: string = "pf2e-aeon-stone-tinkering.pf2e-aeon-stone-tinkering-items", folder: string = "8oBra56mQmKkmqBf") {
    Mold.fromDefaults(1, "Oblong Mold", [AbilityCategory.lesserInnateEffect], [AbilityCategory.lesserSpell], "Oblong").toItem(comp, folder);
    Mold.fromDefaults(1, "Triangle Mold", [AbilityCategory.energySubstitution], [AbilityCategory.lesserSpell], "Triangle").toItem(comp, folder);
    Mold.fromDefaults(1, "Torus Mold", [AbilityCategory.lesserInnateEffect], [AbilityCategory.lesserEquipmentBond], "Torus").toItem(comp, folder);

    Mold.fromDefaults(3, "Rhombus Mold", [AbilityCategory.energySubstitution, AbilityCategory.energySubstitution], [AbilityCategory.spell], "Rhombus").toItem(comp, folder);
    Mold.fromDefaults(3, "Prism Mold", [AbilityCategory.lesserEquipmentBond, AbilityCategory.lesserEquipmentBond], [AbilityCategory.martialTalent], "Prism").toItem(comp, folder);
    Mold.fromDefaults(3, "Cylinder Mold", [AbilityCategory.martialTalent], [AbilityCategory.alchemicalInfusion], "Cylinder").toItem(comp, folder);
    Mold.fromDefaults(3, "Hemisphere Mold", [AbilityCategory.magicTrick], [AbilityCategory.spell], "Hemisphere").toItem(comp, folder);
    Mold.fromDefaults(3, "Trapezoid Mold", [AbilityCategory.alchemicalInfusion], [AbilityCategory.spell], "Trapezoid").toItem(comp, folder);
    Mold.fromDefaults(3, "Square Mold", [AbilityCategory.spell], [AbilityCategory.lesserSpell, AbilityCategory.lesserSpell], "Square").toItem(comp, folder);
    Mold.fromDefaults(3, "Ellipse Mold", [AbilityCategory.magicTrick], [AbilityCategory.martialTalent], "Ellipse").toItem(comp, folder);

    Mold.fromDefaults(5, "Pyramid Mold", [AbilityCategory.restoration], [AbilityCategory.resistance], "Pyramid").toItem(comp, folder);
    Mold.fromDefaults(5, "Pentagon Mold", [AbilityCategory.resistance], [AbilityCategory.spell, AbilityCategory.lesserSpell], "Pentagon").toItem(comp, folder);
    Mold.fromDefaults(5, "Cuboid Mold", [AbilityCategory.skillEnhancement], [AbilityCategory.restoration], "Cuboid").toItem(comp, folder);
    Mold.fromDefaults(5, "Crescent Mold", [AbilityCategory.innateEffect], [AbilityCategory.martialTalent, AbilityCategory.alchemicalInfusion], "Crescent").toItem(comp, folder);
    Mold.fromDefaults(5, "Sphere Mold", [AbilityCategory.magicTrick, AbilityCategory.magicTrick], [AbilityCategory.spell, AbilityCategory.lesserSpell], "Sphere").toItem(comp, folder);
    Mold.fromDefaults(5, "Kite Mold", [AbilityCategory.resistance], [AbilityCategory.energySubstitution, AbilityCategory.energySubstitution], "Kite").toItem(comp, folder);
    Mold.fromDefaults(5, "Dome Mold", [AbilityCategory.skillEnhancement], [AbilityCategory.alchemicalInfusion, AbilityCategory.alchemicalInfusion], "Dome").toItem(comp, folder);

    Mold.fromDefaults(7, "Cone Mold", [AbilityCategory.replenishment], [AbilityCategory.restoration, AbilityCategory.alchemicalInfusion], "Cone").toItem(comp, folder);
    Mold.fromDefaults(7, "Star Mold", [AbilityCategory.equipmentBond], [AbilityCategory.rush], "Star").toItem(comp, folder);
    Mold.fromDefaults(7, "Hexagon Mold", [AbilityCategory.rush], [AbilityCategory.magicTrick, AbilityCategory.magicTrick], "Hexagon").toItem(comp, folder);
    Mold.fromDefaults(7, "Cube Mold", [AbilityCategory.equipmentBond], [AbilityCategory.lesserEquipmentBond, AbilityCategory.lesserEquipmentBond], "Cube").toItem(comp, folder);
    Mold.fromDefaults(7, "Spiral Mold", [AbilityCategory.replenishment], [AbilityCategory.spell, AbilityCategory.spell], "Spiral").toItem(comp, folder);
    Mold.fromDefaults(7, "Dual Crescent Mold", [AbilityCategory.martialTalent, AbilityCategory.martialTalent], [AbilityCategory.rush], "Dual Crescent").toItem(comp, folder);
}