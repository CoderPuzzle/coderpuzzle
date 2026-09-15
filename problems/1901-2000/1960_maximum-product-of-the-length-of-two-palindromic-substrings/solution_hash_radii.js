/**
 * @param {string} s
 * @return {number}
 */
var maxProduct = function (s) {
    var n = s.length;
    var a = new Array(n);
    for (var i = 0; i < n; i++) a[i] = s.charCodeAt(i) - 97;
    const MOD1 = 1000000007;
    const MOD2 = 1000000009;
    const BASE = 26;

    // Precomputed base powers plus forward and reversed prefix hashes, so
    // any substring palindrome test costs O(1).
    const pow1 = new Array(n + 1).fill(1);
    const pow2 = new Array(n + 1).fill(1);
    const pre1 = new Array(n + 1).fill(0);
    const pre2 = new Array(n + 1).fill(0);
    const rpre1 = new Array(n + 1).fill(0);
    const rpre2 = new Array(n + 1).fill(0);
    for (var j = 0; j < n; j++) {
        pow1[j + 1] = (pow1[j] * BASE) % MOD1;
        pow2[j + 1] = (pow2[j] * BASE) % MOD2;
        pre1[j + 1] = (pre1[j] * BASE + a[j]) % MOD1;
        pre2[j + 1] = (pre2[j] * BASE + a[j]) % MOD2;
        rpre1[j + 1] = (rpre1[j] * BASE + a[n - 1 - j]) % MOD1;
        rpre2[j + 1] = (rpre2[j] * BASE + a[n - 1 - j]) % MOD2;
    }

    const mod = (x, m) => ((x % m) + m) % m;
    // Operands stay below 2^30; splitting the left one into 16-bit halves
    // keeps every intermediate product below 2^53, where double arithmetic
    // is exact.
    const mulmod = (x, y, m) => {
        const xHi = Math.floor(x / 65536);
        const xLo = x % 65536;
        return (((((xHi * y) % m) * 65536) % m) + ((xLo * y) % m)) % m;
    };

    // s[l..r] is a palindrome iff its forward hash equals the forward hash
    // of the mirrored window in the reversed string; two independent
    // moduli make a false match vanishingly unlikely.
    const isPal = (l, r) => {
        const length = r - l + 1;
        const f1 = mod(pre1[r + 1] - mulmod(pre1[l], pow1[length], MOD1), MOD1);
        const g1 = mod(rpre1[n - l] - mulmod(rpre1[n - 1 - r], pow1[length], MOD1), MOD1);
        const f2 = mod(pre2[r + 1] - mulmod(pre2[l], pow2[length], MOD2), MOD2);
        const g2 = mod(rpre2[n - l] - mulmod(rpre2[n - 1 - r], pow2[length], MOD2), MOD2);
        return f1 === g1 && f2 === g2;
    };

    // A palindrome of radius k around c implies one at every smaller
    // radius, so the predicate is monotone: binary-search each center's
    // maximal reach.
    var d1 = new Array(n).fill(0);
    for (var c = 0; c < n; c++) {
        var lo = 0;
        var hi = Math.min(c, n - 1 - c);
        while (lo < hi) {
            var mid = Math.floor((lo + hi + 1) / 2);
            if (isPal(c - mid, c + mid)) lo = mid;
            else hi = mid - 1;
        }
        d1[c] = lo + 1;
    }

    // Record, per center, the longest odd palindrome that ends exactly
    // at each index and the longest that starts exactly at each index.
    var bestEnd = new Array(n).fill(0);
    var bestStart = new Array(n).fill(0);
    for (var c2 = 0; c2 < n; c2++) {
        var length = 2 * d1[c2] - 1;
        var end = c2 + d1[c2] - 1;
        var start = c2 - d1[c2] + 1;
        if (length > bestEnd[end]) bestEnd[end] = length;
        if (length > bestStart[start]) bestStart[start] = length;
    }

    // Shrink from the recorded maximum: a palindrome ending at i+1 of length L
    // implies one ending at i of length L-2 (drop one char from each side).
    for (var i2 = n - 2; i2 >= 0; i2--) {
        var candEnd = bestEnd[i2 + 1] - 2;
        if (candEnd > bestEnd[i2]) bestEnd[i2] = candEnd;
    }
    for (var i3 = 1; i3 < n; i3++) {
        var candStart = bestStart[i3 - 1] - 2;
        if (candStart > bestStart[i3]) bestStart[i3] = candStart;
    }

    // Prefix max of bestEnd / suffix max of bestStart = the longest
    // palindrome fully inside each prefix / suffix.
    var pref = new Array(n).fill(0);
    pref[0] = bestEnd[0];
    for (var i4 = 1; i4 < n; i4++) {
        pref[i4] = Math.max(pref[i4 - 1], bestEnd[i4]);
    }

    var suff = new Array(n).fill(0);
    suff[n - 1] = bestStart[n - 1];
    for (var i5 = n - 2; i5 >= 0; i5--) {
        suff[i5] = Math.max(suff[i5 + 1], bestStart[i5]);
    }

    // The two palindromes are disjoint, so some split separates them;
    // try every split. Single characters are length-1 palindromes, so
    // both sides always contribute at least 1.
    var ans = 0;
    for (var i6 = 0; i6 < n - 1; i6++) {
        var candidate = pref[i6] * suff[i6 + 1];
        if (candidate > ans) ans = candidate;
    }
    return ans;
};
