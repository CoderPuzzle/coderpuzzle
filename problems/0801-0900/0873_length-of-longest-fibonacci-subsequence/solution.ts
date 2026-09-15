function lenLongestFibSubseq(arr: number[]): number {
    const n = arr.length;
    const indexOf = new Map<number, number>();
    for (let i = 0; i < n; i++) {
        indexOf.set(arr[i], i);
    }
    // dp[j][i] = longest Fibonacci-like subsequence ending with arr[j], arr[i]
    const dp: number[][] = Array.from({ length: n }, () => new Array(n).fill(2));
    let best = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            const need = arr[i] - arr[j];
            if (need < arr[j] && indexOf.has(need)) {
                const k = indexOf.get(need)!;
                dp[j][i] = dp[k][j] + 1;
                if (dp[j][i] > best) {
                    best = dp[j][i];
                }
            }
        }
    }
    return best >= 3 ? best : 0;
}
