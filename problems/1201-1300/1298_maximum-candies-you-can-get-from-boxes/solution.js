/**
 * @param {number[]} status
 * @param {number[]} candies
 * @param {number[][]} keys
 * @param {number[][]} containedBoxes
 * @param {number[]} initialBoxes
 * @return {number}
 */
var maxCandies = function (status, candies, keys, containedBoxes, initialBoxes) {
    // Two waiting rooms: owned-but-locked boxes, and the openable queue.
    const lockedHeld = new Set();
    const opened = new Array(status.length).fill(false);
    let total = 0;
    const queue = [];

    const acquire = (box) => {
        // Ownership event: an initial box, or one found inside another.
        if (opened[box] || lockedHeld.has(box)) return;
        if (status[box] === 1) {
            queue.push(box);
        } else {
            lockedHeld.add(box);
        }
    };

    for (const b of initialBoxes) acquire(b);

    while (queue.length > 0) {
        const b = queue.shift();
        if (opened[b]) continue;
        opened[b] = true;
        total += candies[b];
        for (const k of keys[b]) {
            status[k] = 1;
            if (lockedHeld.has(k)) {
                // The key only matters for a box already owned and parked;
                // release it into the queue now that it unlocks.
                lockedHeld.delete(k);
                queue.push(k);
            }
        }
        for (const c of containedBoxes[b]) acquire(c);
    }
    return total;
};
