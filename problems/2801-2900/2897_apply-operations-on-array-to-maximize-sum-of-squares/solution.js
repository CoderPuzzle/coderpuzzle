/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSum = function (nums, k) {
    // The operation replaces a pair with (a AND b, a OR b): the AND keeps
    // exactly the bits both values shared and the OR keeps exactly the bits
    // either had, so every bit position owns a fixed pool of count[b]
    // copies that operations merely reshuffle across the array.
    const count = new Array(30).fill(0);
    for (const x of nums) {
        for (let b = 0; b < 30; ++b) {
            if ((x >> b) & 1) {
                count[b]++;
            }
        }
    }

    // Pour the pools into the k kept slots greedily, highest bit first: a
    // set bit raises a larger running value's square by more, so the
    // biggest slots take every bit first. Slot i then holds bit b exactly
    // when i sits below count[b], so one sweep from the OR of all present
    // bits - dropping bit b as the sweep passes index count[b] - walks the
    // final slot values directly.
    const drop = new Int32Array(k);
    let value = 0;
    for (let b = 0; b < 30; ++b) {
        if (count[b] > 0) {
            value |= 1 << b;
            if (count[b] < k) {
                drop[count[b]] |= 1 << b;
            }
        }
    }

    // Slots stay below 2^30 but their squares reach ~1.15e18, past Number's
    // 2^53 exact-integer limit, so each square runs on BigInt and is
    // reduced modulo 10^9 + 7 as the total accumulates.
    const BMOD = 1000000007n;
    let total = 0n;
    for (let i = 0; i < k; ++i) {
        if (i > 0) {
            value ^= drop[i];
        }
        total = (total + BigInt(value) * BigInt(value)) % BMOD;
    }
    return Number(total);
};
