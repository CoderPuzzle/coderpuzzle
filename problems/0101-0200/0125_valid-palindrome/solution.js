/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
    // Two pointers walk inward from both ends. Each skips the characters
    // the rules erase, so one lowercase comparison per surviving pair
    // decides the answer and no filtered copy of s is ever built.
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
        // Punctuation and spaces are removed by the normalization, so they
        // can never break the mirror: step past them.
        while (left < right && !isAlphanumeric(s[left])) left++;
        while (left < right && !isAlphanumeric(s[right])) right--;
        // Comparing lowercased characters applies the case rule in place;
        // digits lower to themselves, so one path covers both kinds.
        if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
        left++;
        right--;
    }
    return true;
};

// Explicit ASCII ranges instead of a regex: digits, then letters.
function isAlphanumeric(c) {
    return (c >= "0" && c <= "9") || (c >= "a" && c <= "z") || (c >= "A" && c <= "Z");
}
