/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumDistance = function (nums) {
    // The three pairwise gaps of a good tuple telescope to twice the span
    // between its outermost indices, so the closest tuple is the one whose
    // outermost same-value indices are nearest. Every value gets its own
    // bucket of indices, filled in one left-to-right pass so each bucket
    // comes out sorted for free.
    const groups = Array.from({ length: nums.length + 1 }, () => []);
    nums.forEach((num, index) => groups[num].push(index));
    // Inside a sorted bucket no triple beats some consecutive window: the
    // two entries immediately following any entry sit no later than the
    // other two entries of any triple opened there, so their window spans
    // no more.
    let best = -1;
    for (const indices of groups) {
        for (let start = 0; start + 2 < indices.length; start++) {
            const span = indices[start + 2] - indices[start];
            if (best === -1 || span < best) {
                best = span;
            }
        }
    }
    // The best span stays unset unless some value occurs at least three
    // times; otherwise no good tuple exists.
    return best === -1 ? -1 : 2 * best;
};
