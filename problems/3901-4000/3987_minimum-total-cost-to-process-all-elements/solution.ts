function minimumCost(nums: number[], k: number): number {
    let s = 0n;
    for (const value of nums) s += BigInt(value);
    const step = BigInt(k),
        c = (s + step - 1n) / step - 1n,
        m = 1000000007n;
    return Number(((c * (c + 1n)) / 2n) % m);
}
