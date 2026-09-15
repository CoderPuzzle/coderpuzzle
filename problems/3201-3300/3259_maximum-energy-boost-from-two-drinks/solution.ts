// A plan that drinks A at hour i either drank A at hour i-1 or drank B at
// hour i-2 and idled through the cleanse hour i-1, so
// dpA[i] = max(dpA[i-1], dpB[i-2]) + energyDrinkA[i] and symmetrically for
// B. Four rolling variables carry the current pair and the one-hour-older
// pair; totals reach 10^10, far below Number's exact 2^53 limit.
function maxEnergyBoost(energyDrinkA: number[], energyDrinkB: number[]): number {
    let a = energyDrinkA[0] + energyDrinkA[1];
    let b = energyDrinkB[0] + energyDrinkB[1];
    let oldA = energyDrinkA[0];
    let oldB = energyDrinkB[0];
    for (let i = 2; i < energyDrinkA.length; ++i) {
        const nextA = Math.max(a, oldB) + energyDrinkA[i];
        const nextB = Math.max(b, oldA) + energyDrinkB[i];
        oldA = a;
        oldB = b;
        a = nextA;
        b = nextB;
    }
    return Math.max(a, b);
}
