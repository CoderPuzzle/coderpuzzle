/**
 * @param {number} num
 * @return {number}
 */
var findComplement = function (num) {
    // Doubles are exact far past 2^31, so the mask grows safely with plain
    // arithmetic; the final ^ reads the low 32 bits, where the answer lives.
    // Doubling a run of ones and adding one extends it by one bit —
    // 1 -> 11 -> 111 — so mask is always 2^k - 1 covering num's window.
    let mask = 1;
    while (mask < num) {
        mask = mask * 2 + 1;
    }
    // XOR with the all-ones window flips every bit num occupies and
    // nothing above it.
    return num ^ mask;
};
