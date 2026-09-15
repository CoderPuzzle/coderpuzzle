/**
 * @param {number[]} nums
 * @return {number}
 */
var countValidSelections = function (nums) {
    // The constraints are tiny, so replay the process literally: for every
    // zero cell walk both directions on a scratch copy. A zero cell
    // advances curr; a positive cell is decremented and flips the direction
    // before the step. A selection counts when the walk leaves the array
    // with every value at zero.
    const finishes = (start, step) => {
        const cells = [...nums];
        let curr = start;
        while (curr >= 0 && curr < cells.length) {
            if (cells[curr] === 0) {
                curr += step;
            } else {
                cells[curr] -= 1;
                step = -step;
                curr += step;
            }
        }
        return cells.every((cell) => cell === 0);
    };
    let total = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            if (finishes(i, 1)) {
                total++;
            }
            if (finishes(i, -1)) {
                total++;
            }
        }
    }
    return total;
};
