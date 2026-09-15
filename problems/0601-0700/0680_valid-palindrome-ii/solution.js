/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
    // Walk two pointers inward while the outer pairs agree. The first
    // mismatch is the only place a deletion can matter: it must remove one
    // end of the broken pair, so the answer is whether the stretch without
    // the left char or the stretch without the right char is an exact
    // palindrome. An unbroken walk needs no deletion at all.
    function isPalindrome(lo, hi) {
        while (lo < hi) {
            if (s[lo] !== s[hi]) {
                return false;
            }
            lo++;
            hi--;
        }
        return true;
    }
    let lo = 0;
    let hi = s.length - 1;
    while (lo < hi) {
        if (s[lo] !== s[hi]) {
            return isPalindrome(lo + 1, hi) || isPalindrome(lo, hi - 1);
        }
        lo++;
        hi--;
    }
    return true;
};
