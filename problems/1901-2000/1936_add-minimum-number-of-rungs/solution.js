/**
 * @param {number[]} rungs
 * @param {number} dist
 * @return {number}
 */
var addRungs = function (rungs, dist) {
    // Greedy: bridge each gap with as few rungs as possible, placing each
    // new rung as high as the current position allows. A gap of g between
    // two heights needs ceil(g / dist) - 1 extra rungs.
    let added = 0;
    let current = 0;
    for (const height of rungs) {
        const gap = height - current;
        added += Math.floor((gap - 1) / dist);
        current = height;
    }
    return added;
};
