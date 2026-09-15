/**
 * @param {string} s
 * @return {string}
 */
var trimTrailingVowels = function (s) {
    let end = s.length;
    while (end > 0 && "aeiou".includes(s[end - 1])) {
        end--;
    }
    return s.slice(0, end);
};
