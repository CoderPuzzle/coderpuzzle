/**
 * @param {string} s
 * @return {number}
 */
var maxProduct = function (s) {
    var n = s.length;

    // Manacher (odd palindromes): d1[i] = number of odd palindromes centered at i
    var d1 = new Array(n).fill(0);
    var left = 0,
        right = -1;
    for (var i = 0; i < n; i++) {
        var k = 1;
        if (i <= right) {
            var mirror = d1[left + right - i];
            var span = right - i + 1;
            k = mirror < span ? mirror : span;
        }
        while (i - k >= 0 && i + k < n && s[i - k] === s[i + k]) {
            k++;
        }
        d1[i] = k;
        if (i + k - 1 > right) {
            left = i - k + 1;
            right = i + k - 1;
        }
    }

    // Record, per center, the longest odd palindrome that ends exactly
    // at each index and the longest that starts exactly at each index.
    var bestEnd = new Array(n).fill(0);
    var bestStart = new Array(n).fill(0);
    for (var c = 0; c < n; c++) {
        var length = 2 * d1[c] - 1;
        var end = c + d1[c] - 1;
        var start = c - d1[c] + 1;
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
