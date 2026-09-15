function rangeSum(nums: number[], n: number, left: number, right: number): number {
    const MOD = 1000000007n;
    // Every subarray sum, generated with a running total per start index so
    // each end index adds O(1) work instead of re-summing nums[i..j].
    const sums: number[] = [];
    for (let i = 0; i < n; ++i) {
        let running = 0;
        for (let j = i; j < n; ++j) {
            running += nums[j];
            sums.push(running);
        }
    }
    sums.sort((a, b) => a - b);
    // 1-indexed [left, right] window, accumulated with BigInt and reduced
    // modulo 1e9 + 7 — the raw sum can exceed a safe double/32-bit
    // accumulator even though no single subarray sum does.
    let answer = 0n;
    for (let k = left - 1; k < right; ++k) {
        answer = (answer + BigInt(sums[k])) % MOD;
    }
    return Number(answer);
}
