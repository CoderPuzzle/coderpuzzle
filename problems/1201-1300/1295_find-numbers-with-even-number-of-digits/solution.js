/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumbers = function (nums) {
    // Each division by 10 sheds one digit; the step count is the digit
    // count. Even tallies are what we count.
    let even = 0;
    for (const value of nums) {
        let digits = 0;
        let rest = value;
        while (rest > 0) {
            rest = Math.floor(rest / 10);
            digits++;
        }
        if (digits % 2 === 0) even++;
    }
    return even;
};
