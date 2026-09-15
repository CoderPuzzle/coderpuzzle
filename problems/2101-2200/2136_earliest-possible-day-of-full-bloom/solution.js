/**
 * @param {number[]} plantTime
 * @param {number[]} growTime
 * @return {number}
 */
var earliestFullBloom = function (plantTime, growTime) {
    const pairs = plantTime.map((p, i) => [p, growTime[i]]);
    // Total planting time is fixed regardless of order, so only the order
    // matters: by an exchange argument, plant slow-growing seeds first so
    // their long growth overlaps the planting of the rest.
    pairs.sort((a, b) => b[1] - a[1]);
    let best = 0;
    let prefix = 0;
    for (const [plant, grow] of pairs) {
        // prefix is when this seed finishes planting; it blooms at
        // prefix + grow. The answer is the max over all seeds — a seed
        // finished early can still bloom last.
        prefix += plant;
        best = Math.max(best, prefix + grow);
    }
    return best;
};
