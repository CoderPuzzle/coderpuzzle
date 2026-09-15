/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reversePrefix = function (s, k) {
    // Mutable buffer; two pointers close on the middle of the prefix.
    const chars = s.split("");
    let left = 0;
    let right = k - 1;
    while (left < right) {
        const tmp = chars[left];
        chars[left] = chars[right];
        chars[right] = tmp;
        left++;
        right--;
    }
    return chars.join("");
};
