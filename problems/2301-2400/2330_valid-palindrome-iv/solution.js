/**
 * @param {string} s
 * @return {boolean}
 */
var makePalindrome = function (s) {
    let mismatches = 0;
    for (let left = 0, right = s.length - 1; left < right; left++, right--) {
        if (s[left] !== s[right]) mismatches++;
    }
    return mismatches <= 2;
};
