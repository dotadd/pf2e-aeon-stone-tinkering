import { Impurity } from "./model/impurity.js";
import { Lattice } from "./model/lattice.js";
import { Mold } from "./model/mold.js";
import { AeonStone } from "./model/aeonStone.js";
export async function createAeonStone() {
    const components = await getComponents();
    const pickedComponents = pickComponents(components.lattices, components.molds, components.impurities);
    await AeonStone.fromComponents(pickedComponents.mold, pickedComponents.lattice, pickedComponents.impurities).toItem();
}
export async function getComponents(compendium = "pf2e-aeon-stone-tinkering.pf2e-aeon-stone-tinkering-items") {
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
    const latticeIds = latticeFolder.contents.map(e => e._id).filter(e => e !== null);
    const moldIds = moldFolder.contents.map(e => e._id).filter(e => e !== null);
    const impurityIds = impurityFolder.contents.map(e => e._id).filter(e => e !== null);
    const latticeItems = await pack.getDocuments({ _id__in: latticeIds });
    const moldItems = await pack.getDocuments({ _id__in: moldIds });
    const impurityItems = await pack.getDocuments({ _id__in: impurityIds });
    const lattices = latticeItems.map(Lattice.fromItem);
    const molds = moldItems.map(Mold.fromItem);
    const impurities = impurityItems.map(Impurity.fromItem);
    return {
        "lattices": lattices,
        "molds": molds,
        "impurities": impurities,
    };
}
// stand-in for dialog
export function pickComponents(lattices, molds, impurities) {
    const selectedLattice = lattices.find(e => e.level === 1);
    const selectedMold = molds.find(e => e.level === 1);
    if (!selectedLattice || !selectedMold) {
        throw new Error("failed");
    }
    let selectedImpurities = [];
    for (let ability of selectedMold.regularAbilities.concat(selectedMold.resonantAbilities)) {
        let imp = impurities.find(e => e.abilities.filter(f => f.category === ability));
        if (!imp) {
            throw new Error("failed");
        }
        selectedImpurities.push(imp);
    }
    return {
        "lattice": selectedLattice,
        "mold": selectedMold,
        "impurities": selectedImpurities,
    };
}
//# sourceMappingURL=createAeonStoneDialog.js.map