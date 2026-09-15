function numFactoredBinaryTrees(arr: number[]): number {
    const MOD = 1000000007;
    arr = arr.slice().sort((a, b) => a - b);
    const index = new Map<number, number>();
    for (let i = 0; i < arr.length; i++) {
        index.set(arr[i], i);
    }

    // Exact modular product for values below MOD (products overflow 2^53).
    const mulMod = (a: number, b: number): number => {
        const ah = Math.floor(a / 65536);
        const al = a % 65536;
        return (((((ah * b) % MOD) * 65536) % MOD) + ((al * b) % MOD)) % MOD;
    };

    const dp: number[] = new Array(arr.length).fill(1); // dp[i] = trees rooted at arr[i]
    for (let i = 0; i < arr.length; i++) {
        const v = arr[i];
        let total = 1;
        for (let j = 0; j < i; j++) {
            if (v % arr[j] === 0) {
                const other = v / arr[j];
                if (index.has(other)) {
                    total = (total + mulMod(dp[j], dp[index.get(other)!])) % MOD;
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
}
