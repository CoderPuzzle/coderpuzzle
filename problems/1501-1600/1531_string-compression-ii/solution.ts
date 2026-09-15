function getLengthOfOptimalCompression(s: string, k: number): number {
    const n = s.length;

    function calcLen(count: number): number {
        if (count === 0) return 0;
        if (count === 1) return 1;
        if (count < 10) return 2;
        if (count < 100) return 3;
        return 4;
    }

    // dp(i, budget) is the shortest encoding of s[i:] using at most
    // `budget` more deletions. Memoized on (i, budget), both bounded by n.
    const memo = new Map<number, number>();

    function dp(i: number, budget: number): number {
        if (n - i <= budget) {
            // Every remaining character can simply be deleted.
            return 0;
        }
        const key = i * (k + 1) + budget;
        if (memo.has(key)) {
            return memo.get(key) as number;
        }
        // Delete s[i] outright and move on.
        let best = budget > 0 ? dp(i + 1, budget - 1) : Infinity;
        // Or keep a run of s[i]'s character: scan forward, paying one
        // deletion for every mismatched character folded into the run.
        let same = 0;
        let diff = 0;
        for (let j = i; j < n; j += 1) {
            if (s[j] === s[i]) {
                same += 1;
            } else {
                diff += 1;
                if (diff > budget) {
                    break;
                }
            }
            best = Math.min(best, calcLen(same) + dp(j + 1, budget - diff));
        }
        memo.set(key, best);
        return best;
    }

    return dp(0, k);
}
