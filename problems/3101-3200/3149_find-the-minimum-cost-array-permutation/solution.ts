function findPermutation(nums: number[]): number[] {
    const n = nums.length;
    const full = (1 << n) - 1;
    const INF = Infinity;

    // f[mask][last] = min additional cost to visit all elements not in mask,
    // starting from `last`, including the closing edge to nums[0]
    const f: number[][] = [];
    for (let mask = 0; mask <= full; mask++) f.push(new Array(n).fill(INF));
    for (let last = 0; last < n; last++) {
        f[full][last] = Math.abs(last - nums[0]);
    }
    for (let mask = full - 1; mask >= 1; mask--) {
        for (let last = 0; last < n; last++) {
            if (!((mask >> last) & 1)) continue;
            let best = INF;
            for (let nxt = 0; nxt < n; nxt++) {
                if ((mask >> nxt) & 1) continue;
                const cost = Math.abs(last - nums[nxt]) + f[mask | (1 << nxt)][nxt];
                if (cost < best) best = cost;
            }
            f[mask][last] = best;
        }
    }

    // greedy reconstruction: smallest next element keeping the cost optimal
    const perm: number[] = [0];
    let mask = 1;
    let last = 0;
    for (let step = 1; step < n; step++) {
        for (let nxt = 0; nxt < n; nxt++) {
            if ((mask >> nxt) & 1) continue;
            if (Math.abs(last - nums[nxt]) + f[mask | (1 << nxt)][nxt] === f[mask][last]) {
                perm.push(nxt);
                mask |= 1 << nxt;
                last = nxt;
                break;
            }
        }
    }
    return perm;
}
