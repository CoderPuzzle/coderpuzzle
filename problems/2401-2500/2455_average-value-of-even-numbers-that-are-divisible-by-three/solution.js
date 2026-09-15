/**
 * @param {number[]} nums
 * @return {number}
 */
var averageValue = function (nums) {
    // Divisible by 2 and by 3 means divisible by 6 (hint 2). Sum the
    // multiples of 6, count them, and floor-divide; with none present
    // return 0 as the statement asks.
    let total = 0;
    let count = 0;
    for (const value of nums) {
        if (value % 6 === 0) {
            total += value;
            count++;
        }
    }
    return count === 0 ? 0 : Math.floor(total / count);
};
