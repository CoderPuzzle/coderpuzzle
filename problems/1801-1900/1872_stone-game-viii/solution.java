class Solution {

    // The row is always [prefix[j], stones[j], ...]; a move from frontier
    // j nets exactly prefix[k] for the chosen k>j, so
    // f(j) = max_{k>j}(prefix[k] - f(k)). One running maximum S folds
    // candidate k=j via S <- max(S, prefix[j-1] - S).
    public long stoneGameVIII(int[] stones) {
        long run = 0;
        for (int v : stones) {
            run += v;
        }
        long best = run;
        for (int j = stones.length - 1; j >= 2; j--) {
            run -= stones[j];
            best = Math.max(best, run - best);
        }
        return best;
    }
}
