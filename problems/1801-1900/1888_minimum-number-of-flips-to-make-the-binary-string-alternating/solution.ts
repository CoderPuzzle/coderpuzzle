function minFlips(s: string): number {
    const n = s.length;
    const t = s + s;
    // pre[i] = mismatches of t[0:i] against the absolute pattern 0,1,0,1,...
    const pre = new Array(t.length + 1).fill(0);
    for (let i = 0; i < t.length; i++) {
        const want = i & 1 ? "1" : "0";
        pre[i + 1] = pre[i] + (t[i] !== want ? 1 : 0);
    }
    let best = n;
    for (let k = 0; k < n; k++) {
        const absMismatch = pre[k + n] - pre[k];
        const costA = k & 1 ? n - absMismatch : absMismatch;
        best = Math.min(best, costA, n - costA);
    }
    return best;
}
