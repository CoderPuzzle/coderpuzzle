/**
 * @param {number[]} heights
 * @param {number} volume
 * @param {number} k
 * @return {number[]}
 */
var pourWater = function (heights, volume, k) {
    // One droplet at a time, on a surface whose levels are terrain plus
    // already-settled water. A droplet probes left first: walk as far as the
    // non-increasing levels allow; if the walk ends strictly below the
    // landing level at k, the droplet settles on the nearest cell of that
    // lowest stretch (walk back over the equal-level plateau). If left
    // cannot make it fall, probe right the same way. If neither direction
    // can, the droplet rises at k itself.
    const n = heights.length;
    for (let drop = 0; drop < volume; ++drop) {
        let pos = k;
        while (pos > 0 && heights[pos - 1] <= heights[pos]) {
            pos--;
        }
        if (heights[pos] < heights[k]) {
            while (heights[pos + 1] === heights[pos]) {
                pos++;
            }
            heights[pos]++;
            continue;
        }
        pos = k;
        while (pos < n - 1 && heights[pos + 1] <= heights[pos]) {
            pos++;
        }
        if (heights[pos] < heights[k]) {
            while (heights[pos - 1] === heights[pos]) {
                pos--;
            }
            heights[pos]++;
            continue;
        }
        heights[k]++;
    }
    return heights;
};
