/**
 * @param {string} palindrome
 * @return {string}
 */
var breakPalindrome = function (palindrome) {
    // One change in the first half decides lexicographic order; lower the
    // first non-'a' there to 'a'. All-'a' halves force the last spot to 'b';
    // length 1 can never stop being a palindrome.
    const n = palindrome.length;
    if (n === 1) return "";
    const chars = palindrome.split("");
    for (let i = 0; i < Math.floor(n / 2); ++i) {
        if (chars[i] !== "a") {
            chars[i] = "a";
            return chars.join("");
        }
    }
    chars[n - 1] = "b";
    return chars.join("");
};
