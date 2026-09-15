/**
 * @param {number} n
 * @param {number[][]} paths
 * @return {number}
 */
var longestCommonSubpath = function (n, paths) {
    // Two independent moduli combined into one key make an accidental
    // collision astronomically unlikely.
    var MOD1 = 1000000007;
    var MOD2 = 1000000009;
    var BASE = 1000003;

    function exists(length) {
        if (length === 0) return true;
        var common = null;
        for (var p = 0; p < paths.length; p++) {
            var path = paths[p];
            if (path.length < length) return false;
            var h1 = 0,
                h2 = 0;
            var power1 = 1,
                power2 = 1;
            // +1 per city id so a run of city 0 never hashes to the all-zero value.
            for (var i = 0; i < length; i++) {
                h1 = (h1 * BASE + path[i] + 1) % MOD1;
                h2 = (h2 * BASE + path[i] + 1) % MOD2;
                power1 = (power1 * BASE) % MOD1;
                power2 = (power2 * BASE) % MOD2;
            }
            var hashes = new Set();
            hashes.add(h1 * MOD2 + h2);
            // Roll the window: multiply by base, drop the outgoing digit
            // weighted by BASE^L, add the incoming digit (constant per step).
            for (var j = length; j < path.length; j++) {
                var out1 = ((path[j - length] + 1) * power1) % MOD1;
                var out2 = ((path[j - length] + 1) * power2) % MOD2;
                h1 = (((h1 * BASE - out1) % MOD1) + MOD1) % MOD1;
                h2 = (((h2 * BASE - out2) % MOD2) + MOD2) % MOD2;
                h1 = (h1 + path[j] + 1) % MOD1;
                h2 = (h2 + path[j] + 1) % MOD2;
                hashes.add(h1 * MOD2 + h2);
            }
            // The first path seeds the set; each later path intersects into
            // it, bailing out the moment the intersection empties.
            if (common === null) {
                common = hashes;
            } else {
                var next = new Set();
                common.forEach(function (key) {
                    if (hashes.has(key)) next.add(key);
                });
                common = next;
                if (common.size === 0) return false;
            }
        }
        return common !== null && common.size > 0;
    }

    var lo = 0;
    var hi = Math.min.apply(
        null,
        paths.map(function (p) {
            return p.length;
        }),
    );
    // Existence is monotone in L (any prefix of a common subpath is common),
    // so upper-mid binary search converges on the maximum feasible length.
    while (lo < hi) {
        var mid = Math.floor((lo + hi + 1) / 2);
        if (exists(mid)) {
            lo = mid;
        } else {
            hi = mid - 1;
        }
    }
    return lo;
};
