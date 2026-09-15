/**
 * @param {number[]} a
 * @param {number[]} b
 * @param {number[]} c
 * @return {number}
 */
var tripletCount = function (a, b, c) {
    // A triplet's XOR has an even number of set bits exactly when an
    // even number of the three operands carries an odd popcount: every
    // bit position of the XOR holds the mod-2 sum of the operands'
    // bits there, so the XOR preserves the parity of the total
    // set-bit count. Counting the even- and odd-parity elements of
    // each array leaves four parity classes, and the answer sums the
    // three products that pick zero or two odd parities.
    const arrays = [a, b, c];
    const even = [0, 0, 0];
    const odd = [0, 0, 0];
    for (let i = 0; i < 3; ++i) {
        for (const x of arrays[i]) {
            let ones = 0;
            for (let v = x; v; v &= v - 1) {
                ones++;
            }
            if (ones % 2 === 0) {
                even[i]++;
            } else {
                odd[i]++;
            }
        }
    }
    return (
        even[0] * even[1] * even[2] + odd[0] * odd[1] * even[2] + odd[0] * even[1] * odd[2] + even[0] * odd[1] * odd[2]
    );
};
