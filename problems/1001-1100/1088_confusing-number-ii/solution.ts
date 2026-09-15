function confusingNumberII(n: number): number {
    // DFS over the valid digits (0,1,6,8,9; no leading zero), pruning once
    // the value exceeds n. The rotated value is carried incrementally:
    // appending digit d to a k-digit value shifts the old rotation one
    // place left and prepends rot180(d).
    const digits = [0, 1, 6, 8, 9];
    const rot = [0, 1, -1, -1, -1, -1, 9, -1, 8, 6];
    const pow10 = [1];
    for (let i = 1; i <= 10; i++) pow10.push(pow10[i - 1] * 10);
    let count = 0;
    const dfs = (cur: number, rotated: number, ndigits: number) => {
        if (cur > n) return;
        if (cur > 0 && rotated !== cur) count++;
        for (const d of digits) {
            if (cur === 0 && d === 0) continue;
            const nxt = cur * 10 + d;
            if (nxt <= n) dfs(nxt, rot[d] * pow10[ndigits] + rotated, ndigits + 1);
        }
    };
    dfs(0, 0, 0);
    return count;
}
