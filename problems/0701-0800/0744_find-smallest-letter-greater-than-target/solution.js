/**
 * @param {string[]} letters
 * @param {string} target
 * @return {string}
 */
var nextGreatestLetter = function (letters, target) {
    // Upper bound over the half-open range [lo, hi): the first index whose
    // letter is strictly greater than target. The wrap below handles the
    // case where no letter qualifies.
    let lo = 0;
    let hi = letters.length;
    while (lo < hi) {
        const mid = lo + ((hi - lo) >> 1);
        if (letters[mid] <= target) {
            // At or below target — not strictly greater — so the answer
            // sits strictly right of mid.
            lo = mid + 1;
        } else {
            // letters[mid] > target keeps mid a live candidate.
            hi = mid;
        }
    }
    // No letter is strictly greater: wrap to the first letter.
    return lo < letters.length ? letters[lo] : letters[0];
};
