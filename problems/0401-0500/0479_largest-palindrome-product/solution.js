/**
 * @param {number} n
 * @return {number}
 */
var largestPalindrome = function (n) {
    // Every 2-digit palindrome is a multiple of 11, which no product of
    // two 1-digit factors can be, so the answer is the palindrome 9 = 3 * 3.
    if (n === 1) return 9;
    // Candidates pass 2^53 beyond Number's exact range, so the palindrome
    // and its factors live in BigInt while the half counter stays a Number.
    const hi = 10n ** BigInt(n) - 1n;
    const lo = 10n ** BigInt(n - 1);
    // A 2n-digit palindrome is fixed by its first half: enumerate halves
    // downward, so the first candidate that factors is the largest.
    for (let half = Number(hi); half >= Number(lo); half--) {
        const text = String(half);
        const palindrome = BigInt(text + text.split("").reverse().join(""));
        // Number sqrt rounds at this width, so settle the floor exactly.
        let root = BigInt(Math.floor(Math.sqrt(Number(palindrome))));
        while (root * root > palindrome) root -= 1n;
        while ((root + 1n) * (root + 1n) <= palindrome) root += 1n;
        // The larger factor of any pair lies between hi and the integer
        // square root; the cofactor check rejects pairs whose cofactor runs
        // a digit long.
        for (let factor = hi; factor >= root; factor -= 1n) {
            if (palindrome % factor === 0n) {
                const other = palindrome / factor;
                if (other >= lo && other <= hi) return Number(palindrome % 1337n);
            }
        }
    }
    // Every width from 2 up has a palindromic product; this is only the
    // exit the function needs.
    return 0;
};
