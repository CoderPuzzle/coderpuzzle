/**
 * @param {string} s
 * @param {number} t
 * @param {number[]} nums
 * @return {number}
 */
var lengthAfterTransformations = function (s, t, nums) {
    const MOD = 1000000007n;
    const mulmod = (a, b) => Number((BigInt(a) * BigInt(b)) % MOD);

    const matMul = (a, b) => {
        const size = a.length;
        const c = Array.from({ length: size }, () => new Array(size).fill(0));
        for (let i = 0; i < size; i++) {
            for (let k = 0; k < size; k++) {
                const aik = a[i][k];
                if (aik === 0) continue;
                const rowB = b[k];
                const rowC = c[i];
                for (let j = 0; j < size; j++) {
                    rowC[j] = (rowC[j] + mulmod(aik, rowB[j])) % Number(MOD);
                }
            }
        }
        return c;
    };

    const matPow = (base, exp) => {
        const size = base.length;
        let result = Array.from({ length: size }, (_, i) => Array.from({ length: size }, (_, j) => (i === j ? 1 : 0)));
        while (exp > 0) {
            if (exp & 1) {
                result = matMul(result, base);
            }
            base = matMul(base, base);
            exp = Math.floor(exp / 2);
        }
        return result;
    };

    const v = new Array(26).fill(0);
    for (const ch of s) {
        v[ch.charCodeAt(0) - 97] += 1;
    }

    // transition[i][j] = 1 if character j produces character i.
    const transition = Array.from({ length: 26 }, () => new Array(26).fill(0));
    for (let j = 0; j < 26; j++) {
        for (let a = 1; a <= nums[j]; a++) {
            transition[(j + a) % 26][j] = 1;
        }
    }

    const powered = matPow(transition, t);
    let total = 0;
    const modNum = Number(MOD);
    for (let i = 0; i < 26; i++) {
        let si = 0;
        for (let j = 0; j < 26; j++) {
            si = (si + mulmod(powered[i][j], v[j])) % modNum;
        }
        total = (total + si) % modNum;
    }
    return total;
};
