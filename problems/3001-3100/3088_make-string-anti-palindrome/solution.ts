// Swaps reach every permutation of s, so the answer is the
// lexicographically smallest anti-palindrome rearrangement. Sorting
// already gives the smallest possible left half, and the left half of a
// sorted string never mirrors onto itself, so only the right half needs
// repair: whenever a position matches its mirror, swap in the next larger
// letter, tracked by a pointer that only moves right. The pointer running
// off the end means some letter fills more than half the string — no
// arrangement can separate it.
function makeAntiPalindrome(s: string): string {
    const chars = Array.from(s).sort();
    const n = chars.length;
    let p = n / 2;
    for (let i = n / 2; i < n; i++) {
        if (chars[i] === chars[n - 1 - i]) {
            while (p < n && chars[p] === chars[i]) {
                p++;
            }
            if (p === n) {
                return "-1";
            }
            [chars[i], chars[p]] = [chars[p], chars[i]];
            p++;
        }
    }
    return chars.join("");
}
