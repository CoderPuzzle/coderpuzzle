/**
 * @param {string} s
 * @param {string} t
 * @param {number} k
 * @return {number}
 */
var numberOfWays = function (s, t, k) {
    const MOD = 1000000007;

    // exact modular multiplication for values < MOD (avoids > 2^53 products)
    function mulmod(a, b) {
        const bh = Math.floor(b / 32768);
        const bl = b % 32768;
        return (((a * bh) % MOD) * 32768 + a * bl) % MOD;
    }

    function countRotations(s, t) {
        // Every operation rotates s by a nonzero shift, so s is always one
        // of its n rotations. Count those equal to t by searching t in s+s
        // truncated to 2n-1 characters (dropping the last so the
        // full-string rotation is not double counted).
        const n = s.length;
        const pi = new Int32Array(n);
        for (let i = 1; i < n; i++) {
            let j = pi[i - 1];
            while (j > 0 && t.charCodeAt(i) !== t.charCodeAt(j)) {
                j = pi[j - 1];
            }
            if (t.charCodeAt(i) === t.charCodeAt(j)) {
                j += 1;
            }
            pi[i] = j;
        }
        let cnt = 0;
        let j = 0;
        const limit = 2 * n - 1;
        for (let i = 0; i < limit; i++) {
            const c = i < n ? s.charCodeAt(i) : s.charCodeAt(i - n);
            while (j > 0 && c !== t.charCodeAt(j)) {
                j = pi[j - 1];
            }
            if (c === t.charCodeAt(j)) {
                j += 1;
            }
            if (j === n) {
                cnt += 1;
                j = pi[j - 1];
            }
        }
        return cnt;
    }

    function matMul(a, b) {
        return [
            [
                (mulmod(a[0][0], b[0][0]) + mulmod(a[0][1], b[1][0])) % MOD,
                (mulmod(a[0][0], b[0][1]) + mulmod(a[0][1], b[1][1])) % MOD,
            ],
            [
                (mulmod(a[1][0], b[0][0]) + mulmod(a[1][1], b[1][0])) % MOD,
                (mulmod(a[1][0], b[0][1]) + mulmod(a[1][1], b[1][1])) % MOD,
            ],
        ];
    }

    function matPow(m, p) {
        let r = [
            [1, 0],
            [0, 1],
        ];
        while (p > 0) {
            if (p & 1) {
                r = matMul(r, m);
            }
            m = matMul(m, m);
            p = Math.floor(p / 2);
        }
        return r;
    }

    const n = s.length;
    const cnt = countRotations(s, t);
    // Aggregate rotations into two classes: cnt that spell t and n - cnt
    // that do not. From a T rotation one operation lands on cnt - 1 others
    // (the identity shift is forbidden) or n - cnt non-T; from a non-T it
    // lands on cnt T or n - 1 - cnt non-T. Length-k walk counts depend only
    // on the starting class, hence this 2x2 matrix.
    const mat = [
        [(((cnt - 1) % MOD) + MOD) % MOD, cnt % MOD],
        [(n - cnt) % MOD, (((n - 1 - cnt) % MOD) + MOD) % MOD],
    ];
    // k reaches 1e15, so exponentiate by repeated squaring: O(log k)
    // constant-size multiplications under the modulus.
    const mk = matPow(mat, k);
    // Start on the class-T rotation iff s === t; the answer is the class-T
    // component (automatically 0 when cnt = 0).
    const v0 = s === t ? 1 : 0;
    const v1 = 1 - v0;
    return (mk[0][0] * v0 + mk[0][1] * v1) % MOD;
};
