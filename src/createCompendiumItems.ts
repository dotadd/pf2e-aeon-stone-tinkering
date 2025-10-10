import { Lattice } from "./model/lattice";


export function createLattices() {
    const comp = "pf2e-aeon-stone-tinkering.pf2e-aeon-stone-tinkering-items";
    const folder = "Rmy7puJFRtokguTy";

    const lat1 = Lattice.fromDefaults(1, "Amber Lattice", "Amber");
    lat1.toItem(comp, folder);
    const lat2 = Lattice.fromDefaults(3, "Pearl Lattice", "Pearly White");
    lat2.toItem(comp, folder);
    const lat3 = Lattice.fromDefaults(5, "Malachite Lattice", "Green-Patterned");
    lat3.toItem(comp, folder);
    const lat4 = Lattice.fromDefaults(7, "Opal Lattice", "Opaline");
    lat4.toItem(comp, folder);
    const lat5 = Lattice.fromDefaults(9, "Sodalite Lattice", "Speckled Blue");
    lat5.toItem(comp, folder);
    const lat6 = Lattice.fromDefaults(11, "Hematite Lattice", "Red-Streaked Black");
    lat6.toItem(comp, folder);
    const lat7 = Lattice.fromDefaults(13, "Sugilite Lattice", "Flat Purple");
    lat7.toItem(comp, folder);
    const lat8 = Lattice.fromDefaults(15, "Aquamarine Lattice", "Brilliant Blue");
    lat8.toItem(comp, folder);
    const lat9 = Lattice.fromDefaults(17, "Alexandrite Lattice", "Shifting");
    lat9.toItem(comp, folder);
    const lat10 = Lattice.fromDefaults(19, "Diamond Lattice", "Brilliant");
    lat10.toItem(comp, folder);
}

export function createMolds() {
    const comp = "pf2e-aeon-stone-tinkering.pf2e-aeon-stone-tinkering-items";
    const folder = "Rmy7puJFRtokguTy";

    const lat1 = Lattice.fromDefaults(1, "Amber Lattice", "Amber");
    lat1.toItem(comp, folder);
    const lat2 = Lattice.fromDefaults(3, "Pearl Lattice", "Pearly White");
    lat2.toItem(comp, folder);
    const lat3 = Lattice.fromDefaults(5, "Malachite Lattice", "Green-Patterned");
    lat3.toItem(comp, folder);
    const lat4 = Lattice.fromDefaults(7, "Opal Lattice", "Opaline");
    lat4.toItem(comp, folder);
    const lat5 = Lattice.fromDefaults(9, "Sodalite Lattice", "Speckled Blue");
    lat5.toItem(comp, folder);
    const lat6 = Lattice.fromDefaults(11, "Hematite Lattice", "Red-Streaked Black");
    lat6.toItem(comp, folder);
    const lat7 = Lattice.fromDefaults(13, "Sugilite Lattice", "Flat Purple");
    lat7.toItem(comp, folder);
    const lat8 = Lattice.fromDefaults(15, "Aquamarine Lattice", "Brilliant Blue");
    lat8.toItem(comp, folder);
    const lat9 = Lattice.fromDefaults(17, "Alexandrite Lattice", "Shifting");
    lat9.toItem(comp, folder);
    const lat10 = Lattice.fromDefaults(19, "Diamond Lattice", "Brilliant");
    lat10.toItem(comp, folder);
}