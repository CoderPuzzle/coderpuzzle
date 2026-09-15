/**
 * @param {string} num
 * @return {string}
 */
var nextPalindrome = function (num) {
    // A palindrome is fully determined by its first half (the middle digit
    // of an odd-length palindrome is fixed by the multiset). The smallest
    // larger palindrome rearranging the same digits is the next
    // permutation of the first floor(n/2) digits, mirrored.
    const n = num.length;
    if (n === 1) {
        return "";
    }
    const half = Array.from(num.slice(0, Math.floor(n / 2)));
    let i = half.length - 2;
    while (i >= 0 && half[i] >= half[i + 1]) {
        i--;
    }
    if (i < 0) {
        return "";
    }
    let j = half.length - 1;
    while (half[j] <= half[i]) {
        j--;
    }
    [half[i], half[j]] = [half[j], half[i]];
    const suffix = half.splice(i + 1).reverse();
    half.push(...suffix);
    const h = half.join("");
    const mirrored = h.split("").reverse().join("");
    if (n % 2 === 0) {
        return h + mirrored;
    }
    return h + num[Math.floor(n / 2)] + mirrored;
};
