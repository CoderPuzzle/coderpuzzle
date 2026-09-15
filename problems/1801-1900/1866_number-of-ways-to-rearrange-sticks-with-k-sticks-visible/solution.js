/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var rearrangeSticks = function (n, k) {
    var MOD = 1000000007;
    // cur[j] = f(i, j): i sticks, j visible
    var cur = new Array(k + 1).fill(0);
    cur[0] = 1; // f(0, 0)
    for (var i = 1; i <= n; i++) {
        var nxt = new Array(k + 1).fill(0);
        for (var j = 1; j <= k; j++) {
            nxt[j] = (cur[j - 1] + (i - 1) * cur[j]) % MOD;
        }
        cur = nxt;
    }
    return cur[k];
};
