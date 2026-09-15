function maxPartitionsAfterOperations(s: string, k: number): number {
    // Sweep left to right carrying every segmentation state reachable
    // with the one allowed change unspent or already spent exactly once.
    // The unspent side is a single lineage (no change means the greedy is
    // forced); the spent side maps each open-window letter mask to the
    // best completed-partition count seen for it, merged on equal masks
    // because what happens next depends only on the mask. Masks hold at
    // most 26 bits, safely inside a JS number's integer range.
    let unspentMask = 0;
    let unspentCount = 0;
    let spent = new Map<number, number>();

    function advance(mask: number, count: number, added: number): void {
        if ((mask & added) === 0) {
            if (popcount(mask) === k) {
                count += 1;
                mask = added;
            } else {
                mask |= added;
            }
        }
        if (count > (spent.get(mask) ?? -1)) {
            spent.set(mask, count);
        }
    }

    for (const ch of s) {
        const bit = 1 << (ch.charCodeAt(0) - 97);

        const carried = spent;
        spent = new Map<number, number>();
        for (const [mask, count] of carried) {
            advance(mask, count, bit);
        }
        for (let letter = 0; letter < 26; letter += 1) {
            const branch = 1 << letter;
            if (branch === bit) continue;
            advance(unspentMask, unspentCount, branch);
        }
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
}

function popcount(mask: number): number {
    let total = 0;
    while (mask) {
        mask &= mask - 1;
        total += 1;
    }
    return total;
}
