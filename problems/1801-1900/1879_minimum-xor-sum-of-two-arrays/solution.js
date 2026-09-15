/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minimumXORSum = function (nums1, nums2) {
    var n = nums1.length;
    var size = 1 << n;
    var INF = Infinity;
    var dp = new Array(size).fill(INF);
    dp[0] = 0;
    for (var mask = 1; mask < size; mask++) {
        var i = popcount(mask) - 1; // index into nums1 for this subset
        var x = nums1[i];
        var best = INF;
        var m = mask;
        while (m !== 0) {
            var lowbit = m & -m;
            var j = bitLength(lowbit) - 1;
            var cand = dp[mask ^ lowbit] + (x ^ nums2[j]);
            if (cand < best) best = cand;
            m -= lowbit;
        }
        dp[mask] = best;
    }
    return dp[size - 1];
};

function popcount(v) {
    var cnt = 0;
    while (v !== 0) {
        v &= v - 1;
        cnt++;
    }
    return cnt;
}

function bitLength(v) {
    var len = 0;
    while (v !== 0) {
        v = Math.floor(v / 2);
        len++;
    }
    return len;
}
