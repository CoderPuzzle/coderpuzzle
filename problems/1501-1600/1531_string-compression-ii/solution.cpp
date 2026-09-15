class Solution {
  public:
    int getLengthOfOptimalCompression(string s, int k) {
        // dp(i, budget) is the shortest encoding of s[i:] using at most
        // `budget` more deletions. Memoized on (i, budget), both bounded
        // by n.
        int n = s.size();
        vector<vector<int>> memo(n + 1, vector<int>(k + 1, -1));
        return dp(s, memo, 0, k);
    }

  private:
    static int calcLen(int count) {
        if (count == 0)
            return 0;
        if (count == 1)
            return 1;
        if (count < 10)
            return 2;
        if (count < 100)
            return 3;
        return 4;
    }

    static int dp(const string &s, vector<vector<int>> &memo, int i, int budget) {
        int n = s.size();
        if (n - i <= budget) {
            // Every remaining character can simply be deleted.
            return 0;
        }
        int &cached = memo[i][budget];
        if (cached != -1) {
            return cached;
        }
        // Delete s[i] outright and move on.
        int best = budget > 0 ? dp(s, memo, i + 1, budget - 1) : INT_MAX;
        // Or keep a run of s[i]'s character: scan forward, paying one
        // deletion for every mismatched character folded into the run.
        int same = 0, diff = 0;
        for (int j = i; j < n; ++j) {
            if (s[j] == s[i]) {
                ++same;
            } else {
                ++diff;
                if (diff > budget) {
                    break;
                }
            }
            best = min(best, calcLen(same) + dp(s, memo, j + 1, budget - diff));
        }
        cached = best;
        return best;
    }
};
