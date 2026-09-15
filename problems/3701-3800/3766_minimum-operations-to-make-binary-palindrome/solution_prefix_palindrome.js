/**
 * @param {number[]} nums
 * @return {number[]}
 */
var minOperations = function (nums) {
    // A binary palindrome is completely determined by its first half of
    // bits: mirror that half around the middle and the whole string is
    // fixed. So every candidate nearest palindrome is one of: the mirrors
    // of the value's own first half and the halves one step below/above
    // it, plus the two length-boundary forms.
    const mirror = (head, halfLen, length) => {
        // Build the full palindrome from its first half of bits: emit the
        // half MSB-first, then append the mirrored tail — every bit except
        // the shared center for odd lengths (bit 0 of the half), all bits
        // for even lengths.
        let full = 0;
        for (let i = halfLen - 1; i >= 0; i--) {
            full = full * 2 + ((head >> i) & 1);
        }
        for (let i = length % 2 === 0 ? 0 : 1; i < halfLen; i++) {
            full = full * 2 + ((head >> i) & 1);
        }
        return full;
    };
    const distance = (value) => {
        const bits = value.toString(2);
        const length = bits.length;
        const halfLen = (length + 1) >> 1;
        const half = parseInt(bits.slice(0, halfLen), 2);
        let best = null;
        for (const head of [half - 1, half, half + 1]) {
            if (head >> (halfLen - 1) === 0) {
                continue; // would lose its leading one — not a b-bit head
            }
            const d = Math.abs(value - mirror(head, halfLen, length));
            if (best === null || d < best) {
                best = d;
            }
        }
        for (const boundary of [(1 << (length - 1)) - 1, (1 << length) + 1]) {
            const d = Math.abs(value - boundary);
            if (d < best) {
                best = d;
            }
        }
        return best;
    };
    return nums.map(distance);
};
