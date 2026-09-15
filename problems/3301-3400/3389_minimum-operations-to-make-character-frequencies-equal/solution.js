/**
 * @param {string} s
 * @return {number}
 */
var makeStringGood = function (s) {
    // Only the letter counts matter; a good string has every count at
    // 0 or at some common target c, and c never needs to exceed the
    // largest count. For a fixed c each letter either keeps c copies
    // (cost |occ-c|) or is deleted out (cost occ). One refinement: a
    // unit in the letter just left of a kept letter that still needs
    // copies can change into it instead — the hop replaces the delete
    // the unit would pay anyway and saves an insert, worth 1 per unit,
    // up to how many spare units the left letter has and how many
    // copies the right letter still needs. Those flows only run between
    // adjacent letters, so one pass over the alphabet carrying the
    // previous letter's choice (kept or emptied) prices each target;
    // the answer is the cheapest target.
    const occ = new Array(26).fill(0);
    for (const ch of s) occ[ch.charCodeAt(0) - 97]++;
    let best = s.length; // target c = 0: delete everything
    for (let target = 1; target <= Math.max(...occ); ++target) {
        let keep = Math.abs(occ[0] - target);
        let zero = occ[0];
        for (let i = 1; i < 26; ++i) {
            const need = Math.max(0, target - occ[i]);
            const saveKept = Math.min(Math.max(0, occ[i - 1] - target), need);
            const saveZero = Math.min(occ[i - 1], need);
            const cost = Math.abs(occ[i] - target);
            const nextKeep = Math.min(keep + cost - saveKept, zero + cost - saveZero);
            const nextZero = Math.min(keep, zero) + occ[i];
            keep = nextKeep;
            zero = nextZero;
        }
        best = Math.min(best, keep, zero);
    }
    return best;
};
