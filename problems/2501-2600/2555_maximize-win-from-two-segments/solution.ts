// Sliding windows in each direction build the best single k-window inside
// every index prefix and suffix; the answer maximizes their sum over all
// split points. Counts stay <= n <= 10^5.
function maximizeWin(prizePositions: number[], k: number): number {
    const pp = prizePositions;
    const n = pp.length;
    const pre: number[] = new Array(n + 1).fill(0);
    for (let t = 0, s = 0, mx = 0; t < n; t++) {
        while (pp[t] - pp[s] > k) s++;
        mx = Math.max(mx, t - s + 1);
        pre[t + 1] = mx;
    }
    const suf: number[] = new Array(n + 1).fill(0);
    for (let e = n - 1, g = n - 1, mx = 0; e >= 0; e--) {
        while (pp[g] - pp[e] > k) g--;
        mx = Math.max(mx, g - e + 1);
        suf[e] = mx;
    }
    let ans = 0;
    for (let c = 0; c <= n; c++) {
        ans = Math.max(ans, pre[c] + suf[c]);
    }
    return ans;
}
