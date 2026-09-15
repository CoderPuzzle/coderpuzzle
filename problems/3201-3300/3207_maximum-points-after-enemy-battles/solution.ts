// Keep the smallest enemy unmarked as a recharge battery: its value m is the
// cheapest point source, and if the initial energy cannot beat even m, no
// first point is possible (marking needs one). Otherwise every other enemy
// gets marked eventually and each lot of m converts to a point, so the
// answer divides initial energy plus all other energies by m. The total
// stays below 10^5 * 10^9 + 10^9 < 2^47, exact for Numbers.
function maximumPoints(enemyEnergies: number[], currentEnergy: number): number {
    let smallest = Infinity;
    for (const e of enemyEnergies) {
        if (e < smallest) {
            smallest = e;
        }
    }
    if (currentEnergy < smallest) {
        return 0;
    }
    let total = currentEnergy;
    for (const e of enemyEnergies) {
        total += e;
    }
    return Math.floor((total - smallest) / smallest);
}
