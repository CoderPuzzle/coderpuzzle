/**
 * @param {number} n
 * @param {string} s1
 * @param {string} s2
 * @param {string} evil
 * @return {number}
 */
var findGoodStrings = function (n, s1, s2, evil) {
    var MOD = 1000000007;
    var m = evil.length;
    var fail = new Array(m).fill(0);
    var k = 0;
    for (var i = 1; i < m; i++) {
        while (k > 0 && evil.charCodeAt(i) !== evil.charCodeAt(k)) {
            k = fail[k - 1];
        }
        if (evil.charCodeAt(i) === evil.charCodeAt(k)) {
            k += 1;
        }
        fail[i] = k;
    }

    function advance(state, code) {
        while (state > 0 && evil.charCodeAt(state) !== code) {
            state = fail[state - 1];
        }
        if (evil.charCodeAt(state) === code) {
            state += 1;
        }
        return state;
    }

    // dp indexed by ((pos * (m + 1) + state) * 2 + lo) * 2 + hi
    var stride = (m + 1) * 4;
    var dp = new Float64Array((n + 1) * stride);

    // pos == n
    for (var st = 0; st <= m; st++) {
        for (var lo = 0; lo <= 1; lo++) {
            for (var hi = 0; hi <= 1; hi++) {
                dp[(n * (m + 1) + st) * 4 + lo * 2 + hi] = st === m ? 0 : 1;
            }
        }
    }
    var s1c = [];
    var s2c = [];
    for (var q = 0; q < n; q++) {
        s1c.push(s1.charCodeAt(q));
        s2c.push(s2.charCodeAt(q));
    }
    for (var pos = n - 1; pos >= 0; pos--) {
        for (var state2 = 0; state2 <= m; state2++) {
            for (var lo2 = 0; lo2 <= 1; lo2++) {
                for (var hi2 = 0; hi2 <= 1; hi2++) {
                    var idx = (pos * (m + 1) + state2) * 4 + lo2 * 2 + hi2;
                    if (state2 === m) {
                        dp[idx] = 0;
                        continue;
                    }
                    var lowC = lo2 ? s1c[pos] : 97;
                    var highC = hi2 ? s2c[pos] : 122;
                    var total = 0;
                    for (var code = lowC; code <= highC; code++) {
                        var ns = advance(state2, code);
                        if (ns === m) continue;
                        var nlo = lo2 && code === s1c[pos] ? 1 : 0;
                        var nhi = hi2 && code === s2c[pos] ? 1 : 0;
                        total += dp[((pos + 1) * (m + 1) + ns) * 4 + nlo * 2 + nhi];
                    }
                    dp[idx] = total % MOD;
                }
            }
        }
    }
    return dp[(0 * (m + 1) + 0) * 4 + 1 * 2 + 1] % MOD;
};
