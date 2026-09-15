/**
 * @param {string[]} names
 * @param {number[]} heights
 * @return {string[]}
 */
var sortPeople = function (names, heights) {
    // Sort indices by descending height; heights are distinct, so the
    // comparator fully orders every pair and no stability is relied on.
    const order = [...names.keys()].sort((a, b) => heights[b] - heights[a]);
    return order.map((i) => names[i]);
};
