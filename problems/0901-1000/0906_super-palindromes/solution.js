/**
 * @param {string} left
 * @param {string} right
 * @return {number}
 */
var superpalindromesInRange = function (left, right) {
    // The square root of a super-palindrome is itself a palindrome, so
    // candidates come from the roots, never from the values: build every
    // palindromic root of up to nine digits by mirroring a half, square
    // it, and keep the squares that are palindromes inside the range.
    // Nine digits of root suffice because right is below 10^18 and the
    // root of anything below 10^18 is below 10^9.
    //
    // A JS number is not exact past 2^53 and the squares reach 10^18, so
    // the roots, squares, and both bounds live in bigint; only the half
    // counter and the count stay numbers.
    const low = BigInt(left);
    const high = BigInt(right);
    let count = 0;
    for (let length = 1; length <= 9; length++) {
        const halfLength = (length + 1) >> 1;
        for (let half = 10 ** (halfLength - 1); half < 10 ** halfLength; half++) {
            const digits = String(half);
            const mirrored = digits
                .slice(0, length - halfLength)
                .split("")
                .reverse()
                .join("");
            const root = BigInt(digits + mirrored);
            const square = root * root;
            // Roots ascend across widths and halves alike, so squares do
            // too: the first square above `high` ends the scan.
            if (square > high) {
                return count;
            }
            if (square >= low && isPalindrome(square)) {
                count++;
            }
        }
    }
    return count;
};

// A bigint is a palindrome when its digits read the same both ways.
function isPalindrome(value) {
    const digits = value.toString();
    return digits === digits.split("").reverse().join("");
}
