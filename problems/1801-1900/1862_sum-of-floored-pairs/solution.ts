function sumOfFlooredPairs(nums: number[]): number {
    const MOD = 1000000007;
    if (nums.length === 0) {
        return 0;
    }
    let maxVal = 0;
    for (const v of nums) {
        if (v > maxVal) maxVal = v;
    }
    const count: number[] = new Array(maxVal + 1).fill(0);
    for (const v of nums) {
        count[v] += 1;
    }
    const prefix: number[] = new Array(maxVal + 1);
    let running = 0;
    for (let v = 0; v <= maxVal; v++) {
        running += count[v];
        prefix[v] = running;
    }
    let total = 0;
    for (let y = 1; y <= maxVal; y++) {
        if (count[y] === 0) {
            continue;
        }
        // sum over x of floor(x / y) * count[x]
        // = sum over m >= 1 of #{x : x >= m * y}
        let c = 0;
        for (let m = y; m <= maxVal; m += y) {
            c += prefix[maxVal] - prefix[m - 1];
        }
        total = (total + count[y] * c) % MOD;
    }
    return total;
}
