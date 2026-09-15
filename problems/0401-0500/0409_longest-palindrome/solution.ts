// A palindrome's wings mirror, so every letter it uses must pair with a
// same-letter partner on the other side — one slot per letter, lowercase
// and uppercase separate because case matters.
function longestPalindrome(s: string): number {
    const counts: number[] = new Array(52).fill(0);
    for (let i = 0; i < s.length; ++i) {
        const code = s.charCodeAt(i);
        if (code <= 90) {
            counts[code - 65]++;
        } else {
            counts[26 + code - 97]++;
        }
    }
    // Pairs contribute one letter to each wing; at most one unpaired letter
    // can occupy the center, so add 1 exactly when some count is odd and
    // leave every other leftover unused.
    let pairs = 0;
    let odd = 0;
    for (const count of counts) {
        pairs += Math.floor(count / 2);
        if (count % 2 === 1) {
            odd = 1;
        }
    }
    return pairs * 2 + odd;
}
