function minCost(s: string, encCost: number, flatCost: number): number {
    // A segment's cost depends only on its length L and its count X of
    // ones: flatCost when X == 0, otherwise L * X * encCost. Because an
    // even segment may be split into two equal halves, the best value of
    // a segment is the cheaper of stopping here or paying for both
    // halves. The halves are disjoint intervals, so a plain recursion
    // visits each reachable segment exactly once and is O(n).
    const n = s.length;
    const prefix = new Array<number>(n + 1).fill(0);
    for (let i = 0; i < n; ++i) prefix[i + 1] = prefix[i] + (s[i] === "1" ? 1 : 0);
    const solve = (l: number, length: number): number => {
        const x = prefix[l + length] - prefix[l];
        let best = x === 0 ? flatCost : length * x * encCost;
        if (length % 2 === 0) {
            const half = length >> 1;
            const split = solve(l, half) + solve(l + half, half);
            if (split < best) best = split;
        }
        return best;
    };
    return solve(0, n);
}
