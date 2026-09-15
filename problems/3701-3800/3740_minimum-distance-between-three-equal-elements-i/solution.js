/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumDistance = function (nums) {
    // Sorted as a < b < c, a good tuple's distance collapses to
    // (b - a) + (c - b) + (c - a) = 2 * (c - a): only the outermost
    // indices matter, so the tightest triple of a value spans three
    // consecutive occurrences of it.
    let best = -1;
    // Last two indices seen for each value; any older occurrence can only
    // widen the span, so it never matters again.
    const recent = new Map();
    for (let i = 0; i < nums.length; i++) {
        let last = recent.get(nums[i]);
        if (last === undefined) {
            last = [];
            recent.set(nums[i], last);
        }
        if (last.length === 2) {
            const distance = 2 * (i - last[0]);
            if (best === -1 || distance < best) {
                best = distance;
            }
            last[0] = last[1];
            last[1] = i;
        } else {
            last.push(i);
        }
    }
    return best;
};
