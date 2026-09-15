/**
 * @param {number} n
 * @return {number}
 */
var nextGreaterElement = function (n) {
    // Rearranging n's digits, the answer is the immediate successor of
    // n's digit string among all rearrangements — the classic
    // next-permutation step. Scan from the right for the first digit
    // below its right neighbor (the pivot); none means the digits are
    // entirely non-increasing and n is already the largest arrangement.
    // The suffix past the pivot is non-increasing, so the smallest digit
    // larger than the pivot is the rightmost one that beats it: swap the
    // two, then reverse the (still non-increasing) suffix to sort it
    // ascending — the smallest tail those digits can form.
    const digits = String(n).split("");
    const length = digits.length;
    let i = length - 2;
    while (i >= 0 && digits[i] >= digits[i + 1]) {
        i--;
    }
    if (i < 0) {
        return -1;
    }
    let j = length - 1;
    while (digits[j] <= digits[i]) {
        j--;
    }
    [digits[i], digits[j]] = [digits[j], digits[i]];
    for (let lo = i + 1, hi = length - 1; lo < hi; lo++, hi--) {
        [digits[lo], digits[hi]] = [digits[hi], digits[lo]];
    }
    // n reaches 2³¹ - 1 (ten digits) and the successor can run one digit
    // wider — 9,999,999,999 at most, far inside the 2⁵³ through which
    // doubles count integers exactly — so the rebuilt value is compared
    // against the 32-bit ceiling exactly.
    const result = Number(digits.join(""));
    return result <= 2147483647 ? result : -1;
};
