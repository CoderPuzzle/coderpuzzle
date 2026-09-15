function rearrangeSticks(n: number, k: number): number {
    const MOD = 1000000007;
    // cur[j] = f(i, j): i sticks, j visible
    let cur: number[] = new Array(k + 1).fill(0);
    cur[0] = 1; // f(0, 0)
    for (let i = 1; i <= n; i++) {
        const nxt: number[] = new Array(k + 1).fill(0);
        for (let j = 1; j <= k; j++) {
            nxt[j] = (cur[j - 1] + (i - 1) * cur[j]) % MOD;
        }
        cur = nxt;
    }
    return cur[k];
}
