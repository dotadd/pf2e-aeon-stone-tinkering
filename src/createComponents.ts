import { EquipmentPF2e } from "foundry-pf2e";
import { createComponentType, getImpurities, getLattices, getMolds } from "./data/components.js";


export async function createComponents(compendium: string = "pf2e-aeon-stone-tinkering.pf2e-aeon-stone-tinkering-items"): Promise<void> {
    const folderIds = await getCreationContext(compendium);
    const latticeItems = await createComponentType(compendium, folderIds.latticeFolderId, getLattices());
    const moldItems = await createComponentType(compendium, folderIds.moldFolderId, getMolds());
    const impurityItems = await createComponentType(compendium, folderIds.impurityFolderId, getImpurities());

    await createJournal(latticeItems, moldItems, impurityItems);
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

export async function createJournal(latticeItems: Array<EquipmentPF2e>, moldItems: Array<EquipmentPF2e>, impurityItems: Array<EquipmentPF2e>) {
    const pack = game.packs.get("pf2e-aeon-stone-tinkering.pf2e-aeon-stone-tinkering-journals");
    if (!pack) {
        throw new Error("Could not get compendium pack for module.");
    }

    // delete journal if exists
    const componentsJournalIndex = pack.index.getName("Components");
    if (componentsJournalIndex) {
        if (!componentsJournalIndex._id) {
            throw new Error("_id is somehow undefined.");
        }
        const componentsJournal = await pack.getDocument(componentsJournalIndex._id);
        if (!componentsJournal) {
            throw new Error("Journal somehow vanished.");
        }
        componentsJournal.delete();
    }

    await JournalEntry.create({
        "name": "Components",
        "pages": [
            {
                "sort": 100000,
                "name": "Lattices",
                "type": "text",
                "title": {
                    "show": true,
                    "level": 1
                },
                "text": {
                    "format": 1,
                    "content": formatComponentsPage(latticeItems)
                }
            },
            {
                "sort": 200000,
                "name": "Molds",
                "type": "text",
                "title": {
                    "show": true,
                    "level": 1
                },
                "text": {
                    "format": 1,
                    "content": formatComponentsPage(moldItems)
                }
            },
            {
                "sort": 300000,
                "name": "Impurities",
                "type": "text",
                "title": {
                    "show": true,
                    "level": 1
                },
                "text": {
                    "format": 1,
                    "content": formatComponentsPage(impurityItems)
                }
            }
        ],
        "folder": null,
        "categories": [],
        "sort": 100000,
        "flags": {}
    }, { pack: "pf2e-aeon-stone-tinkering.pf2e-aeon-stone-tinkering-journals" })
}

function formatComponentsPage(components: Array<EquipmentPF2e>): string {
    let pageText = "";
    for(let level = 1; level <= 20; level++) {
        let leveledComponents = components.filter(e => e.level === level).sort((a, b) => {return a.name.localeCompare(b.name)});
        if (!leveledComponents) {
            continue;
        }
        if (leveledComponents.length < 1) {
            continue;
        }
        pageText = pageText + `<h3>Level ${level}</h3>`
        for (let component of leveledComponents) {
            pageText = pageText + formatComponentForJournal(component);
        }
    }

    if (!pageText) {
        throw new Error("Error creating journal page. Got empty page.")
    }

    return pageText
}

function formatComponentForJournal(component: EquipmentPF2e): string {
    if (!component._id) {
        throw new Error("Component somehow without _id");
    }
    return `<p>@UUID[Compendium.pf2e-aeon-stone-tinkering.pf2e-aeon-stone-tinkering-items.Item.${component._id}]{${component.name}}</p>`
}