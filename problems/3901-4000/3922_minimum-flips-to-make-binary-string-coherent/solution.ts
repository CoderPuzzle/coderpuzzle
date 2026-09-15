function minFlips(s: string): number {
    // Track how much of each forbidden pattern ("011", "110") is already
    // matched as a subsequence of the string built so far. State (a, b)
    // means the first a chars of "011" and b chars of "110" are matched;
    // reaching 3 is dead. Costs are minimum flips per state.
    const P1 = "011";
    const P2 = "110";
    type Dp = Map<string, number>;
    let costs: Dp = new Map([["0,0", 0]]);
    for (const char of s) {
        const next: Dp = new Map();
        for (const [key, cost] of costs) {
            const parts = key.split(",");
            const a = Number(parts[0]);
            const b = Number(parts[1]);
            for (const put of ["0", "1"]) {
                const total = cost + (put !== char ? 1 : 0);
                const na = a < 3 && put === P1[a] ? a + 1 : a;
                const nb = b < 3 && put === P2[b] ? b + 1 : b;
                if (na === 3 || nb === 3) continue;
                const nk = `${na},${nb}`;
                if (!next.has(nk) || next.get(nk)! > total) next.set(nk, total);
            }
        }
        costs = next;
    }
    return Math.min(...costs.values());
}
