/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxPartitionsAfterOperations = function (s, k) {
    // Sweep left to right carrying every segmentation state reachable
    // with the one allowed change unspent or already spent exactly once.
    // The unspent side is a single lineage (no change means the greedy is
    // forced); the spent side maps each open-window letter mask to the
    // best completed-partition count seen for it, merged on equal masks
    // because what happens next depends only on the mask. Masks hold at
    // most 26 bits, safely inside a JS number's integer range.
    let unspentMask = 0;
    let unspentCount = 0;
    let spent = new Map();
    for (const ch of s) {
        const bit = 1 << (ch.charCodeAt(0) - 97);

        // Advance every spent window on the real character: a new letter
        // with k distinct already present closes the open partition;
        // otherwise the letter joins the mask.
        const next = new Map();
        for (const [mask, count] of spent) {
            let nm = mask;
            let nc = count;
            if ((nm & bit) === 0) {
                if (popcount(nm) === k) {
                    nm = bit;
                    nc += 1;
                } else {
                    nm |= bit;
                }
            }
            if (nc > (next.get(nm) ?? -1)) {
                next.set(nm, nc);
            }
        }

        // Spend the change right here: branch the twenty-five other
        // letters off the unspent lineage as of [0..i-1]; each branch
        // absorbs this very position, so it lands already advanced.
        for (let letter = 0; letter < 26; letter += 1) {
            const branch = 1 << letter;
            if (branch === bit) continue;
            let nm = unspentMask;
            let nc = unspentCount;
            if ((nm & branch) === 0) {
                if (popcount(nm) === k) {
                    nm = branch;
                    nc += 1;
                } else {
                    nm |= branch;
                }
            }
            if (nc > (next.get(nm) ?? -1)) {
                next.set(nm, nc);
            }
        }
        spent = next;

        // Advance the unspent lineage on the real character.
        if ((unspentMask & bit) === 0) {
            if (popcount(unspentMask) === k) {
                unspentCount += 1;
                unspentMask = bit;
            } else {
                unspentMask |= bit;
            }
        }
    }

    let best = unspentCount;
    for (const count of spent.values()) {
        best = Math.max(best, count);
    }
    return best + 1; // the final open partition always counts
};

function popcount(mask) {
    let total = 0;
    while (mask) {
        mask &= mask - 1;
        total += 1;
    }
    return total;
}
