/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function (nums) {
    // The judge pins one exact answer: the even values in the order they
    // appear, then the odd values in the order they appear. One scan routes
    // each value into its group as it is read — a value's arrival order
    // inside its group is its input order, so the concatenation of the two
    // groups is the answer, with no value compared by magnitude.
    const evens = [];
    const odds = [];
    for (const value of nums) {
        if (value % 2 === 0) {
            evens.push(value);
        } else {
            odds.push(value);
        }
    }
    return evens.concat(odds);
};
