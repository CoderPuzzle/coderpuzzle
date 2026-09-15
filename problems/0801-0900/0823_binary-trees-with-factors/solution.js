/**
 * @param {number[]} arr
 * @return {number}
 */
var numFactoredBinaryTrees = function (arr) {
    const MOD = 1000000007;
    arr = arr.slice().sort((a, b) => a - b);
    const index = new Map();
    for (let i = 0; i < arr.length; i++) {
        index.set(arr[i], i);
    }

    // Exact modular product for values below MOD (products overflow 2^53).
    const mulMod = function (a, b) {
        const ah = Math.floor(a / 65536);
        const al = a % 65536;
        return (((((ah * b) % MOD) * 65536) % MOD) + ((al * b) % MOD)) % MOD;
    };

    const dp = new Array(arr.length).fill(1); // dp[i] = trees rooted at arr[i]
    for (let i = 0; i < arr.length; i++) {
        const v = arr[i];
        let total = 1;
        for (let j = 0; j < i; j++) {
            if (v % arr[j] === 0) {
                const other = v / arr[j];
                if (index.has(other)) {
                    total = (total + mulMod(dp[j], dp[index.get(other)])) % MOD;
                }
            }
        }
        dp[i] = total;
    }
    let result = 0;
    for (let i = 0; i < dp.length; i++) {
        result = (result + dp[i]) % MOD;
    }
    return result;
};
