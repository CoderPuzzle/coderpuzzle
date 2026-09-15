/**
 * @param {number[]} heights
 * @return {number[]}
 */
var findBuildings = function (heights) {
    // A building sees the ocean iff it strictly exceeds the max of
    // everything to its right; sweep inland carrying that max.
    const out = [];
    let tallest = 0;
    for (let i = heights.length - 1; i >= 0; i--) {
        if (heights[i] > tallest) {
            out.push(i);
            tallest = heights[i];
        }
    }
    out.reverse();
    return out;
};
