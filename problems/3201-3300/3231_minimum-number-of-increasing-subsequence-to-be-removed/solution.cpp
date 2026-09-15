class Solution {
  public:
    int minOperations(vector<int> &nums) {
        // Each removal takes out one strictly increasing subsequence, so a
        // non-increasing chain (x >= y in order) must span distinct removals;
        // by Dilworth's theorem the answer is the longest non-increasing
        // subsequence length.
        vector<int> tails;
        for (int x : nums) {
            // Negate and upper_bound: equal values extend the same pile,
            // turning patience sorting's "longest strictly increasing" into
            // "longest non-increasing" for the original values.
            int v = -x;
            auto it = upper_bound(tails.begin(), tails.end(), v);
            // The value opens a new pile (append) or replaces the leftmost
            // pile top it can sit on; piles stay sorted, and their count is
            // the answer.
            if (it == tails.end())
                tails.push_back(v);
            else
                *it = v;
        }
        return tails.size();
    }
};
