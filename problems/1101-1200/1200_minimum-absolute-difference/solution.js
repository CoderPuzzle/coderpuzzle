/**
 * @param {number[]} arr
 * @return {number[][]}
 */
var minimumAbsDifference = function (arr) {
    const sorted = [...arr].sort((a, b) => a - b);
    const pairs = [];
    let best = Infinity;
    for (let i = 0; i + 1 < sorted.length; i++) {
        const gap = sorted[i + 1] - sorted[i];
        if (gap < best) {
            // A strictly closer neighbour pair retires everything
            // collected against the old minimum.
            best = gap;
            pairs.length = 0;
        }
        if (gap === best) {
            pairs.push([sorted[i], sorted[i + 1]]);
        }
    }
    return pairs;
};
