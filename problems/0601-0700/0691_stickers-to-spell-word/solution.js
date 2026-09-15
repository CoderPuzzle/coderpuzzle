/**
 * @param {string[]} stickers
 * @param {string} target
 * @return {number}
 */
var minStickers = function (stickers, target) {
    // BFS over the bitmask of spelled target positions: bit i is set once
    // position i holds a cut letter. From each state, one copy of a
    // sticker spends its letters on the uncovered positions left to
    // right — covering more positions with the same single copy can
    // never hurt, since equal letters are interchangeable. Layers of the
    // BFS are sticker counts, so the first visit to the full mask is the
    // minimum; a target letter found on no sticker at all makes the task
    // impossible.
    const m = target.length;
    const full = (1 << m) - 1;
    const available = new Array(26).fill(false);
    for (const word of stickers) {
        for (const letter of word) available[letter.charCodeAt(0) - 97] = true;
    }
    const need = [];
    for (const letter of target) {
        const index = letter.charCodeAt(0) - 97;
        if (!available[index]) return -1;
        need.push(index);
    }
    const stocks = stickers.map((word) => {
        const counts = new Array(26).fill(0);
        for (const letter of word) counts[letter.charCodeAt(0) - 97] += 1;
        return counts;
    });
    const distance = new Array(full + 1).fill(-1);
    distance[0] = 0;
    const queue = [0];
    while (queue.length > 0) {
        const mask = queue.shift();
        if (mask === full) return distance[mask];
        const steps = distance[mask] + 1;
        for (const counts of stocks) {
            const remaining = counts.slice();
            let next = mask;
            for (let i = 0; i < m; ++i) {
                const bit = 1 << i;
                if ((mask & bit) === 0 && remaining[need[i]] > 0) {
                    remaining[need[i]] -= 1;
                    next |= bit;
                }
            }
            if (next !== mask && distance[next] < 0) {
                distance[next] = steps;
                queue.push(next);
            }
        }
    }
    return -1;
};
