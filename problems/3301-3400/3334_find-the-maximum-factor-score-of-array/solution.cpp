class Solution {
  public:
    long long maxScore(vector<int> &nums) {
        // Exclusive prefix/suffix folds: pre[i] folds nums[0..i-1] and
        // suf[i] folds nums[i..n-1] for both GCD (identity 0) and LCM
        // (identity 1). Removing index i leaves the fold of the two joins;
        // the full-array fold covers removing nothing, and removing every
        // element folds to score 0 through the identities. Every LCM of a
        // sub-multiset of values <= 30 divides LCM(1..30) = 2329089562800
        // and the GCD is at most 30, so every intermediate product stays
        // below 6987268688400, comfortably inside long long.
        int n = nums.size();
        vector<long long> preG(n + 1, 0), preL(n + 1, 1);
        vector<long long> sufG(n + 1, 0), sufL(n + 1, 1);
        for (int i = 0; i < n; ++i) {
            preG[i + 1] = gcd(preG[i], (long long)nums[i]);
            preL[i + 1] = preL[i] / gcd(preL[i], (long long)nums[i]) * nums[i];
        }
        for (int i = n - 1; i >= 0; --i) {
            sufG[i] = gcd(sufG[i + 1], (long long)nums[i]);
            sufL[i] = sufL[i + 1] / gcd(sufL[i + 1], (long long)nums[i]) * nums[i];
        }
        long long best = preG[n] * preL[n];
        for (int i = 0; i < n; ++i) {
            long long g = gcd(preG[i], sufG[i + 1]);
            long long l = preL[i] / gcd(preL[i], sufL[i + 1]) * sufL[i + 1];
            best = max(best, g * l);
        }
        return best;
    }
};
