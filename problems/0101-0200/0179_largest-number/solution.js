/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function (nums) {
    const strs = nums.map(String);
    // a precedes b exactly when the concatenation a + b beats b + a —
    // numeric comparison is useless (3 must come before 30). A sorted result
    // admits no adjacent swap that enlarges the string, so it is maximal.
    strs.sort(function (a, b) {
        const ab = a + b;
        const ba = b + a;
        if (ab > ba) {
            return -1;
        }
        if (ab < ba) {
            return 1;
        }
        return 0;
    });
    const result = strs.join("");
    // Leading zero means every input was 0.
    return result[0] === "0" ? "0" : result;
};
