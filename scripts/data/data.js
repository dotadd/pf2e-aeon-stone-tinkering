// equivalent to the top end price of permanent items as per https://2e.aonprd.com/Rules.aspx?ID=1081
export const aeonStonePrice = [
    20,
    35,
    60,
    100,
    160,
    250,
    360,
    500,
    700,
    1000,
    1400,
    2000,
    3000,
    4500,
    6500,
    10000,
    15000,
    24000,
    40000,
    70000,
];
// equivalent to the bottom end price of permanent items as per https://2e.aonprd.com/Rules.aspx?ID=1081
export const latticePrice = [
    10,
    25,
    45,
    75,
    125,
    200,
    300,
    415,
    575,
    820,
    1160,
    1640,
    2400,
    3600,
    5300,
    7900,
    12000,
    18600,
    30400,
    52000,
];
// equivalent to about a third of the bottom end price of consumables as per https://2e.aonprd.com/Rules.aspx?ID=2950
export const impurityPrice = [
    1,
    2,
    3,
    4,
    7,
    10,
    17,
    24,
    34,
    50,
    67,
    100,
    134,
    200,
    300,
    434,
    676,
    1000,
    1667,
    2667,
];
// equivalent to the top end price of consumables as per https://2e.aonprd.com/Rules.aspx?ID=2950
export const moldPrice = [
    4,
    7,
    12,
    20,
    30,
    50,
    70,
    100,
    150,
    200,
    300,
    400,
    600,
    900,
    1300,
    2000,
    3000,
    5000,
    8000,
    14000,
];
// equivalent to hard level-based DCs as per https://2e.aonprd.com/Rules.aspx?ID=2629
export const itemDcByLevel = [
    17,
    18,
    20,
    21,
    22,
    24,
    25,
    26,
    28,
    29,
    30,
    32,
    33,
    34,
    36,
    37,
    38,
    40,
    41,
    42,
];
// based on skill bonuses as per https://2e.aonprd.com/Rules.aspx?ID=2741 with min=1
export const itemBonusByLevel = [
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
];
// based on monster resistances https://2e.aonprd.com/Rules.aspx?ID=2893
export const resistanceByLevel = [
    3,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    19,
    20,
    21,
    22,
];
export var aeonStoneColor;
(function (aeonStoneColor) {
    aeonStoneColor["amber"] = "Amber";
    aeonStoneColor["pearlyWhite"] = "Pearly White";
    aeonStoneColor["greenPatterned"] = "Green-Patterned";
    aeonStoneColor["opaline"] = "Opaline";
    aeonStoneColor["speckledBlue"] = "Speckled Blue";
    aeonStoneColor["redStreakedBlack"] = "Red-Streaked Black";
    aeonStoneColor["flatPurple"] = "Flat Purple";
    aeonStoneColor["radiantBlue"] = "Radiant Blue";
    aeonStoneColor["shifting"] = "Shifting";
    aeonStoneColor["brilliant"] = "Brilliant";
})(aeonStoneColor || (aeonStoneColor = {}));
export function getAeonStoneImage(color) {
    switch (color) {
        case aeonStoneColor.amber:
            return "systems/pf2e/icons/equipment/worn-items/other-worn-items/aeon-stone-gold-nodule.webp";
        case aeonStoneColor.pearlyWhite:
            return "systems/pf2e/icons/equipment/worn-items/other-worn-items/aeon-stone-pearlescent-pyramid.webp";
        case aeonStoneColor.greenPatterned:
            return "systems/pf2e/icons/equipment/worn-items/other-worn-items/aeon-stone-lavender-and-green-ellipsoid.webp";
        case aeonStoneColor.opaline:
            return "systems/pf2e/icons/equipment/worn-items/other-worn-items/aeon-stone-agate-ellipsoid.webp";
        case aeonStoneColor.speckledBlue:
            return "systems/pf2e/icons/equipment/treasure/gems/lesser-semiprecious-stones/lapis-lazuli.webp";
        case aeonStoneColor.redStreakedBlack:
            return "systems/pf2e/icons/equipment/treasure/gems/greater-semiprecious-stones/garnet.webp";
        case aeonStoneColor.flatPurple:
            return "systems/pf2e/icons/equipment/worn-items/other-worn-items/aeon-stone-dusty-rose-prism.webp";
        case aeonStoneColor.radiantBlue:
            return "systems/pf2e/icons/equipment/worn-items/other-worn-items/aeon-stone-azure-briolette.webp";
        case aeonStoneColor.shifting:
            return "systems/pf2e/icons/equipment/worn-items/other-worn-items/aeon-stone-tourmaline-sphere.webp";
        case aeonStoneColor.brilliant:
            return "systems/pf2e/icons/equipment/worn-items/other-worn-items/aeon-stone-pearly-white-spindle.webp";
        default:
            return "systems/pf2e/icons/equipment/worn-items/other-worn-items/aeon-stone-western-star.webp";
    }
}
//# sourceMappingURL=data.js.map