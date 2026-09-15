class Solution {
  public:
    int bestRotation(vector<int> &nums) {
        // Difference array over rotations: each element earns its point on a
        // contiguous range of k, so per-element +1/-1 marks and one prefix
        // pass rebuild every rotation's score without rotating anything.
        int n = nums.size();
        vector<int> diff(n + 1, 0);
        for (int i = 0; i < n; i++) {
            int v = nums[i];
            if (v <= i) {
                // Scores at k in [0, i - v] and again at every k past i.
                ++diff[0];
                --diff[i - v + 1];
                if (i + 1 < n) {
                    ++diff[i + 1];
                }
            } else {
                // Scores only after wrapping, at k in [i + 1, i + n - v].
                ++diff[i + 1];
                --diff[i + n - v + 1];
            }
        }
        int best_k = 0;
        int best = -1;
        int score = 0;
        for (int k = 0; k < n; k++) {
            score += diff[k];
            // Strict > keeps the earliest k on ties, which the problem demands.
            if (score > best) {
                best = score;
                best_k = k;
            }
        }
        return best_k;
    }
};
