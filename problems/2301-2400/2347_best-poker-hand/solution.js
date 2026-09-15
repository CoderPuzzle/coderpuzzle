/**
 * @param {number[]} ranks
 * @param {string[]} suits
 * @return {string}
 */
var bestHand = function (ranks, suits) {
    // The hand types rank strictly best to worst, so the first condition
    // that holds decides: uniform suit is a flush; otherwise the largest
    // rank multiplicity picks Three of a Kind (>= 3), Pair (2), or High
    // Card. A count of 4 still qualifies as three of a kind.
    for (let i = 1; i < 5; i++) {
        if (suits[i] !== suits[0]) {
            const counts = new Map();
            for (const rank of ranks) {
                counts.set(rank, (counts.get(rank) || 0) + 1);
            }
            let best = 0;
            for (const count of counts.values()) {
                best = Math.max(best, count);
            }
            if (best >= 3) {
                return "Three of a Kind";
            }
            if (best === 2) {
                return "Pair";
            }
            return "High Card";
        }
    }
    return "Flush";
};
