// Per part, an index may serve at most one swap, one replace and one
// reversal, so an optimal schedule permutes first (at most one reversal
// plus disjoint swaps) and replaces what is left. A swap pays off exactly
// on a mutual pair (a,b)/(b,a); with type counts cnt[a][b] = #{p: s[p]=a
// != t[p]=b}, the largest swap matching is sum min(cnt[a][b], cnt[b][a]),
// and the part costs wrong - pairs, or 1 + wrong' - pairs' when reversed
// first.
function minOperations(word1: string, word2: string): number {
    const n = word1.length;
    const swapPairs = (cnt: number[][]): number => {
        let total = 0;
        for (let a = 0; a < 26; a++) for (let b = a + 1; b < 26; b++) total += Math.min(cnt[a][b], cnt[b][a]);
        return total;
    };
    const cost: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            const cnt: number[][] = Array.from({ length: 26 }, () => new Array(26).fill(0));
            const cntRev: number[][] = Array.from({ length: 26 }, () => new Array(26).fill(0));
            let wrong = 0;
            let wrongRev = 0;
            for (let p = i; p <= j; p++) {
                const a = word1.charCodeAt(p) - 97;
                const b = word2.charCodeAt(p) - 97;
                if (a !== b) {
                    wrong++;
                    cnt[a][b]++;
                }
                const aRev = word1.charCodeAt(j - (p - i)) - 97;
                if (aRev !== b) {
                    wrongRev++;
                    cntRev[aRev][b]++;
                }
            }
            cost[i][j] = Math.min(wrong - swapPairs(cnt), 1 + wrongRev - swapPairs(cntRev));
        }
    }
    // Partition DP over prefix lengths; costs add across parts.
    const best: number[] = new Array(n + 1).fill(Infinity);
    best[0] = 0;
    for (let end = 1; end <= n; end++)
        for (let start = 0; start < end; start++) best[end] = Math.min(best[end], best[start] + cost[start][end - 1]);
    return best[n];
}
