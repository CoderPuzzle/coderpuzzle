function shortestWay(source: string, target: string): number {
    const n = source.length;
    const m = target.length;
    let j = 0;
    let count = 0;
    while (j < m) {
        // One pass through source: greedily consume as much of the
        // remaining target as a subsequence match allows.
        const start = j;
        for (let i = 0; i < n; i++) {
            if (j < m && source[i] === target[j]) j++;
        }
        // A pass that matched nothing means target[j] never occurs in
        // source at all, so target can never be finished.
        if (j === start) return -1;
        count++;
    }
    return count;
}
