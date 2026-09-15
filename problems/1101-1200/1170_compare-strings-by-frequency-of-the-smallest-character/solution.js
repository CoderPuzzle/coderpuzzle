/**
 * @param {string[]} queries
 * @param {string[]} words
 * @return {number[]}
 */
var numSmallerByFrequency = function (queries, words) {
    var f = function (s) {
        // Smallest character of the string, then how often it appears.
        var smallest = s[0];
        for (var i = 1; i < s.length; i++) {
            if (s[i] < smallest) {
                smallest = s[i];
            }
        }
        var count = 0;
        for (var i = 0; i < s.length; i++) {
            if (s[i] === smallest) {
                count++;
            }
        }
        return count;
    };
    var freqs = words.map(f).sort(function (a, b) {
        return a - b;
    });
    return queries.map(function (q) {
        var p = f(q);
        // Everything strictly above p forms one sorted suffix; find where it
        // starts.
        var lo = 0;
        var hi = freqs.length;
        while (lo < hi) {
            var mid = (lo + hi) >> 1;
            if (freqs[mid] <= p) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return freqs.length - lo;
    });
};
