/**
 * @param {number[]} nums
 * @return {number[]}
 */
var onceTwice = function (nums) {
    // Exactly one value occurs once, one occurs twice, the rest thrice;
    // a frequency table over the distinct values finds the two specials.
    const counts = new Map();
    for (const x of nums) counts.set(x, (counts.get(x) || 0) + 1);
    let once = 0,
        twice = 0;
    // First answer is the count-1 value, second the count-2 value.
    for (const [value, count] of counts) {
        if (count === 1) once = value;
        else if (count === 2) twice = value;
    }
    return [once, twice];
};
