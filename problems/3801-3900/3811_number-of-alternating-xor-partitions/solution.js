/**
 * @param {number[]} nums
 * @param {number} target1
 * @param {number} target2
 * @return {number}
 */
var alternatingXor = function (nums, target1, target2) {
    // nums[i] and both targets are at most 1e5 < 2^17, and XOR never widens
    // a value, so every prefix XOR and every bucket key p ^ target stays
    // below 2^17. Counts are reduced modulo 1e9 + 7 at every bucket write,
    // so each stored count is below 1e9 + 7 and any pre-reduction sum below
    // 2^31 — exact as JS numbers, far inside 2^53.
    const MOD = 1000000007;
    // endsT1[v] / endsT2[v]: counts of valid partitions of a processed
    // prefix whose last block XORs to target1 / target2, over positions
    // with prefix XOR v. Position 0 pre-loads the empty start on the
    // target2 side, ready to open a target1 block.
    const endsT1 = new Array(1 << 17).fill(0);
    const endsT2 = new Array(1 << 17).fill(0);
    endsT2[0] = 1;
    let p = 0;
    let curT1 = 0;
    let curT2 = 0;
    for (const x of nums) {
        // A target1 block ending here opens after a position whose prefix
        // XOR is p ^ target1, carrying a partition that ended on target2
        // (or the empty start); symmetrically for target2.
        p ^= x;
        curT1 = endsT2[p ^ target1];
        curT2 = endsT1[p ^ target2];
        endsT1[p] = (endsT1[p] + curT1) % MOD;
        endsT2[p] = (endsT2[p] + curT2) % MOD;
    }
    // The alternation may stop after a target1 or a target2 block.
    return (curT1 + curT2) % MOD;
};
