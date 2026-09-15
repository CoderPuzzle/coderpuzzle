/**
 * @param {string} s
 * @return {string[]}
 */
var generatePalindromes = function (s) {
    const counts = new Array(26).fill(0);
    for (let i = 0; i < s.length; ++i) counts[s.charCodeAt(i) - 97]++;
    // A palindrome pairs up every letter except at most one middle occupant,
    // so a second odd count means no palindromic arrangement.
    let middle = "";
    for (let i = 0; i < 26; ++i) {
        if (counts[i] % 2 === 1) {
            if (middle) return [];
            middle = String.fromCharCode(97 + i);
        }
    }
    // Quota for the left half, one bucket per distinct letter. Choosing
    // buckets rather than positions makes every half distinct by
    // construction — the duplicate branches a naive per-position
    // permutation would explore never arise.
    const half = counts.map((count) => Math.floor(count / 2));
    const target = s.length >> 1;
    const results = [];
    const current = [];
    const walk = function () {
        // Half complete: mirror it around the odd letter, if there is one.
        if (current.length === target) {
            const left = current.join("");
            results.push(left + middle + left.split("").reverse().join(""));
            return;
        }
        // Letters ascend, so earlier positions vary slowest and the
        // palindromes come out in ascending lexicographic order.
        for (let i = 0; i < 26; ++i) {
            if (half[i] === 0) continue;
            half[i]--;
            current.push(String.fromCharCode(97 + i));
            walk();
            current.pop();
            half[i]++;
        }
    };
    walk();
    return results;
};
