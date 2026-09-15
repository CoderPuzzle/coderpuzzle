/**
 * @param {number} numPeople
 * @return {number}
 */
var numberOfWays = function (numPeople) {
    const MOD = 1000000007;
    const m = Math.floor(numPeople / 2);
    // catalan[i] = non-crossing handshake layouts for i pairs; an empty
    // circle has exactly one layout, anchoring the recurrence.
    const catalan = new Array(m + 1).fill(0);
    catalan[0] = 1;
    for (let i = 1; i <= m; i++) {
        let total = 0;
        // Fix person 1 and sum over their partner: the chord splits the
        // circle into two arcs filled independently (anything crossing
        // between arcs would cross the pivot chord). Partner j leaves
        // j pairs on one side and i-1-j on the other — the Catalan
        // recurrence catalan[i] = Σ catalan[j]·catalan[i-1-j]. BigInt
        // keeps each product exact before reducing mod 1e9+7.
        for (let j = 0; j < i; j++) {
            total = Number((BigInt(total) + BigInt(catalan[j]) * BigInt(catalan[i - 1 - j])) % BigInt(MOD));
        }
        catalan[i] = total;
    }
    return catalan[m];
};
