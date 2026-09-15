/**
 * @param {string} s
 * @return {number}
 */
var removePalindromeSub = function (s) {
    // One letter's positions form a palindrome by themselves, so two steps
    // always suffice; a single step works iff s is a palindrome.
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
        if (s[left] !== s[right]) return 2;
        ++left;
        --right;
    }
    return 1;
};
