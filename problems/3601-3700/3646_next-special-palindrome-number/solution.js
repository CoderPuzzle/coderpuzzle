/**
 * @param {number} n
 * @return {number}
 */
var specialPalindrome = function (n) {
    // A palindrome carries at most one digit an odd number of times, so a
    // digit set works only with at most one odd member; any set whose digits
    // sum past 16 makes palindromes of 17+ digits, beyond every answer
    // reachable from n <= 10^15. Every folded value stays below 10^16, well
    // inside the 2^53 range where JS numbers stay exact.
    const limit = 4000000000000000;
    let answer = limit;
    for (let mask = 1; mask < 512; mask++) {
        const digits = [];
        let odds = 0;
        let total = 0;
        for (let d = 1; d <= 9; d++) {
            if ((mask >> (d - 1)) & 1) {
                digits.push(d);
                odds += d & 1;
                total += d;
            }
        }
        if (odds > 1 || total > 16) {
            continue;
        }
        // Each member k lays k / 2 copies into each half (built ascending,
        // since digits are); a lone odd member also takes the middle.
        let mid = 0;
        const half = [];
        for (const d of digits) {
            if (d & 1) {
                mid = d;
            }
            // Integer division on purpose: an odd member keeps its spare
            // copy out of the halves.
            for (let c = Math.floor(d / 2); c > 0; c--) {
                half.push(d);
            }
        }
        // Mirroring preserves order, so lexicographic halves enumerate this
        // set's palindromes in increasing numeric order.
        while (true) {
            let pal = 0;
            for (const d of half) {
                pal = pal * 10 + d;
            }
            if (mid > 0) {
                pal = pal * 10 + mid;
            }
            for (let i = half.length - 1; i >= 0; i--) {
                pal = pal * 10 + half[i];
            }
            if (pal > limit) {
                break; // later halves only mirror to larger numbers
            }
            if (pal > n) {
                answer = Math.min(answer, pal);
                break; // first past n is this set's best
            }
            if (!nextPermutation(half)) {
                break;
            }
        }
    }
    return answer;
};

function nextPermutation(a) {
    // Advance a multiset to its next distinct permutation in place; false
    // once it has reached the last (descending) arrangement.
    let i = a.length - 2;
    while (i >= 0 && a[i] >= a[i + 1]) {
        i -= 1;
    }
    if (i < 0) {
        return false;
    }
    let j = a.length - 1;
    while (a[j] <= a[i]) {
        j -= 1;
    }
    [a[i], a[j]] = [a[j], a[i]];
    let lo = i + 1;
    let hi = a.length - 1;
    while (lo < hi) {
        [a[lo], a[hi]] = [a[hi], a[lo]];
        lo += 1;
        hi -= 1;
    }
    return true;
}
