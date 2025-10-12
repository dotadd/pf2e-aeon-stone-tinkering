import { EquipmentPF2e } from "foundry-pf2e";
import { Impurity } from "./model/impurity.js";
import { Lattice } from "./model/lattice.js";
import { Mold } from "./model/mold.js";
import { AeonStone } from "./model/aeonStone.js";


export async function createAeonStone(): Promise<void> {
    const components = await getComponents();
    const pickedComponents = pickComponents(components.lattices, components.molds, components.impurities);
    AeonStone.fromComponents(pickedComponents.mold, pickedComponents.lattice, pickedComponents.impurities).toItem();
}

export async function getComponents(compendium: string = "pf2e-aeon-stone-tinkering.pf2e-aeon-stone-tinkering-items"): Promise<{lattices: Array<Lattice>, molds: Array<Mold>, impurities: Array<Impurity>}> {
    const pack = game.packs.get(compendium);
    if (!pack) {
        throw new Error("Could not get compendium pack for module.");
    }

    // Doing this cleanly is not worth the time
    //@ts-ignore
    const latticeFolder: Folder<Item> = pack.folders.getName("Lattices");
    //@ts-ignore
    const moldFolder: Folder<Item> = pack.folders.getName("Molds");
    //@ts-ignore
    const impurityFolder: Folder<Item> = pack.folders.getName("Impurities");

    const latticeIds = latticeFolder.contents.map(e => e._id).filter(e => e !== null);
    const moldIds = moldFolder.contents.map(e => e._id).filter(e => e !== null);
    const impurityIds = impurityFolder.contents.map(e => e._id).filter(e => e !== null);

    const latticeItems = await pack.getDocuments({ _id__in: latticeIds }) as Array<EquipmentPF2e>;
    const moldItems = await pack.getDocuments({ _id__in: moldIds }) as Array<EquipmentPF2e>;
    const impurityItems = await pack.getDocuments({ _id__in: impurityIds }) as Array<EquipmentPF2e>;

    const lattices = latticeItems.map(Lattice.fromItem);
    const molds = moldItems.map(Mold.fromItem);
    const impurities = impurityItems.map(Impurity.fromItem);

    return {
        "lattices": lattices,
        "molds": molds,
        "impurities": impurities,
    }
}

// stand-in for dialog
export function pickComponents(lattices: Array<Lattice>, molds: Array<Mold>, impurities: Array<Impurity>): {lattice: Lattice, mold: Mold, impurities: Array<Impurity>} {
    const selectedLattice = lattices.find(e => e.level === 1);
    const selectedMold = molds.find(e => e.level === 1);

    if (!selectedLattice || !selectedMold) {
        throw new Error("failed");
    }

    let selectedImpurities: Array<Impurity> = [];

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
    }
}