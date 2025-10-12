import { EquipmentPF2e } from "foundry-pf2e";
import { Impurity } from "./model/impurity.js";
import { Lattice } from "./model/lattice.js";
import { Mold } from "./model/mold.js";
import { AeonStone } from "./model/aeonStone.js";
import { AbilityCategory } from "./model/ability.js";


export async function createAeonStone(): Promise<void> {
    const components = await getComponents();
    const pickedComponents = await queryForComponents(components.lattices, components.molds, components.impurities);
    await AeonStone.fromComponents(pickedComponents.mold, pickedComponents.lattice, pickedComponents.impurities).toItem();
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


export async function queryForComponents(lattices: Array<Lattice>, molds: Array<Mold>, impurities: Array<Impurity>): Promise<{lattice: Lattice, mold: Mold, impurities: Array<Impurity>}> {
    const { lattice, mold } = await queryForLatticeAndMold(lattices, molds);
    const abilityCategories = mold.regularAbilities.concat(mold.resonantAbilities);
    const impuritiesChosen = await queryForImpurities(impurities, abilityCategories);

    return {lattice: lattice, mold: mold, impurities: impuritiesChosen};
}


// This is where I realize that IDs would have been smart
export function formatDropdownOptionLattice(lattice: Lattice): {label: string, value: string} {
    const label = `${lattice.level} - ${lattice.name}`;
    return {label: label, value: lattice.name};
}

export function formatDropdownOptionMold(mold: Mold): {label: string, value: string} {
    const abilityTextRegular = mold.regularAbilities.join(", ");
    const abilityTextResonant = mold.resonantAbilities.map(e => e + " [R]").join(", ");
    const label = `${mold.level} - ${mold.name} (${abilityTextRegular}, ${abilityTextResonant})`;
    return {label: label, value: mold.name};
}

export function formatDropdownOptionImpurity(impurity: Impurity, abilityCategory: AbilityCategory): {label: string, value: string} {
    const ability = impurity.abilities.find(e => e.category === abilityCategory);
    if (!ability) {
        throw new Error("Correct ability category not found.");
    }
    const label = `${impurity.level} - ${impurity.name} (${ability.name})`;
    return {label: label, value: impurity.name};
}

export async function queryForLatticeAndMold(lattices: Array<Lattice>, molds: Array<Mold>): Promise<{lattice: Lattice, mold: Mold}> {
    const fields = foundry.applications.fields;

    const selectLatticeData = lattices.sort((a, b) => a.level - b.level).map(formatDropdownOptionLattice);
    const selectLattice = fields.createSelectInput({
        options: selectLatticeData,
        name: "lattice"
    });

    const selectLatticeGroup = fields.createFormGroup({
        input: selectLattice,
        label: "Select Lattice",
    });

    const selectMoldData = molds.sort((a, b) => a.level - b.level).map(formatDropdownOptionMold);
    const selectMold = fields.createSelectInput({
        options: selectMoldData,
        name: "mold"
    });

    const selectMoldGroup = fields.createFormGroup({
        input: selectMold,
        label: "Select Mold",
    });

    const content = `${selectLatticeGroup.outerHTML} ${selectMoldGroup.outerHTML}`

    //@ts-ignore
    const data = await foundry.applications.api.DialogV2.input({
        window: { title: "Choose Lattice and Mold" },
        content: content,
        ok: [{label: "Next"}]
    })

    const latticeChosenName = data.lattice
    const moldChosenName = data.mold

    if (!latticeChosenName || !moldChosenName) {
        throw new Error("No choice for lattice or mold found");
    }

    const latticeChosen = lattices.find(e => e.name === latticeChosenName);
    const moldChosen = molds.find(e => e.name === moldChosenName);

    if (!latticeChosen || !moldChosen) {
        throw new Error("Chosen lattice or mold not found");
    }

    return {lattice: latticeChosen, mold: moldChosen};
}

export async function queryForImpurities(impurities: Array<Impurity>, abilityCategories: Array<AbilityCategory>): Promise<Array<Impurity>> {
    const fields = foundry.applications.fields;

    const impuritiesSorted = impurities.sort((a, b) => a.level - b.level);
    let content = "";

    for (let i = 0; i < abilityCategories.length; i++) {
        let impuritiesAvailable = impuritiesSorted.filter(e => e.abilities.find(f => f.category === abilityCategories[i]));
        let selectImpurityData = impuritiesAvailable.map(e => formatDropdownOptionImpurity(e, abilityCategories[i]));

        let selectImpurity = fields.createSelectInput({
            options: selectImpurityData,
            name: "impurity" + i
        });
        const selectImpurityGroup = fields.createFormGroup({
            input: selectImpurity,
            label: abilityCategories[i],
        });

        content = content + selectImpurityGroup.outerHTML;
    }

    //@ts-ignore
    const data = await foundry.applications.api.DialogV2.input({
        window: { title: "Choose Impurities" },
        content: content,
        ok: [{label: "Create"}]
    })

    let impuritiesChosen = [];

    for (let i = 0; i < abilityCategories.length; i++) {
        let impurityName = data["impurity" + i];
        
        if (!impurityName) {
            throw new Error("Chosen impurity name missing.");
        }

        let impurityChosen = impurities.find(e => e.name === impurityName);
        if (!impurityChosen) {
            throw new Error("Chosen impurity not found");
        }
        impuritiesChosen.push(impurityChosen);
    }

    return impuritiesChosen;
}