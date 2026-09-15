/**
 * @param {number} a
 * @param {number} b
 * @param {number} n
 * @return {number}
 */
var maximumXorProduct = function (a, b, n) {
    // Decide x's bits from the top down. Bits at or above n are beyond
    // x's reach and stay as they are. Below bit n: when a and b agree on
    // a bit, x can set it in both a^x and b^x — always a win at that
    // height. When they differ, exactly one of a^x and b^x can carry the
    // bit, and giving it to the currently smaller value dominates: it
    // adds bit*(other) to the product instead of bit*(smaller). All
    // arithmetic stays on numbers below 2^51 (exact as Number doubles;
    // bit tests divide by powers of two rather than mask, since bitwise
    // operators coerce to 32 bits), and the final multiply of the two
    // mod factors — up to 2^60 — goes through BigInt to stay exact.
    const mod = 1000000007n;
    let ax = 0;
    let bx = 0;
    for (let i = 49; i >= 0; i--) {
        const bit = 2 ** i;
        const aBit = Math.floor(a / bit) % 2;
        const bBit = Math.floor(b / bit) % 2;
        if (i >= n) {
            if (aBit === 1) {
                ax += bit;
            }
            if (bBit === 1) {
                bx += bit;
            }
        } else if (aBit === bBit) {
            ax += bit;
            bx += bit;
        } else if (ax <= bx) {
            ax += bit;
        } else {
            bx += bit;
        }
    }
    return Number((BigInt(ax % 1000000007) * BigInt(bx % 1000000007)) % mod);
};
