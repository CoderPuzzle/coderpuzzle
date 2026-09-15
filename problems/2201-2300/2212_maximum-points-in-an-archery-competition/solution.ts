// Winning section k costs aliceArrows[k] + 1 arrows and pays k points, so
// with only 12 sections every affordable winning set can be swept.
function maximumBobPoints(numArrows: number, aliceArrows: number[]): number[] {
    let bestPoints = 0;
    let bestMask = 0;
    for (let mask = 1; mask < 1 << 12; mask++) {
        let cost = 0;
        let points = 0;
        for (let k = 0; k < 12; k++) {
            if ((mask >> k) & 1) {
                cost += aliceArrows[k] + 1;
                points += k;
            }
        }
        // Strict improvement keeps the smallest mask on ties, which pins
        // one deterministic answer among equally scoring allocations.
        if (cost <= numArrows && points > bestPoints) {
            bestPoints = points;
            bestMask = mask;
        }
    }
    const bob: number[] = new Array(12).fill(0);
    let spent = 0;
    for (let k = 1; k < 12; k++) {
        if ((bestMask >> k) & 1) {
            bob[k] = aliceArrows[k] + 1;
            spent += bob[k];
        }
    }
    // Section 0 scores nothing, so every unspent arrow lands there.
    bob[0] = numArrows - spent;
    return bob;
}
