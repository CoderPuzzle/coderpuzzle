class Solution {
  public:
    // The row is always [prefix[j], stones[j], ...]; a move from frontier
    // j nets exactly prefix[k] for the chosen k>j, so
    // f(j) = max_{k>j}(prefix[k] - f(k)). One running maximum S folds
    // candidate k=j via S <- max(S, prefix[j-1] - S).
    long long stoneGameVIII(vector<int> &stones) {
        long long best = 0;
        long long run = 0;
        for (int v : stones)
            run += v;
        best = run;
        for (int j = (int)stones.size() - 1; j >= 2; j--) {
            run -= stones[j];
            best = max(best, run - best);
        }
        return best;
    }
};
