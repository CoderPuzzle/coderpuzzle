function maxValue(nums: number[], k: number): number {
    const n = nums.length;
    const V = 128; // nums[i] < 2^7, OR values stay below 128

    // pre[j] = ORs of exactly k elements from first j elements (bitmask array)
    const pre: Uint8Array[] = new Array(n + 1);
    {
        const dp: Uint8Array[] = Array.from({ length: k + 1 }, () => new Uint8Array(V));
        dp[0][0] = 1;
        for (let i = 0; i < n; i++) {
            const x = nums[i];
            const top = Math.min(i + 1, k);
            for (let c = top; c >= 1; c--) {
                const src = dp[c - 1];
                const dst = dp[c];
                for (let m = 0; m < V; m++) {
                    if (src[m]) dst[m | x] = 1;
                }
            }
            pre[i + 1] = Uint8Array.from(dp[k]);
        }
    }

    // suf[i] = ORs of exactly k elements from nums[i:]
    const suf: Uint8Array[] = new Array(n + 1);
    {
        const dp: Uint8Array[] = Array.from({ length: k + 1 }, () => new Uint8Array(V));
        dp[0][0] = 1;
        for (let i = n - 1; i >= 0; i--) {
            const x = nums[i];
            const top = Math.min(n - i, k);
            for (let c = top; c >= 1; c--) {
                const src = dp[c - 1];
                const dst = dp[c];
                for (let m = 0; m < V; m++) {
                    if (src[m]) dst[m | x] = 1;
                }
            }
            suf[i] = Uint8Array.from(dp[k]);
        }
    }

    let ans = 0;
    for (let i = k; i <= n - k; i++) {
        const a = pre[i]!;
        const b = suf[i]!;
        for (let x = 0; x < V; x++) {
            if (!a[x]) continue;
            for (let y = 0; y < V; y++) {
                if (b[y]) {
                    const v = x ^ y;
                    if (v > ans) ans = v;
                }
            }
        }
    }
    return ans;
}
