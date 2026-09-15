/**
 * @param {number[]} deck
 * @return {boolean}
 */
var hasGroupsSizeX = function (deck) {
    // A group is x cards of one value, so once x is picked every count
    // must split into whole groups of x: each count a multiple of x,
    // every card in exactly one group. A partition exists exactly when
    // some x >= 2 divides every count at once, i.e. when the gcd of all
    // counts reaches 2. The fold seeds with 0 because gcd(0, c) = c, so
    // each count is absorbed and the running value stays the gcd of the
    // counts seen so far.
    const counts = new Map();
    for (const card of deck) {
        counts.set(card, (counts.get(card) ?? 0) + 1);
    }
    let common = 0;
    for (const count of counts.values()) {
        common = gcd(common, count);
    }
    return common >= 2;
};

function gcd(a, b) {
    while (b !== 0) {
        const remainder = a % b;
        a = b;
        b = remainder;
    }
    return a;
}
